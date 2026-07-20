import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface RevealProps {
  children: ReactNode;
  /** 入场延迟 ms（stagger 用） */
  delay?: number;
  className?: string;
}

/** 滚动进入视口后播放 fadeSlideUp 入场动画（一次） */
export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${inView ? 'animate-enter' : 'opacity-0'} ${className}`}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
