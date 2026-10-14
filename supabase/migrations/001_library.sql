-- Run in the intended Supabase project. No service-role key is needed by the app.
create table if not exists public.question_libraries (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{"version":1,"resetAt":0,"custom":{},"favorites":{},"collections":{},"members":{},"progress":{}}',
  updated_at timestamptz not null default now()
);
alter table public.question_libraries enable row level security;
revoke all on public.question_libraries from anon;
grant select, insert, update on public.question_libraries to authenticated;
create policy "read own library" on public.question_libraries for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own library" on public.question_libraries for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own library" on public.question_libraries for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create or replace function public.sync_library(incoming jsonb) returns jsonb
language plpgsql security invoker set search_path = '' as $$
declare
  current_data jsonb;
  result jsonb := '{"version":1,"resetAt":0,"custom":{},"favorites":{},"collections":{},"members":{},"progress":{}}';
  field text;
  record_key text;
  item jsonb;
  old_item jsonb;
  winner jsonb;
  cutoff bigint;
  revision bigint;
  current_revision bigint;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(incoming) <> 'object' or incoming->>'version' <> '1' or octet_length(incoming::text) > 2000000 then raise exception 'Invalid library'; end if;
  incoming := jsonb_set(incoming, '{custom}', coalesce(incoming->'custom','{}'));
  cutoff := coalesce((incoming->>'resetAt')::bigint, 0);
  if cutoff < 0 or cutoff > 9007199254740991 then raise exception 'Invalid reset revision'; end if;
  foreach field in array array['favorites','collections','members','progress','custom'] loop
    if jsonb_typeof(incoming->field) is distinct from 'object' then raise exception 'Invalid field'; end if;
    if (select count(*) from jsonb_object_keys(incoming->field)) > 10000 then raise exception 'Too many records'; end if;
    for record_key, item in select * from jsonb_each(incoming->field) loop
      if record_key !~ '^[a-zA-Z0-9_:.-]{1,180}$' or record_key in ('__proto__','constructor','prototype') or jsonb_typeof(item) <> 'object' then raise exception 'Invalid key'; end if;
      if jsonb_typeof(item->'updatedAt') is distinct from 'number' or (item->>'updatedAt') !~ '^[0-9]+$' or jsonb_typeof(item->'device') is distinct from 'string' or (item->>'device') !~ '^[a-zA-Z0-9_:.-]{1,180}$' then raise exception 'Invalid revision'; end if;
      revision := (item->>'updatedAt')::bigint;
      if revision < 0 or revision > 9007199254740991 then raise exception 'Invalid revision'; end if;
      if field = 'custom' and (record_key !~ '^(custom|shared)-' or jsonb_typeof(item->'text') is distinct from 'string' or length(trim(item->>'text')) not between 1 and 145 or jsonb_typeof(item->'deleted') is distinct from 'boolean') then raise exception 'Invalid custom question'; end if;
      if field = 'favorites' and jsonb_typeof(item->'active') is distinct from 'boolean' then raise exception 'Invalid favorite'; end if;
      if field = 'collections' and (jsonb_typeof(item->'name') is distinct from 'string' or length(trim(item->>'name')) not between 1 and 60 or jsonb_typeof(item->'deleted') is distinct from 'boolean') then raise exception 'Invalid collection'; end if;
      if field = 'members' and (jsonb_typeof(item->'active') is distinct from 'boolean' or jsonb_typeof(item->'collectionId') is distinct from 'string' or jsonb_typeof(item->'questionId') is distinct from 'string' or (item->>'collectionId') !~ '^[a-zA-Z0-9_:.-]{1,180}$' or (item->>'questionId') !~ '^[a-zA-Z0-9_:.-]{1,180}$' or record_key <> (item->>'collectionId') || ':' || (item->>'questionId')) then raise exception 'Invalid membership'; end if;
      if field = 'progress' then
        if jsonb_typeof(item->'order') is distinct from 'array' or jsonb_array_length(item->'order') not between 1 and 2000 or jsonb_typeof(item->'cursor') is distinct from 'number' or (item->>'cursor') !~ '^[0-9]+$' then raise exception 'Invalid progress'; end if;
        if (item->>'cursor')::integer >= jsonb_array_length(item->'order') or (item->'order'->>((item->>'cursor')::integer)) is distinct from item->>'questionId' then raise exception 'Invalid cursor'; end if;
      end if;
    end loop;
  end loop;
  insert into public.question_libraries(user_id) values (auth.uid()) on conflict (user_id) do nothing;
  select data into current_data from public.question_libraries where user_id = auth.uid() for update;
  cutoff := greatest(cutoff, coalesce((current_data->>'resetAt')::bigint, 0));
  result := jsonb_set(result, '{resetAt}', to_jsonb(cutoff));
  foreach field in array array['favorites','collections','members','progress','custom'] loop
    for record_key in select jsonb_object_keys(coalesce(current_data->field, '{}')) union select jsonb_object_keys(incoming->field) loop
      old_item := current_data->field->record_key;
      item := incoming->field->record_key;
      revision := coalesce((item->>'updatedAt')::bigint, -1);
      current_revision := coalesce((old_item->>'updatedAt')::bigint, -1);
      if old_item is null then winner := item;
      elsif item is null then winner := old_item;
      elsif revision > current_revision or (revision = current_revision and (item->>'device') collate "C" > (old_item->>'device') collate "C") then winner := item;
      else winner := old_item;
      end if;
      if (winner->>'updatedAt')::bigint > cutoff then result := jsonb_set(result, array[field, record_key], winner); end if;
    end loop;
  end loop;
  update public.question_libraries set data = result, updated_at = now() where user_id = auth.uid();
  return result;
end;
$$;
revoke all on function public.sync_library(jsonb) from public, anon;
grant execute on function public.sync_library(jsonb) to authenticated;
