import React, {useEffect, useRef} from 'react';
import {motion, useScroll, useSpring, useInView, useTransform} from 'motion/react';
import {Earth, Info, TrendingUp} from 'lucide-react';
import {storyData, StorySection, StoryCategory} from './data/storyData';
import TableauViz from './components/TableauViz';

// ─── Alternating backgrounds for chart sections ───────────────────────────────
const CHART_BG = [
    'bg-cream', 'bg-[#e8f0df]', 'bg-[#dde8d4]',
    'bg-[#f4efe5]', 'bg-[#e4edd8]', 'bg-[#edf3e6]',
    'bg-cream', 'bg-[#e8f0df]', 'bg-[#dde8d4]',
    'bg-[#f4efe5]', 'bg-[#e4edd8]', 'bg-[#edf3e6]',
    'bg-cream',
];

// ─── Watercolour SVG illustrations ───────────────────────────────────────────

const WatercolourEucalyptus: React.FC<{ className?: string; opacity?: number }> = ({className = '', opacity = 1}) => (
    <svg viewBox="0 0 320 420" xmlns="http://www.w3.org/2000/svg" className={className} style={{opacity}}>
        <defs>
            <filter id="wce">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
        </defs>
        <ellipse cx="160" cy="210" rx="130" ry="190" fill="#b8d4a8" opacity="0.22" filter="url(#wce)"/>
        <ellipse cx="140" cy="180" rx="90" ry="140" fill="#9ec49e" opacity="0.18" filter="url(#wce)"/>
        <path d="M160,410 C155,340 145,260 158,180 C168,110 150,60 162,10" fill="none" stroke="#4a7a4a" strokeWidth="2.2" opacity="0.7"/>
        <ellipse cx="120" cy="340" rx="28" ry="48" transform="rotate(-35 120 340)" fill="#7aaa7a" opacity="0.55"/>
        <ellipse cx="120" cy="340" rx="14" ry="24" transform="rotate(-35 120 340)" fill="#9ecb9e" opacity="0.35"/>
        <ellipse cx="100" cy="280" rx="26" ry="44" transform="rotate(-28 100 280)" fill="#6a9e6a" opacity="0.5"/>
        <ellipse cx="108" cy="220" rx="24" ry="40" transform="rotate(-40 108 220)" fill="#88bc88" opacity="0.52"/>
        <ellipse cx="118" cy="165" rx="22" ry="36" transform="rotate(-32 118 165)" fill="#72ae72" opacity="0.48"/>
        <ellipse cx="130" cy="115" rx="20" ry="33" transform="rotate(-25 130 115)" fill="#7aba7a" opacity="0.45"/>
        <ellipse cx="145" cy="70" rx="18" ry="28" transform="rotate(-18 145 70)" fill="#86c286" opacity="0.42"/>
        <ellipse cx="200" cy="320" rx="27" ry="46" transform="rotate(32 200 320)" fill="#82b882" opacity="0.52"/>
        <ellipse cx="200" cy="320" rx="13" ry="23" transform="rotate(32 200 320)" fill="#a4cca4" opacity="0.3"/>
        <ellipse cx="212" cy="258" rx="25" ry="42" transform="rotate(26 212 258)" fill="#6eaa6e" opacity="0.5"/>
        <ellipse cx="206" cy="198" rx="23" ry="38" transform="rotate(35 206 198)" fill="#8abe8a" opacity="0.48"/>
        <ellipse cx="196" cy="145" rx="21" ry="34" transform="rotate(28 196 145)" fill="#74b074" opacity="0.45"/>
        <ellipse cx="185" cy="98" rx="19" ry="30" transform="rotate(20 185 98)" fill="#80bc80" opacity="0.43"/>
        <ellipse cx="172" cy="58" rx="16" ry="26" transform="rotate(14 172 58)" fill="#8aca8a" opacity="0.4"/>
        <circle cx="148" cy="42" r="5" fill="#b8d4a0" opacity="0.65"/>
        <circle cx="156" cy="36" r="4" fill="#a8ca90" opacity="0.6"/>
        <circle cx="164" cy="44" r="4.5" fill="#b0ce98" opacity="0.62"/>
        <circle cx="172" cy="38" r="3.5" fill="#bcd6a4" opacity="0.58"/>
    </svg>
);

const WatercolourHellebore: React.FC<{ className?: string; opacity?: number }> = ({className = '', opacity = 1}) => (
    <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" className={className} style={{opacity}}>
        <defs>
            <filter id="wch">
                <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="8" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
        </defs>
        <ellipse cx="150" cy="200" rx="120" ry="160" fill="#c8dab8" opacity="0.2" filter="url(#wch)"/>
        <path d="M150,380 C148,320 152,270 145,220 C140,180 130,150 142,100" fill="none" stroke="#3a6a3a" strokeWidth="1.8" opacity="0.6"/>
        <path d="M150,380 C155,310 158,255 165,200 C172,160 178,130 168,85" fill="none" stroke="#3a6a3a" strokeWidth="1.6" opacity="0.55"/>
        <path d="M150,380 C143,290 135,240 128,190 C122,150 118,115 132,70" fill="none" stroke="#3a6a3a" strokeWidth="1.5" opacity="0.5"/>
        <path d="M145,240 C110,220 80,225 62,205 C80,198 105,194 125,200 C115,185 90,178 76,160 C98,162 120,172 138,185 C130,168 118,150 120,132 C138,148 148,170 150,195" fill="#6a9e5a" opacity="0.48" filter="url(#wch)"/>
        <path d="M155,230 C190,210 220,218 238,198 C220,192 195,190 175,196 C185,180 208,175 222,158 C200,160 178,170 162,183 C170,166 182,148 180,130 C162,146 152,168 150,192" fill="#72a862" opacity="0.46" filter="url(#wch)"/>
        <g transform="translate(132,95) rotate(-15)">
            <ellipse cx="0" cy="-22" rx="14" ry="22" fill="#d4e8c4" opacity="0.72"/>
            <ellipse cx="21" cy="-7" rx="14" ry="22" transform="rotate(72)" fill="#cce4ba" opacity="0.68"/>
            <ellipse cx="13" cy="18" rx="14" ry="22" transform="rotate(144)" fill="#c8e0b4" opacity="0.70"/>
            <ellipse cx="-13" cy="18" rx="14" ry="22" transform="rotate(216)" fill="#d0e6bc" opacity="0.66"/>
            <ellipse cx="-21" cy="-7" rx="14" ry="22" transform="rotate(288)" fill="#cae2b8" opacity="0.68"/>
            <circle cx="0" cy="0" r="8" fill="#e8f4d0" opacity="0.85"/>
            <circle cx="0" cy="0" r="4" fill="#b8d490" opacity="0.7"/>
        </g>
        <g transform="translate(170,80) rotate(20)">
            <ellipse cx="0" cy="-18" rx="12" ry="18" fill="#dcecc8" opacity="0.68"/>
            <ellipse cx="17" cy="-6" rx="12" ry="18" transform="rotate(72)" fill="#d4e8c0" opacity="0.65"/>
            <ellipse cx="11" cy="14" rx="12" ry="18" transform="rotate(144)" fill="#cce4bc" opacity="0.67"/>
            <ellipse cx="-11" cy="14" rx="12" ry="18" transform="rotate(216)" fill="#d8eac4" opacity="0.63"/>
            <ellipse cx="-17" cy="-6" rx="12" ry="18" transform="rotate(288)" fill="#d0e6be" opacity="0.65"/>
            <circle cx="0" cy="0" r="6.5" fill="#eaf6d8" opacity="0.82"/>
            <circle cx="0" cy="0" r="3" fill="#bad692" opacity="0.65"/>
        </g>
        <g transform="translate(120,68)">
            <ellipse cx="0" cy="0" rx="7" ry="14" fill="#c0dc9e" opacity="0.7" transform="rotate(-10)"/>
            <ellipse cx="6" cy="2" rx="6" ry="12" fill="#b8d496" opacity="0.62" transform="rotate(15)"/>
        </g>
    </svg>
);

const WatercolourLeaves: React.FC<{ className?: string; opacity?: number }> = ({className = '', opacity = 1}) => (
    <svg viewBox="0 0 280 340" xmlns="http://www.w3.org/2000/svg" className={className} style={{opacity}}>
        <defs>
            <filter id="wcl">
                <feTurbulence type="fractalNoise" baseFrequency="0.042" numOctaves="4" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
        </defs>
        <ellipse cx="140" cy="180" rx="110" ry="145" fill="#b0cc9e" opacity="0.18" filter="url(#wcl)"/>
        <path d="M140,330 C135,270 128,210 120,155 C112,105 98,70 115,30" fill="none" stroke="#4a7c4a" strokeWidth="2" opacity="0.55"/>
        <path d="M115,180 C80,165 50,172 32,150 C22,138 28,118 45,112 C62,106 88,118 108,140" fill="#78b078" opacity="0.42" filter="url(#wcl)"/>
        <path d="M122,130 C90,112 68,118 52,96 C44,85 52,66 68,62 C86,57 108,72 122,96" fill="#6eaa6e" opacity="0.40" filter="url(#wcl)"/>
        <path d="M118,78  C95,58  80,62  66,42  C60,32  66,14  82,10  C98,6   116,22  120,48" fill="#82be82" opacity="0.38" filter="url(#wcl)"/>
        <path d="M140,200 C175,182 205,188 222,164 C232,150 225,130 208,125 C190,120 166,134 148,156" fill="#80b880" opacity="0.44" filter="url(#wcl)"/>
        <path d="M138,148 C170,128 198,134 214,110 C222,98 214,78  198,74  C180,70  158,84  142,108" fill="#70ae70" opacity="0.42" filter="url(#wcl)"/>
        <path d="M136,98  C162,76  186,80  200,58  C206,46  198,28  184,26  C168,22  148,38  136,60" fill="#86c286" opacity="0.38" filter="url(#wcl)"/>
        <ellipse cx="58" cy="240" rx="12" ry="20" transform="rotate(-25 58 240)" fill="#8aba8a" opacity="0.38"/>
        <ellipse cx="220" cy="255" rx="10" ry="17" transform="rotate(30 220 255)" fill="#78b078" opacity="0.35"/>
        <ellipse cx="250" cy="180" rx="9" ry="16" transform="rotate(-18 250 180)" fill="#82be82" opacity="0.33"/>
    </svg>
);

const WatercolourBranch: React.FC<{ className?: string; opacity?: number }> = ({className = '', opacity = 1}) => (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" className={className} style={{opacity}}>
        <defs>
            <filter id="wcb">
                <feTurbulence type="fractalNoise" baseFrequency="0.038" numOctaves="3" result="n"/>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="8" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
        </defs>
        <ellipse cx="180" cy="120" rx="160" ry="100" fill="#b4cca4" opacity="0.16" filter="url(#wcb)"/>
        <path d="M20,200 C80,170 160,140 240,110 C290,90 330,72 350,50" fill="none" stroke="#4a7a4a" strokeWidth="2.4" opacity="0.6"/>
        <path d="M100,168 C95,140 85,115 75,88" fill="none" stroke="#3a6a3a" strokeWidth="1.4" opacity="0.5"/>
        <path d="M175,138 C172,108 165,82  162,55" fill="none" stroke="#3a6a3a" strokeWidth="1.3" opacity="0.48"/>
        <path d="M260,105 C262,76  270,52  275,28" fill="none" stroke="#3a6a3a" strokeWidth="1.2" opacity="0.45"/>
        <ellipse cx="72" cy="78" rx="18" ry="30" transform="rotate(-40 72 78)" fill="#7ab47a" opacity="0.5" filter="url(#wcb)"/>
        <ellipse cx="58" cy="68" rx="15" ry="26" transform="rotate(-55 58 68)" fill="#88c088" opacity="0.44"/>
        <ellipse cx="86" cy="72" rx="14" ry="24" transform="rotate(-28 86 72)" fill="#6eaa6e" opacity="0.46"/>
        <ellipse cx="160" cy="46" rx="17" ry="28" transform="rotate(-35 160 46)" fill="#80b880" opacity="0.48" filter="url(#wcb)"/>
        <ellipse cx="146" cy="40" rx="14" ry="23" transform="rotate(-50 146 40)" fill="#8abe8a" opacity="0.42"/>
        <ellipse cx="174" cy="42" rx="13" ry="22" transform="rotate(-22 174 42)" fill="#74b074" opacity="0.44"/>
        <ellipse cx="274" cy="22" rx="16" ry="26" transform="rotate(-30 274 22)" fill="#78b878" opacity="0.46" filter="url(#wcb)"/>
        <ellipse cx="260" cy="18" rx="13" ry="21" transform="rotate(-46 260 18)" fill="#86c286" opacity="0.4"/>
        <ellipse cx="288" cy="20" rx="12" ry="20" transform="rotate(-18 288 20)" fill="#6cac6c" opacity="0.42"/>
        <ellipse cx="135" cy="148" rx="13" ry="22" transform="rotate(-15 135 148)" fill="#8aba8a" opacity="0.38"/>
        <ellipse cx="210" cy="118" rx="12" ry="20" transform="rotate(-20 210 118)" fill="#7ab27a" opacity="0.36"/>
    </svg>
);

// ─── Corner botanicals for chart frames ──────────────────────────────────────
const CORNER_SVGS = [
    (color: string) => (
        <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g fill="none" stroke={color} strokeWidth="1" opacity="0.45">
                <path d="M8,82 Q20,55 38,22 Q50,5 55,2"/>
                <path d="M22,64 Q8,54 4,40"/><path d="M22,64 Q36,54 40,40"/>
                <path d="M30,46 Q16,36 12,22"/><path d="M30,46 Q44,36 48,22"/>
                <path d="M38,30 Q26,20 24,8"/><path d="M38,30 Q50,20 52,8"/>
            </g>
        </svg>
    ),
    (color: string) => (
        <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g opacity="0.5">
                <path d="M5,85 Q25,60 45,30 Q56,12 60,4" fill="none" stroke={color} strokeWidth="1.2"/>
                <ellipse cx="28" cy="58" rx="12" ry="20" transform="rotate(-40 28 58)" fill={color} opacity="0.28"/>
                <ellipse cx="40" cy="38" rx="11" ry="18" transform="rotate(-30 40 38)" fill={color} opacity="0.26"/>
                <ellipse cx="52" cy="20" rx="9" ry="15" transform="rotate(-22 52 20)" fill={color} opacity="0.24"/>
                <circle cx="58" cy="6" r="3.5" fill={color} opacity="0.3"/>
                <circle cx="63" cy="2" r="2.5" fill={color} opacity="0.25"/>
            </g>
        </svg>
    ),
    (color: string) => (
        <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g opacity="0.45">
                <path d="M6,84 Q30,55 55,25 Q65,12 68,5" fill="none" stroke={color} strokeWidth="1.1"/>
                <path d="M18,68 C4,58 2,40 14,30 C26,20 40,30 38,50 Z" fill={color} opacity="0.3"/>
                <path d="M34,48 C20,38 18,20 30,10 C42,0 56,10 54,30 Z" fill={color} opacity="0.28"/>
                <path d="M50,28 C38,18 38,4 50,-4 C62,-12 72,-2 68,16 Z" fill={color} opacity="0.26"/>
            </g>
        </svg>
    ),
    (color: string) => (
        <svg viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g opacity="0.48">
                <path d="M8,82 Q28,60 42,35 Q50,18 52,8" fill="none" stroke={color} strokeWidth="1.1"/>
                <ellipse cx="35" cy="55" rx="10" ry="17" transform="rotate(-35 35 55)" fill={color} opacity="0.28"/>
                <ellipse cx="46" cy="35" rx="9" ry="15" transform="rotate(-25 46 35)" fill={color} opacity="0.26"/>
                <ellipse cx="52" cy="10" rx="7" ry="12" transform="rotate(-15 52 10)" fill={color} opacity="0.32"/>
                <ellipse cx="60" cy="6" rx="6" ry="10" transform="rotate(20 60 6)" fill={color} opacity="0.28"/>
                <circle cx="54" cy="8" r="4" fill={color} opacity="0.4"/>
            </g>
        </svg>
    ),
];

const ChartCornerPlant: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; variant: number }> = ({position, variant}) => {
    const posClass = {tl: 'top-0 left-0', tr: 'top-0 right-0', bl: 'bottom-0 left-0', br: 'bottom-0 right-0'}[position];
    const rotate = {tl: 0, tr: 90, bl: 270, br: 180}[position];
    return (
        <div className={`absolute ${posClass} w-24 h-24 pointer-events-none z-10`} style={{transform: `rotate(${rotate}deg)`}}>
            {CORNER_SVGS[variant % 4]('#3d6e3d')}
        </div>
    );
};

// ─── Narrative row ────────────────────────────────────────────────────────────
interface NarrativeRowProps {
    label: string;
    heading: string;
    body: string;
    Illustration: React.FC<{ className?: string; opacity?: number }>;
    flip?: boolean;
    dark?: boolean;
    delay?: number;
}

const NarrativeRow: React.FC<NarrativeRowProps> = ({label, heading, body, Illustration, flip = false, dark = false, delay = 0}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true, amount: 0.2});

    const textCol = (
        <motion.div
            initial={{opacity: 0, x: flip ? 40 : -40}}
            animate={isInView ? {opacity: 1, x: 0} : {}}
            transition={{duration: 0.9, delay, ease: 'easeOut'}}
            className="flex flex-col justify-center gap-6 py-8 md:py-0"
        >
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${dark ? 'text-lg opacity-70' : 'text-mg'}`}>{label}</p>
            <h2 className={`font-serif font-black leading-[1.05] text-4xl md:text-5xl ${dark ? 'text-cream' : 'text-dg'}`}
                dangerouslySetInnerHTML={{__html: heading}}/>
            <p
    style={{color: dark ? 'white' : '#18160f'}}
    className="font-body text-lg md:text-xl leading-relaxed"
    dangerouslySetInnerHTML={{__html: body}}
/>
        </motion.div>
    );

    const imageCol = (
        <motion.div
            initial={{opacity: 0, scale: 0.94}}
            animate={isInView ? {opacity: 1, scale: 1} : {}}
            transition={{duration: 1.1, delay: delay + 0.15, ease: 'easeOut'}}
            className="relative flex items-center justify-center"
        >
            <div className={`w-full aspect-[3/4] rounded-2xl overflow-hidden flex items-center justify-center ${dark ? 'bg-white/5' : 'bg-dg/[0.03]'}`}>
                <Illustration className="w-[88%] h-[88%]" opacity={0.92}/>
            </div>
        </motion.div>
    );

    return (
        <div ref={ref} className={`relative overflow-hidden ${dark ? 'bg-dg' : 'bg-cream'}`}>
            <div className={`absolute ${flip ? '-right-40' : '-left-40'} top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] pointer-events-none`}>
                <Illustration className="w-full h-full" opacity={dark ? 0.04 : 0.06}/>
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                {flip ? <>{imageCol}{textCol}</> : <>{textCol}{imageCol}</>}
            </div>
        </div>
    );
};

// ─── Personal sign-off ────────────────────────────────────────────────────────
const ConclusionSignoff: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true, amount: 0.2});

    return (
        <div ref={ref} className="relative overflow-hidden bg-cream">
            <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] pointer-events-none">
                <WatercolourBranch className="w-full h-full" opacity={0.06}/>
            </div>
            <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                {/* Illustration left */}
                <motion.div
                    initial={{opacity: 0, scale: 0.94}}
                    animate={isInView ? {opacity: 1, scale: 1} : {}}
                    transition={{duration: 1.1, delay: 0.15, ease: 'easeOut'}}
                    className="relative flex items-center justify-center"
                >
                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden flex items-center justify-center bg-dg/[0.03]">
                        <WatercolourBranch className="w-[88%] h-[88%]" opacity={0.92}/>
                    </div>
                </motion.div>

                {/* Text right */}
                <motion.div
                    initial={{opacity: 0, x: -40}}
                    animate={isInView ? {opacity: 1, x: 0} : {}}
                    transition={{duration: 0.9, ease: 'easeOut'}}
                    className="flex flex-col justify-center gap-8"
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-mg">My personal take</p>
                    <h2 className="font-serif font-black leading-[1.05] text-4xl md:text-5xl text-dg">
                        I'm not asking you to agree.
                    </h2>
                    <div className="bg-dg/95 text-cream rounded-[2rem] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] border border-white/10">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-full bg-lg/30 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-lg">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-lg/70">My reflection</p>
                        </div>
                        <p className="font-body text-lg leading-relaxed text-cream/90 italic">
                            "I grew up eating meat almost every day. It felt normal as it was in Germany. Looking at this data didn't make me angry or self-righteous. It made me quietly reckon with how much I hadn't thought about. I went vegan not because someone told me to, but because I couldn't unsee what the numbers showed."
                        </p>
                    </div>
                    <p className="font-body text-ink/70 md:text-xl leading-relaxed text-ink/70">
                        The data is public. The pattern is there whether I narrate it or not. What you do with it is entirely up to you, but at least now you've seen it.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

// ─── Scrollytelling bubble ────────────────────────────────────────────────────
interface SubSectionProps {
    content: string;
    type: 'explanation' | 'context' | 'personal';
    align: 'left' | 'right';
    title: string;
    subtitle?: string;
    category: StoryCategory;
}

const SubSection: React.FC<SubSectionProps> = ({content, type, align, title, subtitle, category}) => (
    <div className={`h-[200vh] flex items-center px-6 md:px-20 relative z-20 ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
        <motion.div
            initial={{opacity: 0, y: 150, scale: 0.9}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -150, scale: 0.9}}
            viewport={{once: false, margin: '-15% 0px -15% 0px'}}
            transition={{duration: 0.8, ease: 'easeOut'}}
            className={`max-w-xl p-10 md:p-14 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl border border-white/40 ${
                type === 'context' ? 'bg-dg/95 text-cream' : 'bg-cream/95 text-ink'
            }`}
        >
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-inner ${
                        type === 'explanation' ? 'bg-sg text-dg' : 'bg-lg/30 text-lg'
                    }`}>
                        {type === 'explanation' && <Info className="w-7 h-7"/>}
                        {type === 'context' && <Earth className="w-7 h-7"/>}
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">{category}</p>
                        <h3 className="text-2xl font-serif font-bold leading-tight">{title}</h3>
                    </div>
                </div>
                <p className="text-xl md:text-2xl leading-relaxed font-body italic"
                   dangerouslySetInnerHTML={{__html: type === 'context' ? `"${content}"` : content}}/>
                {subtitle && type === 'explanation' && (
                    <p className="text-xs font-bold uppercase tracking-widest opacity-30 pt-4 border-t border-dg/10">{subtitle}</p>
                )}
            </div>
        </motion.div>
    </div>
);

// ─── Per-chart sticky section ─────────────────────────────────────────────────
const StorySectionWrapper: React.FC<{ section: StorySection; index: number; onInView: (id: number) => void }> = ({section, index, onInView}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll({target: containerRef, offset: ['start end', 'end start']});
    const chartOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
    const chartScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.9]);
    const chartY = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [100, 0, 0, -100]);
    const isInView = useInView(containerRef, {amount: 0.1});
    useEffect(() => {
        if (isInView) onInView(section.visualId);
    }, [isInView, section.visualId, onInView]);

    const isSingle = !!section.singleBubble;
    const bgClass = CHART_BG[index] ?? 'bg-cream';
    const cv = index % 4;

    return (
        <div ref={containerRef} className={`relative z-10 ${isSingle ? 'h-[400vh]' : 'h-[700vh]'} ${bgClass}`}>
            <div className="sticky top-0 h-screen w-full flex items-center justify-center p-4 md:p-8 lg:p-12 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{opacity: chartOpacity, scale: chartScale, y: chartY}}
                    className="w-full h-full max-w-[92vw] max-h-[85vh] relative rounded-[1.5rem] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,0.15)] border-[12px] border-cream-dark bg-white pointer-events-auto"
                >
                    <TableauViz vizUrl={section.tableauSheet}/>
                    <ChartCornerPlant position="tl" variant={cv}/>
                    <ChartCornerPlant position="br" variant={(cv + 2) % 4}/>
                </motion.div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                <div className="h-[200vh]"/>
                {isSingle ? (
                    <div className="pointer-events-auto">
                        <SubSection content={section.singleBubble!} type="explanation" align="right"
                                    title={section.title} subtitle={section.subtitle} category={section.category}/>
                    </div>
                ) : (
                    <>
                        {section.paragraphs && (
                            <>
                                <div className="pointer-events-auto">
                                    <SubSection content={section.paragraphs.explanation} type="explanation" align="right"
                                                title={section.title} subtitle={section.subtitle} category={section.category}/>
                                </div>
                                <div className="pointer-events-auto">
                                    <SubSection content={section.paragraphs.context} type="context" align="left"
                                                title={section.title} category={section.category}/>
                                </div>
                            </>
                        )}
                    </>
                )}
                <div className="h-[100vh]"/>
            </div>
        </div>
    );
};

// ─── Hero leaf ghost ──────────────────────────────────────────────────────────
const HeroLeaf: React.FC<{ className?: string; rotate?: number; delay?: number }> = ({className, rotate = 0, delay = 0}) => (
    <motion.div initial={{opacity: 0, scale: 0.8, rotate: rotate - 10}} whileInView={{opacity: 0.15, scale: 1, rotate}}
                transition={{duration: 1.5, delay}} className={`absolute pointer-events-none ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full fill-dg">
            <path d="M100,20 C120,50 160,70 160,110 C160,150 130,180 100,180 C70,180 40,150 40,110 C40,70 80,50 100,20 Z"/>
            <path d="M100,20 L100,180 M100,60 L140,80 M100,90 L60,110 M100,120 L140,140 M100,150 L60,170" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
    </motion.div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
    const introRef = useRef<HTMLDivElement>(null);
    const {scrollYProgress} = useScroll();
    const scaleX = useSpring(scrollYProgress, {stiffness: 100, damping: 30, restDelta: 0.001});

    return (
        <div className="relative bg-cream min-h-screen font-body">

            <div className="fixed top-0 left-0 right-0 z-[100]">
                <motion.div className="h-2 bg-mg origin-left" style={{scaleX}}/>
            </div>

            {/* ══ HERO ══ */}
            <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-dg text-cream z-50">
                <HeroLeaf className="w-96 h-96 -top-20 -left-20 opacity-20" rotate={-15}/>
                <HeroLeaf className="w-[30rem] h-[30rem] -bottom-40 -right-20 opacity-20" rotate={160}/>
                <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
                            transition={{duration: 1.2, ease: 'easeOut'}} className="z-10 max-w-5xl">
                    <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-8 uppercase font-serif leading-[0.8]">
                        The Data<br/>
                        <span className="text-lg italic font-normal lowercase font-serif">made me</span><br/>
                        Do It
                    </h1>
                    <p className="text-2xl md:text-4xl font-medium opacity-80 mb-16 max-w-3xl mx-auto leading-tight font-body italic">
                        A scrollytelling journey into why I chose a plant-based life.
                    </p>
                    <motion.button
                        onClick={() => introRef.current?.scrollIntoView({behavior: 'smooth'})}
                        animate={{y: [0, 15, 0]}} transition={{repeat: Infinity, duration: 2.5}}
                        className="flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                        <p className="uppercase tracking-[0.5em] text-xs font-bold">Scroll to explore</p>
                        <div className="w-px h-20 bg-gradient-to-b from-cream to-transparent"/>
                    </motion.button>
                </motion.div>
            </section>

            {/* ══ INTRODUCTION ══ */}
            <div ref={introRef}>
                <NarrativeRow
                    label="Introduction"
                    heading="This is the story told through data on why I decided to become vegan"
                    body="I was already interested in sustainability and I noticed that my diet plan could play a bigger role than i had imagined. Looking at the numbers made me realize, my diet makes a difference."
                    Illustration={WatercolourEucalyptus}
                    flip={false} dark={false} delay={0}
                />
                <NarrativeRow
                    label=""
                    heading="Twelve charts. Three dimensions. One conclusion."
                    body="Each section shows a different dataset showcasing the global scale, the environmental- and the health impact. Scroll through them and watch whether a pattern emerges. I'll tell you what I found, but you can look for yourself."
                    Illustration={WatercolourHellebore}
                    flip={true} dark={true} delay={0.1}
                />
            </div>

            {/* ══ CHARTS ══ */}
            <div className="relative">
                {storyData.map((section, i) => (
                    <StorySectionWrapper key={section.id} section={section} index={i} onInView={() => {}}/>
                ))}
            </div>

            {/* ══ CONCLUSION ══ */}
            <NarrativeRow
                label="What I took away"
                heading="It was never one&nbsp;<em>chart</em>."
                body="No single statistic converted me. What changed my mind was the consistency. Twelve datasets, three independent dimensions of global scale, environmental impact and a public health issue. All pointing in the same direction. At some point the pattern became impossible for me to ignore."
                Illustration={WatercolourLeaves}
                flip={false} dark={true} delay={0}
            />

            <ConclusionSignoff/>

            {/* ══ FINAL CTA ══ */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 bg-dg text-cream relative overflow-hidden py-20">
                <HeroLeaf className="w-[40rem] h-[40rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" rotate={30}/>

                <motion.div initial={{opacity: 0, scale: 0.95}} whileInView={{opacity: 1, scale: 1}}
                            transition={{duration: 1.2}} className="max-w-4xl z-10 flex flex-col items-center gap-16">

                    <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase font-serif leading-none">
                        Where do you<br/>
                        <span className="text-lg italic font-normal lowercase font-serif block mt-4">stand?</span>
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <a href="https://public.tableau.com/app/profile/paula.giensch/viz/FinalProject-StoryWhyITurnedVegan/Veganism"
                           target="_blank" rel="noopener noreferrer"
                           className="group relative inline-flex items-center gap-3 px-10 py-5 bg-lg text-dg text-xl font-bold uppercase tracking-widest rounded-full hover:bg-cream transition-all shadow-2xl">
                            <span className="relative z-10">Explore the Full Data</span>
                            <TrendingUp className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform"/>
                        </a>
                        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                                className="px-10 py-5 border-2 border-cream/30 text-cream text-xl font-bold uppercase tracking-widest rounded-full hover:bg-cream/10 transition-all">
                            Back to Start
                        </button>
                    </div>

                    {/* Sources */}
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cream/40">Data Sources</p>
                        <div className="flex flex-col gap-2 text-xs text-cream/40 font-body">
                            <a href="https://ourworldindata.org" target="_blank" rel="noopener noreferrer"
                               className="hover:text-cream/70 transition-colors">Our World in Data</a>
                            <a href="https://www.ship-technology.com/features/the-top-10-largest-container-ships-in-the-world/?cf-view" target="_blank" rel="noopener noreferrer"
                               className="hover:text-cream/70 transition-colors">Ship Technology</a>
                            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12349092/" target="_blank" rel="noopener noreferrer"
                               className="hover:text-cream/70 transition-colors">National Library of Medicine</a>
                            <a href="https://ourworldindata.org/travel-carbon-footprint" target="_blank" rel="noopener noreferrer"
                               className="hover:text-cream/70 transition-colors">Our World in Data - Travel Carbon Footprint</a>
                            <a href="https://ourworldindata.org/global-land-for-agriculture#:~:text=We%20use%20a%20lot%20of,large%20as%20China's%20land%20area" target="_blank" rel="noopener noreferrer"
                               className="hover:text-cream/70 transition-colors">Our World in Data - Land and Agriculture</a>
                            <a href="https://www.wwf.org.uk/updates/soy-story" target="_blank" rel="noopener noreferrer"
                               className="hover:text-cream/70 transition-colors">WWF</a>
                            <a href="https://openknowledge.fao.org/server/api/core/bitstreams/a7f92713-890a-4ff8-85ae-eb2aa76ae702/content/state-of-the-worlds-land-and-water-resources-for-food-and-agriculture-2025-2025/scenarios-offer-insights-assumptions.html" target="_blank" rel="noopener noreferrer"
                               className="hover:text-cream/70 transition-colors">Openknowledge</a>
                        </div>
                    </div>

                </motion.div>

                <footer className="absolute bottom-10 w-full text-center">
                    <div className="w-20 h-px bg-cream/20 mx-auto mb-6"/>
                    <p className="text-xs opacity-40 font-bold tracking-[0.5em] uppercase">
                        Paula Giensch &bull; 2026 &bull; Understanding Data
                    </p>
                </footer>
            </section>

        </div>
    );
}