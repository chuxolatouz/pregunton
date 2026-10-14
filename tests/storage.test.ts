import test from "node:test";
import assert from "node:assert/strict";
import {
  createCollection,
  importLibrary,
  readLibrary,
  setFavorite,
  setLibraryScope,
  setMembership,
  writeLibrary,
} from "../lib/library";
import { emptyLibrary } from "../lib/libraryModel";
class Storage {
  values = new Map<string, string>();
  denied = false;
  getItem(key: string) {
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    if (this.denied) throw new Error("quota");
    this.values.set(key, value);
  }
  removeItem(key: string) {
    this.values.delete(key);
  }
}
const memory = new Storage();
Object.defineProperty(globalThis, "localStorage", { value: memory });
Object.defineProperty(globalThis, "window", { value: new EventTarget() });
test("legacy migration keeps the recovery key and IDs", () => {
  memory.setItem("pregunton:favorites", '["random-02","parejas-03"]');
  setLibraryScope("different");
  setLibraryScope("guest");
  assert.equal(readLibrary().favorites["random-02"].active, true);
  assert.ok(memory.getItem("pregunton:library:v1:guest"));
  assert.ok(memory.getItem("pregunton:favorites"));
});
test("repeated import is idempotent and keeps the current collection name", () => {
  setLibraryScope("import-test");
  writeLibrary(emptyLibrary());
  setFavorite("random-01", true);
  const id = createCollection("Mi viaje");
  setMembership(id, "random-01", true);
  const copy = structuredClone(readLibrary());
  copy.collections[id].name = "Nombre viejo";
  copy.favorites["random-02"] = { active: true, updatedAt: 1, device: "old" };
  importLibrary(copy);
  const first = JSON.stringify(readLibrary());
  importLibrary(copy);
  assert.equal(JSON.stringify(readLibrary()), first);
  assert.equal(readLibrary().collections[id].name, "Mi viaje");
  assert.equal(readLibrary().favorites["random-02"].active, true);
});
test("failed persistence never reports an unpersisted favorite in the snapshot", () => {
  setLibraryScope("quota-test");
  writeLibrary(emptyLibrary());
  memory.denied = true;
  assert.throws(() => setFavorite("random-03", true));
  memory.denied = false;
  assert.equal(readLibrary().favorites["random-03"], undefined);
});
test("account scopes cannot show another user library", () => {
  setLibraryScope("alice");
  writeLibrary(emptyLibrary());
  setFavorite("random-01", true);
  setLibraryScope("bob");
  assert.equal(readLibrary().favorites["random-01"], undefined);
  setLibraryScope("alice");
  assert.equal(readLibrary().favorites["random-01"].active, true);
  setLibraryScope("guest");
  assert.equal(readLibrary().favorites["random-01"], undefined);
});
test("restoring a valid copy preserves the corrupted source for recovery", () => {
  setLibraryScope("recovery-test");
  memory.setItem("pregunton:library:v1:recovery-test", "{broken");
  readLibrary();
  const copy = emptyLibrary();
  copy.favorites["random-04"] = {
    active: true,
    updatedAt: 1,
    device: "backup",
  };
  importLibrary(copy);
  assert.equal(readLibrary().favorites["random-04"].active, true);
  assert.ok(
    [...memory.values.entries()].some(
      ([key, value]) =>
        key.startsWith("pregunton:library:v1:recovery-test:recovery:") &&
        value === "{broken",
    ),
  );
});
