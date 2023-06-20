import React from 'react';
import { useUIComponents, useUIStrings } from '../../adapters';
import { userUrl } from '../../hooks/useUrl';

export interface DownloaderProps {
  name: string;
  content: ArrayBuffer;
}

export function Downloader(props: DownloaderProps) {
  const { name, content } = props;
  const { Link } = useUIComponents();
  const strings = useUIStrings();
  const url = userUrl(content);

  return (
    <div className="pdf__downloader">
      <p className="pdf__downloader__message">{name}</p>
      <div className="pdf__downloader__action">
        <Link download={name} href={url}>
          {strings.download}
        </Link>
      </div>
    </div>
  );
}
