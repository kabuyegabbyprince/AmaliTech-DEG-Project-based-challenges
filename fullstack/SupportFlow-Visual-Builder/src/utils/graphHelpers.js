// Utility helpers for graph/flow manipulation.
// Placeholder implementations so other components can import safely later.

export function safeId(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function isArray(value) {
  return Array.isArray(value);
}

export function clone(obj) {
  return obj == null ? obj : JSON.parse(JSON.stringify(obj));
}

