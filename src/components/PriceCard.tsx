import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import type { PriceEntry } from '@/data/types';
import SourceLink from './SourceLink';

/** 涨跌着色：中国习惯 涨红 / 跌绿 */
function DirectionMark({ direction, change }: { direction?: PriceEntry['direction']; change?: string }) {
  if (!change) return null;
  if (direction === 'up') {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[#DC2626]">
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        {change}
      </span>
    );
  }
  if (direction === 'down') {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[#15803D]">
        <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
        {change}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs font-medium text-[#8A8177]">
      <Minus className="h-3.5 w-3.5" aria-hidden />
      {change}
    </span>
  );
}

export default function PriceCard({ entry }: { entry: PriceEntry }) {
  const priceText = entry.priceHigh
    ? `${entry.price.toLocaleString('zh-CN')}–${entry.priceHigh.toLocaleString('zh-CN')}`
    : entry.price.toLocaleString('zh-CN');

  return (
    <article className="group flex h-full flex-col rounded-xl border border-[#E7DFD2] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B45309]/50">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <span className="mb-1.5 inline-block rounded bg-[#F3EEE5] px-1.5 py-0.5 text-[11px] font-medium text-[#57534E]">
            {entry.region}
          </span>
          <h3 className="text-[13px] font-medium leading-snug tracking-wide text-[#57534E]">{entry.name}</h3>
        </div>
        {entry.badge ? (
          <span className="shrink-0 rounded border border-[#B45309]/30 bg-[#FBEEDB] px-1.5 py-0.5 text-[11px] font-medium text-[#92400E]">
            {entry.badge}
          </span>
        ) : null}
      </div>

      <div className="mb-1.5 flex flex-wrap items-baseline gap-x-2">
        <span className="tnum font-mono text-[26px] font-semibold leading-none text-[#1C1917]">{priceText}</span>
        <span className="text-xs text-[#8A8177]">{entry.unit}</span>
      </div>

      <div className="mb-3 min-h-[18px]">
        <DirectionMark direction={entry.direction} change={entry.change} />
      </div>

      {entry.note ? <p className="mb-3 text-xs leading-relaxed text-[#8A8177]">{entry.note}</p> : null}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[#F0EAE0] pt-3">
        <span className="tnum font-mono text-xs text-[#57534E]">{entry.date}</span>
        <SourceLink source={entry.source} url={entry.sourceUrl} className="text-right" />
      </div>
    </article>
  );
}
