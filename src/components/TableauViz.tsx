import React, { useRef, useState, useEffect } from 'react';

interface TableauVizProps {
  vizUrl: string;
}

export default function TableauViz({ vizUrl }: TableauVizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-white">
      {shouldLoad && (
        <iframe
          src={vizUrl}
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-presentation"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      )}
    </div>
  );
}