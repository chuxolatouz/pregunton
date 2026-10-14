"use client";
import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import {
  getLibraryScope,
  guestLibrary,
  mergeRemote,
  readLibrary,
  setLibraryScope,
  subscribeLibrary,
  changeLibrary,
  importLibrary,
} from "@/lib/library";
import { emptyLibrary, parseLibrary } from "@/lib/libraryModel";
const configured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);
const Context = createContext<{
  configured: boolean;
  user: User | null;
  status: string;
  requestEmail: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  synchronize: () => Promise<void>;
  erase: () => Promise<void>;
} | null>(null);
export function useAccount() {
  const account = useContext(Context);
  if (!account) throw new Error("Cuenta no disponible");
  return account;
}
export function AccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState("En este dispositivo");
  const client = useRef<SupabaseClient | null>(null);
  const active = useRef<User | null>(null);
  const busy = useRef(false);
  const again = useRef(false);
  const generation = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  async function synchronize() {
    const account = active.current;
    const sdk = client.current;
    if (!account || !sdk) return;
    if (busy.current) {
      again.current = true;
      return;
    }
    const expected = account.id;
    const run = generation.current;
    if (!navigator.onLine) {
      setStatus("Pendiente de sincronizar · sin conexión");
      return;
    }
    busy.current = true;
    setStatus("Sincronizando…");
    try {
      // The RPC merges atomically; it never replaces a newer entry with an older one.
      const { data, error } = await sdk.rpc("sync_library", {
        incoming: readLibrary(),
      });
      if (run !== generation.current || getLibraryScope() !== expected) return;
      if (error) throw error;
      mergeRemote(parseLibrary(data), expected);
      setStatus("Sincronizada");
    } catch {
      if (run === generation.current)
        setStatus(
          "No se pudo sincronizar. Tus cambios siguen en este dispositivo.",
        );
    } finally {
      busy.current = false;
      if (again.current) {
        again.current = false;
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          void synchronize();
        }, 700);
      }
    }
  }
  useEffect(() => {
    if (!configured) return;
    let stopped = false;
    let unsubscribeAuth: (() => void) | undefined;
    const onLocal = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        void synchronize();
      }, 700);
    };
    const onOnline = () => {
      void synchronize();
    };
    const onFocus = () => {
      void synchronize();
    };
    async function bootstrap() {
      const { getSupabase } = await import("@/lib/supabase");
      if (stopped) return;
      const sdk = getSupabase();
      client.current = sdk;
      function adopt(next: User | null) {
        if (stopped || next?.id === active.current?.id) return;
        generation.current++;
        active.current = next;
        // Guest data stays separate. Importing it into a account is an explicit action.
        setLibraryScope(next?.id ?? "guest");
        setUser(next);
        setStatus(next ? "Pendiente de sincronizar" : "En este dispositivo");
        if (next)
          setTimeout(() => {
            void synchronize();
          }, 0);
      }
      const { data } = await sdk.auth.getSession();
      adopt(data.session?.user ?? null);
      const { data: subscription } = sdk.auth.onAuthStateChange(
        (_event, session) => {
          adopt(session?.user ?? null);
        },
      );
      unsubscribeAuth = () => subscription.subscription.unsubscribe();
    }
    void bootstrap().catch(() => {
      if (!stopped) setStatus("No se pudo conectar la cuenta.");
    });
    const unlisten = subscribeLibrary(onLocal);
    window.addEventListener("online", onOnline);
    window.addEventListener("focus", onFocus);
    return () => {
      stopped = true;
      unsubscribeAuth?.();
      unlisten();
      clearTimeout(timer.current);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("focus", onFocus);
    };
    // Event handlers read current refs so account changes cannot mix libraries.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function requestEmail(email: string) {
    const { getSupabase } = await import("@/lib/supabase");
    const sdk = getSupabase();
    client.current = sdk;
    const { error } = await sdk.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/cuenta` },
    });
    if (error)
      throw new Error(
        "No se pudo enviar el enlace. Espera un momento y vuelve a intentarlo.",
      );
  }
  async function logout() {
    generation.current++;
    active.current = null;
    clearTimeout(timer.current);
    const { error } = await client.current!.auth.signOut({ scope: "local" });
    if (error) {
      const { data } = await client.current!.auth.getSession();
      active.current = data.session?.user ?? null;
      throw new Error("No se pudo cerrar sesión. Inténtalo de nuevo.");
    }
    setLibraryScope("guest");
    setUser(null);
    setStatus("En este dispositivo");
  }
  async function erase() {
    if (!active.current) return;
    const { error } = await client
      .current!.from("shared_decks")
      .delete()
      .eq("owner_id", active.current.id);
    if (error)
      throw new Error(
        "No se pudieron revocar los enlaces. Vuelve a intentarlo con conexión.",
      );
    changeLibrary((_state, stamp) => ({
      ...emptyLibrary(),
      resetAt: stamp.updatedAt,
    }));
    await synchronize();
  }
  return (
    <Context
      value={{
        configured,
        user,
        status,
        requestEmail,
        logout,
        synchronize,
        erase,
      }}
    >
      {children}
    </Context>
  );
}
export function AccountSummary() {
  const { configured, user, status } = useAccount();
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
      <p className="text-ink/70">{status}</p>
      {configured ? (
        <Link prefetch={false} className="quiet-action" href="/cuenta">
          {user ? "Mi cuenta" : "Guardar también en otros dispositivos →"}
        </Link>
      ) : null}
    </div>
  );
}
export function ImportGuestButton({
  onStatus,
}: {
  onStatus: (message: string) => void;
}) {
  const { user } = useAccount();
  if (!user) return null;
  return (
    <button
      className="quiet-action"
      onClick={() => {
        try {
          importLibrary(guestLibrary());
          onStatus(
            "Cartas de invitado combinadas. Se conservaron ambas colecciones.",
          );
        } catch {
          onStatus("No se pudieron incorporar las cartas de invitado.");
        }
      }}
    >
      Añadir mis cartas de invitado a esta cuenta
    </button>
  );
}
