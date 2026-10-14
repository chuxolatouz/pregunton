import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  emptyLibrary,
  mergeLibraries,
  parseLibrary,
  favoriteIds,
} from "../lib/libraryModel";
import { restoreSession, shuffled } from "../lib/deckSession";
import { questionHref } from "../lib/questionLinks";
import { decks } from "../data/decks";

test("preserves all legacy IDs after editorial changes", () => {
  const original = execFileSync("git", ["show", "HEAD:data/decks.ts"], {
    encoding: "utf8",
  });
  const legacy = [
    ...original.matchAll(
      /    id: "([^"]+)",[\s\S]*?    questions: \[([\s\S]*?)\n    \]/g,
    ),
  ].flatMap((match) => {
    const explicit = [...match[2].matchAll(/\{ id: "([^"]+)"/g)].map(
      (item) => item[1],
    );
    return explicit.length
      ? explicit
      : [...match[2].matchAll(/^      "/gm)].map(
          (_, index) => `${match[1]}-${String(index + 1).padStart(2, "0")}`,
        );
  });
  assert.equal(legacy.length, 1086);
  assert.deepEqual(
    decks.flatMap((deck) => deck.questions.map((q) => q.id)).sort(),
    legacy.sort(),
  );
});
test("merge is commutative and retains a removal against an old offline copy", () => {
  const old = emptyLibrary();
  old.favorites["random-02"] = { active: true, updatedAt: 10, device: "a" };
  const changed = emptyLibrary();
  changed.favorites["random-02"] = {
    active: false,
    updatedAt: 11,
    device: "b",
  };
  assert.deepEqual(mergeLibraries(old, changed), mergeLibraries(changed, old));
  assert.deepEqual(favoriteIds(mergeLibraries(old, changed)), []);
});
test("merge retains independent changes from two devices", () => {
  const left = emptyLibrary(),
    right = emptyLibrary();
  left.favorites["random-01"] = { active: true, updatedAt: 10, device: "a" };
  right.favorites["parejas-02"] = { active: true, updatedAt: 11, device: "b" };
  const merged = mergeLibraries(left, right);
  assert.equal(favoriteIds(merged).length, 2);
  assert.deepEqual(mergeLibraries(merged, right), merged);
});
test("reset prevents an old device from resurrecting private data", () => {
  const old = emptyLibrary();
  old.collections.c1 = {
    name: "Viaje",
    deleted: false,
    updatedAt: 10,
    device: "a",
  };
  const cleared = emptyLibrary();
  cleared.resetAt = 20;
  assert.deepEqual(mergeLibraries(old, cleared), cleared);
  old.favorites["random-01"] = { active: true, updatedAt: 21, device: "a" };
  assert.deepEqual(favoriteIds(mergeLibraries(old, cleared)), ["random-01"]);
});
test("invalid backups are rejected before they can change stored data", () => {
  assert.throws(() => parseLibrary({ version: 99 }));
  const state = emptyLibrary();
  state.progress.random = {
    updatedAt: 1,
    device: "a",
    questionId: "random-01",
    order: ["random-02"],
    cursor: 0,
  };
  assert.throws(() => parseLibrary(state));
  assert.throws(() =>
    parseLibrary(
      JSON.parse(
        '{"version":1,"favorites":{"__proto__":{"active":true,"device":"a","updatedAt":1}},"collections":{},"members":{},"progress":{}}',
      ),
    ),
  );
});
test("deck shuffling covers all IDs exactly once and supports one-card decks", () => {
  const ids = ["a", "b", "c", "d"];
  const result = shuffled(ids, "c", () => 0.25);
  assert.equal(result[0], "c");
  assert.deepEqual([...result].sort(), ids);
  assert.equal(new Set(result).size, ids.length);
  assert.deepEqual(shuffled(["only"], "only"), ["only"]);
});
test("shared ID outranks saved progress; stale sessions fall back safely", () => {
  const ids = ["a", "b", "c"];
  const saved = { order: ["c", "b", "a"], cursor: 1, questionId: "b" };
  assert.deepEqual(restoreSession(ids, saved), {
    order: saved.order,
    cursor: 1,
  });
  assert.equal(
    restoreSession(ids, saved, "c").order[
      restoreSession(ids, saved, "c").cursor
    ],
    "c",
  );
  assert.equal(restoreSession(ids, saved, "missing").order[0], "a");
  assert.equal(restoreSession(["a", "d"], saved).order[0], "a");
});
test("question links encode both slug and ID", () => {
  assert.equal(
    questionHref("preguntas-random", "random-02"),
    "/mazo/preguntas-random?q=random-02",
  );
  assert.ok(questionHref("x/y", "a&b").includes("a%26b"));
});
test("custom questions support old backups and reject catalogue impersonation", () => {
  const state = emptyLibrary();
  state.custom["custom-a"] = {
    updatedAt: 1,
    device: "a",
    text: "¿Dónde nos gustaría viajar?",
    deleted: false,
  };
  assert.equal(
    parseLibrary(state).custom["custom-a"].text,
    state.custom["custom-a"].text,
  );
  const old = { ...state, custom: undefined };
  assert.deepEqual(parseLibrary(old).custom, {});
  state.custom["random-01"] = state.custom["custom-a"];
  assert.throws(() => parseLibrary(state));
});
