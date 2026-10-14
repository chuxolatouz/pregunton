create table public.shared_decks (
  token uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  collection_id text not null,
  snapshot jsonb not null,
  unique (owner_id, collection_id),
  check (octet_length(snapshot::text) <= 300000),
  check (jsonb_typeof(snapshot->'questions') = 'array' and jsonb_array_length(snapshot->'questions') between 1 and 1000),
  check (jsonb_typeof(snapshot->'title') = 'string' and length(snapshot->>'title') between 1 and 60)
);
alter table public.shared_decks enable row level security;
revoke all on public.shared_decks from anon;
grant select, insert, update, delete on public.shared_decks to authenticated;
create policy "own shared selections" on public.shared_decks for all to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
create or replace function public.read_shared_deck(share_token uuid) returns jsonb language sql stable security definer set search_path = '' as $$
  select snapshot from public.shared_decks where token = share_token;
$$;
revoke all on function public.read_shared_deck(uuid) from public;
grant execute on function public.read_shared_deck(uuid) to anon, authenticated;
-- This function exposes only the explicitly published snapshot for an unguessable token.
-- Revocation deletes its row. It cannot read question_libraries or any other collection.
