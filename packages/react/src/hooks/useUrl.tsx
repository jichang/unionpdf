import { useEffect, useState } from 'react';

export function userUrl(buffer: ArrayBuffer | null) {
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
