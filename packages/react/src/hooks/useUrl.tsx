import { useEffect, useState } from 'react';

/**
 * Hooks for using generated URL from arraybuffer
 * @param buffer - data buffer
 * @returns - url
 *
 * @public
 */
export function userUrl(buffer: ArrayBuffer | null): string {
  const [url, setUrl] = useState<string>('about:blank');

  useEffect(() => {
    if (buffer) {
      const url = URL.createObjectURL(new Blob([buffer]));
      setUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [buffer, setUrl]);

  return url;
}
