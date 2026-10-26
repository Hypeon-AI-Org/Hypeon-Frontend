import type { AdSizeId, Design, Layer } from './creativeCanvas';

/*
 * Keeps the Ad Creative Editor's work in the visitor's own browser
 * (IndexedDB), so a refresh or a closed tab does not lose the ad. Nothing is
 * sent anywhere. Pictures are stored as blobs; every call fails quietly,
 * because private windows and some browsers block storage.
 */

const DB = 'hypeon-creative-editor';
const STORE = 'work';
const KEY = 'current';
/** Saved work older than this is dropped instead of restored. */
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export type SavedWork = {
  v: 1;
  savedAt: number;
  name: string;
  design: Design;
  layers: Layer[];
  sizeId: AdSizeId;
  format: 'jpeg' | 'png';
  image: Blob;
  logo: Blob | null;
  layerImages: Record<string, Blob>;
  extensions: Partial<Record<AdSizeId, { image: Blob; inner: { x: number; y: number; w: number; h: number } }>>;
};

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  try {
    return await new Promise<T>((resolve, reject) => {
      const req = fn(db.transaction(STORE, mode).objectStore(STORE));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } finally {
    db.close();
  }
}

export async function saveWork(work: SavedWork): Promise<void> {
  try {
    await run('readwrite', (s) => s.put(work, KEY));
  } catch {}
}

export async function loadWork(): Promise<SavedWork | null> {
  try {
    const work = (await run<SavedWork | undefined>('readonly', (s) => s.get(KEY))) ?? null;
    if (!work || work.v !== 1 || Date.now() - work.savedAt > MAX_AGE_MS) return null;
    return work;
  } catch {
    return null;
  }
}

export async function clearWork(): Promise<void> {
  try {
    await run('readwrite', (s) => s.delete(KEY));
  } catch {}
}

/** The bytes behind an image already on the page (blob: or data: URL); cached so autosave does not refetch. */
const blobs = new Map<string, Blob>();
export async function blobOf(img: HTMLImageElement): Promise<Blob> {
  const hit = blobs.get(img.src);
  if (hit) return hit;
  const blob = await (await fetch(img.src)).blob();
  blobs.set(img.src, blob);
  return blob;
}
