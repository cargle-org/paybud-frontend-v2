export function isDeepEmpty(value: any): boolean {
  if (value == null) return true; // null or undefined

  if (typeof value === "string") return value.trim().length === 0;

  if (Array.isArray(value)) return value.every(isDeepEmpty);

  if (typeof value === "object") {
    return Object.values(value).every(isDeepEmpty);
  }

  return false; // for numbers, booleans, etc.
}
