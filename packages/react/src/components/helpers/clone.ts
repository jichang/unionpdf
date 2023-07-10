/**
 * Deep clone objects
 * @param t - original object
 * @returns cloned object
 */
export function clone<T extends {}>(t: T): T {
  const result = {};
  const keys = Object.keys(t);
  for (const key of keys) {
    const value = t[key];
    const type = typeof value;
    switch (type) {
      case 'number':
      case 'string':
        result[key] = value;
      case 'object':
        if (value instanceof ImageData) {
          result[key] = value;
        } else {
          result[key] = clone(value);
        }
    }
  }

  return result as T;
}
