import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StickerProps {
  icon: LucideIcon;
  color: string;
  className?: string;
  delay?: number;
}

export default function Sticker({ icon: Icon, color, className, delay = 0 }: StickerProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      whileInView={{ scale: 1, rotate: 10 }}
      animate={{
        y: [0, -15, 0],
        rotate: [10, 15, 10],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      className={`absolute p-4 rounded-full shadow-xl border-4 border-white/80 backdrop-blur-md ${color} ${className} z-10`}
    >
      <Icon className="w-10 h-10 text-white" />
    </motion.div>
  );
}
