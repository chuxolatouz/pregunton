"use client";
import { useSyncExternalStore } from "react";
import { getServerLibrary, readLibrary, subscribeLibrary } from "./library";
export function useLibrary() {
  return useSyncExternalStore(subscribeLibrary, readLibrary, getServerLibrary);
}
