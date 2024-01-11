/**
 * Deep clone objects
 * @param t - original object
 * @returns cloned object
 */
export function clone<T>(t: T): T {
  const result: { [key: string]: any } = {};
  const keys = Object.keys(t as { [key: string]: any });
  for (const key of keys) {
    const value = (t as { [key: string]: any })[key];
    const type = typeof value;
    switch (type) {
      case 'number':
      case 'string':
        result[key] = value;
        break;
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
