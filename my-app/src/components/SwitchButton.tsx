'use client';

import React from 'react';

type Props = {
  onClick: () => void;
  title?: string;
};

export default function SwitchButton({ onClick, title = 'Swap' }: Props) {
  return (
    <div className="flex items-center mt-5 justify-start sm:justify-center">
      <button
        className="w-10 h-10 rounded-full border border-blue-100 text-blue-600 flex items-center justify-center shadow-sm"
        title={title}
        onClick={onClick}
      >
        ⇄
      </button>
    </div>
  );
}
