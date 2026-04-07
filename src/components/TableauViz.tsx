import React, { useEffect, useRef } from 'react';

interface TableauVizProps {
  vizUrl: string;
  activeStoryPoint: number;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      'tableau-viz': any;
    }
  }
}

export default function TableauViz({ vizUrl, activeStoryPoint }: TableauVizProps) {
  const vizRef = useRef<any>(null);
  const targetPointRef = useRef<number>(activeStoryPoint);

  const cleanUrl = vizUrl.includes('?')
    ? `${vizUrl}&:showStoryPoints=no&:toolbar=no&:display_count=n&:origin=viz_share_link`
    : `${vizUrl}?:showStoryPoints=no&:toolbar=no&:display_count=n&:origin=viz_share_link`;

  const goToStoryPoint = async (index: number) => {
    const viz = vizRef.current;
    if (!viz) return;
    try {
      const workbook = viz.workbook;
      if (!workbook) return;
      const sheet = workbook.activeSheet;
      if (sheet && sheet.sheetType === 'story') {
        // Tableau API is 1-indexed for story points
        await sheet.activateStoryPointAsync(index + 1);
      }
    } catch (e) {
      // viz not ready yet
    }
  };

  // When activeStoryPoint prop changes, navigate immediately
  useEffect(() => {
    targetPointRef.current = activeStoryPoint;
    goToStoryPoint(activeStoryPoint);
  }, [activeStoryPoint]);

  // After the viz finishes loading, navigate to the correct story point
  useEffect(() => {
    const viz = vizRef.current;
    if (!viz) return;

    const onReady = () => {
      goToStoryPoint(targetPointRef.current);
    };

    viz.addEventListener('firstinteractive', onReady);
    return () => {
      viz.removeEventListener('firstinteractive', onReady);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-white">
      {/* @ts-ignore */}
      <tableau-viz
        ref={vizRef}
        id="tableauViz-main"
        src={cleanUrl}
        device="desktop"
        hide-tabs="true"
        toolbar="hidden"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}