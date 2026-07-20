import type { ReactNode } from 'react';

interface SectionHeaderProps {
  /** 琥珀小标签，如 "DOMESTIC · 元/吨" */
  kicker: string;
  title: string;
  /** 右侧注释（数据日期/来源说明） */
  aside?: ReactNode;
}

export default function SectionHeader({ kicker, title, aside }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[#E7DFD2] pb-4">
      <div>
        <div className="mb-1.5 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rotate-45 bg-[#B45309]" aria-hidden />
          <span className="text-xs font-medium tracking-[0.18em] text-[#B45309]">{kicker}</span>
        </div>
        <h2 className="text-xl font-bold text-[#1C1917] sm:text-2xl">{title}</h2>
      </div>
      {aside ? <div className="text-xs leading-relaxed text-[#8A8177]">{aside}</div> : null}
    </div>
  );
}
