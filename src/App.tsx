import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, useTransform } from 'motion/react';
import { Leaf, Droplets, Earth, Beef, Carrot, Info, Heart, ShieldAlert, TrendingUp } from 'lucide-react';
import { storyData, StorySection } from './data/storyData';
import TableauViz from './components/TableauViz';
import Sticker from './components/Sticker';

const TABLEAU_URL = "https://public.tableau.com/views/FinalProject-StoryWhyITurnedVegan/Veganism";

interface SectionProps {
  section: StorySection;
  onInView: (id: number) => void;
}

const BotanicalElement: React.FC<{ className?: string; delay?: number; rotate?: number; variant?: 'leaf' | 'vine' | 'flower' }> = ({ className, delay = 0, rotate = 0, variant = 'leaf' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotate: rotate - 10 }}
    whileInView={{ opacity: 0.15, scale: 1, rotate }}
    transition={{ duration: 1.5, delay }}
    className={`absolute pointer-events-none ${className}`}
  >
    <svg viewBox="0 0 200 200" className="w-full h-full fill-dg">
      {variant === 'leaf' && (
        <>
          <path d="M100,20 C120,50 160,70 160,110 C160,150 130,180 100,180 C70,180 40,150 40,110 C40,70 80,50 100,20 Z" />
          <path d="M100,20 L100,180 M100,60 L140,80 M100,90 L60,110 M100,120 L140,140 M100,150 L60,170" stroke="white" strokeWidth="2" fill="none" />
        </>
      )}
      {variant === 'vine' && (
        <path d="M100,200 C100,150 150,150 150,100 C150,50 50,50 50,0" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="10 10" />
      )}
      {variant === 'flower' && (
        <path d="M100,100 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 M100,60 a40,40 0 1,0 0,80 a40,40 0 1,0 0,-80" />
      )}
    </svg>
  </motion.div>
);

interface SubSectionProps {
  content: string;
  type: 'explanation' | 'context' | 'personal';
  align: 'left' | 'right';
  title: string;
  subtitle?: string;
}

const SubSection: React.FC<SubSectionProps> = ({ 
  content, 
  type, 
  align, 
  title,
  subtitle
}) => {
  return (
    <div className={`h-[200vh] flex items-center px-6 md:px-20 relative z-20 ${
      align === 'right' ? 'justify-end' : 'justify-start'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 150, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -150, scale: 0.9 }}
        viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`max-w-xl p-10 md:p-14 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl border border-white/40 relative ${
          type === 'personal' ? 'bg-dg/95 text-cream' : 'bg-cream/95 text-ink'
        }`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-inner ${
              type === 'explanation' ? 'bg-sg text-dg' : 
              type === 'context' ? 'bg-mg text-white' : 'bg-lg text-dg'
            }`}>
              {type === 'explanation' && <Info className="w-7 h-7" />}
              {type === 'context' && <Earth className="w-7 h-7" />}
              {type === 'personal' && <Heart className="w-7 h-7" />}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">
                {type === 'explanation' ? "The Observation" : 
                 type === 'context' ? "The Global Impact" : "My Personal Journey"}
              </p>
              <h3 className="text-2xl font-serif font-bold leading-tight">
                {title}
              </h3>
            </div>
          </div>

          <p className="text-xl md:text-2xl leading-relaxed font-body italic">
            {type === 'personal' ? `"${content}"` : content}
          </p>
          
          {subtitle && type === 'explanation' && (
            <p className="text-xs font-bold uppercase tracking-widest opacity-30 pt-4 border-t border-dg/10">
              {subtitle}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const StorySectionWrapper: React.FC<{ section: StorySection; onInView: (id: number) => void }> = ({ section, onInView }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate chart opacity and scale based on section scroll
  // 0 -> 0.15: Fade in
  // 0.15 -> 0.85: Locked & Visible
  // 0.85 -> 1: Fade out
  const chartOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const chartScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.9]);
  const chartY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [100, 0, 0, -100]);

  const isInView = useInView(containerRef, { amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      onInView(section.visualId);
    }
  }, [isInView, section.visualId, onInView]);

  return (
    <div ref={containerRef} className="relative h-[900vh] z-10">
      {/* Sticky Chart Container - Stays locked for the duration of the parent */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          style={{ opacity: chartOpacity, scale: chartScale, y: chartY }}
          className="w-full h-full max-w-[92vw] max-h-[85vh] relative rounded-[4rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.2)] border-[12px] border-cream-dark bg-white pointer-events-auto"
        >
          <TableauViz vizUrl={TABLEAU_URL} activeStoryPoint={section.visualId} />
          
          {/* Subtle Decorative Frame */}
          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-dg/5 rounded-tl-[2.5rem] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-dg/5 rounded-br-[2.5rem] pointer-events-none" />
        </motion.div>
      </div>

      {/* Scrolling Text Overlays - Absolute positioning to ensure they scroll OVER the sticky div */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        {/* Phase 1: Chart entry and locking (Empty space) */}
        <div className="h-[200vh]" />
        
        {/* Phase 2: First Bubble */}
        <div className="pointer-events-auto">
          <SubSection 
            content={section.paragraphs.explanation}
            type="explanation"
            align="right"
            title={section.title}
            subtitle={section.subtitle}
          />
        </div>
        
        {/* Phase 3: Second Bubble */}
        <div className="pointer-events-auto">
          <SubSection 
            content={section.paragraphs.context}
            type="context"
            align="left"
            title={section.title}
          />
        </div>
        
        {/* Phase 4: Third Bubble */}
        <div className="pointer-events-auto">
          <SubSection 
            content={section.paragraphs.personal}
            type="personal"
            align="right"
            title={section.title}
          />
        </div>
        
        {/* Phase 5: Chart unlocks and leaves (Empty space) */}
        <div className="h-[100vh]" />
      </div>
    </div>
  );
};

export default function App() {
  const [activeVisual, setActiveVisual] = useState(0);
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToFirst = () => {
    firstSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-cream min-h-screen font-body">
      {/* Progress Bar & Title */}
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <motion.div
          className="h-2 bg-mg origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Hero Section - Cleaned up as requested */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-dg text-cream z-50">
        <BotanicalElement className="w-96 h-96 -top-20 -left-20 opacity-20" rotate={-15} />
        <BotanicalElement className="w-[30rem] h-[30rem] -bottom-40 -right-20 opacity-20" rotate={160} />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 max-w-5xl"
        >
          <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-8 uppercase font-serif leading-[0.8]">
            The Data <br />
            <span className="text-lg italic font-normal lowercase font-serif">made me</span> <br />
            Do It
          </h1>
          <p className="text-2xl md:text-4xl font-medium opacity-80 mb-16 max-w-3xl mx-auto leading-tight font-body italic">
            A scrollytelling journey into why I chose a plant-based life.
          </p>
          
          <motion.button
            onClick={scrollToFirst}
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group"
          >
            <p className="uppercase tracking-[0.5em] text-xs font-bold">Scroll to explore</p>
            <div className="w-px h-20 bg-gradient-to-b from-cream to-transparent" />
          </motion.button>
        </motion.div>
      </section>

      {/* Main Content Area: Section-based Sticky */}
      <div className="relative" ref={firstSectionRef}>
        {storyData.map((section) => (
          <StorySectionWrapper 
            key={section.id} 
            section={section} 
            onInView={setActiveVisual} 
          />
        ))}
      </div>

      {/* Conclusion Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 bg-dg text-cream relative overflow-hidden py-20">
        <BotanicalElement className="w-[40rem] h-[40rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" rotate={30} />
        
        <Sticker icon={TrendingUp} color="bg-mg" className="top-1/4 left-[10%]" delay={0.5} />
        <Sticker icon={ShieldAlert} color="bg-brand-amber" className="bottom-1/4 right-[15%]" delay={1.5} />
        <Sticker icon={Droplets} color="bg-lg" className="top-1/2 right-[8%]" delay={2.5} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl z-10"
        >
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-12 uppercase font-serif leading-none">
            Where do you <br />
            <span className="text-lg italic font-normal lowercase font-serif block mt-4">stand?</span>
          </h2>
          <p className="text-2xl md:text-4xl font-medium opacity-80 mb-20 leading-relaxed font-body italic max-w-2xl mx-auto">
            It wasn't one chart. It was the weight of them all. The data built a case my conscience could no longer ignore.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a 
              href="https://public.tableau.com/app/profile/paula.giensch/viz/FinalProject-StoryWhyITurnedVegan/Veganism"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-lg text-dg text-xl font-bold uppercase tracking-widest rounded-full hover:bg-cream transition-all shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Explore the Full Data</span>
              <TrendingUp className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-10 py-5 border-2 border-cream/30 text-cream text-xl font-bold uppercase tracking-widest rounded-full hover:bg-cream/10 transition-all"
            >
              Back to Start
            </button>
          </div>
        </motion.div>

        <footer className="absolute bottom-10 w-full text-center">
          <div className="w-20 h-px bg-cream/20 mx-auto mb-6" />
          <p className="text-xs opacity-40 font-bold tracking-[0.5em] uppercase">
            Paula Giensch • 2026 • Data Driven Storytelling
          </p>
        </footer>
      </section>
    </div>
  );
}
