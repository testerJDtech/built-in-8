/**
 * Sync seam.
 *
 * The web app mirrors each document to a backend granted by the Claude
 * Artifacts runtime (`window.claude.use("db")`), which does not exist in React
 * Native. Nothing is pushed anywhere yet — but the store still marks documents
 * dirty exactly as the web app does, so dropping a real adapter in here is the
 * only change needed to turn sync on.
 */

import type { Store } from './types';

export interface SyncAdapter {
  /** Push one document. Path is "app/plan" or "days/<date>". */
  push(path: string, body: unknown): Promise<void>;
  /** Watch remote changes; call back with each document as it arrives. */
  subscribe?(onDoc: (path: string, body: unknown) => void): () => void;
}

let adapter: SyncAdapter | null = null;

export function setSyncAdapter(a: SyncAdapter | null): void {
  adapter = a;
}

export function hasSyncAdapter(): boolean {
  return adapter !== null;
}

/** The document body for a dirty path, matching the web app's docFor(). */
export function docFor(s: Store, path: string): unknown {
  if (path === 'app/plan') return s.plan;
  const date = path.slice(5);
  return s.days[date] ?? null;
}

export interface SyncState {
  tone: 'idle' | 'ok' | 'wait' | 'off';
  label: string;
}

export function syncStatus(s: Store): SyncState {
  const pending = Object.keys(s.dirty).length;
  if (!adapter) return { tone: 'idle', label: 'Saved on device' };
  if (pending) return { tone: 'wait', label: `Syncing ${pending}` };
  return { tone: 'ok', label: 'Synced' };
}
