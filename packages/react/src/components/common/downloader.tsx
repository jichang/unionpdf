import React from 'react';
import { useUIComponents, useUIStrings } from '../../ui/ui.context';
import { userUrl } from '../../hooks/useUrl';

export interface DownloaderProps {
  name: string;
  content: ArrayBuffer;
}

export function Downloader(props: DownloaderProps) {
  const { name, content } = props;
  const { LinkComponent } = useUIComponents();
  const strings = useUIStrings();
  const url = userUrl(content);

  return (
    <div className="pdf__downloader">
      <p className="pdf__downloader__message">{name}</p>
      <div className="pdf__downloader__action">
        <LinkComponent download={name} href={url}>
          {strings.download}
        </LinkComponent>
      </div>
    </div>
  );
}
