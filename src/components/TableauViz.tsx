import React from 'react';

interface TableauVizProps {
  vizUrl: string;
}

export default function TableauViz({ vizUrl }: TableauVizProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      <iframe
  src={vizUrl}
  allowFullScreen
  style={{ width: '100%', height: '100%', border: 'none' }}
  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
/>
    </div>
  );
}