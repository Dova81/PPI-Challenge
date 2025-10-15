import React from 'react';

type Urls = {
  from: string;
  to: string;
};

type Props = {
  from: string;
  to: string;
  urls: Urls;
  updatedDisplay?: string | null;
  className?: string;
};

export default function ConversionInfo({ from, to, urls, updatedDisplay, className = 'text-xs text-gray-500 mt-3' }: Props) {
  if (!urls) return null;

  return (
    <div className={className}>
      {(updatedDisplay || from || to) && (
        <span>
          <a href={urls.from} target="_blank" rel="noopener noreferrer" className="underline">
            {from}
          </a>
          {' '}
          to
          {' '}
          <a href={urls.to} target="_blank" rel="noopener noreferrer" className="underline">
            {to}
          </a>
          {updatedDisplay ? (' — Last updated: ' + updatedDisplay) : null}
        </span>
      )}
    </div>
  );
}
