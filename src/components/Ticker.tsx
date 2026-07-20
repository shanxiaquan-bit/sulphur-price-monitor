import { TrendingDown, TrendingUp } from 'lucide-react';

interface TickerItem {
  label: string;
  value: string;
  unit: string;
  direction?: 'up' | 'down';
}

/** 跑马灯内容：12条最新价格（数据同仪表盘卡片，快照 2026-07-17） */
const items: TickerItem[] = [
  { label: '生意社基准价', value: '9235.67', unit: '元/吨', direction: 'up' },
  { label: 'SMM EXW山东', value: '9250', unit: '元/吨' },
  { label: '进口颗粒(港口)', value: '9000', unit: '元/吨', direction: 'up' },
  { label: '山东地炼液硫', value: '8955–9063', unit: '元/吨' },
  { label: '镇江港(6-14峰值)', value: '11700–12000', unit: '元/吨' },
  { label: '防城港(6-14峰值)', value: '11800–12000', unit: '元/吨' },
  { label: 'ADNOC OSP 7月', value: '1000', unit: '美元/吨', direction: 'up' },
  { label: '卡塔尔QSP 7月', value: '890', unit: '美元/吨', direction: 'up' },
  { label: '科威特KSP 6月', value: '805', unit: '美元/吨', direction: 'up' },
  { label: '温哥华FOB 6月', value: '990–1100', unit: '美元/吨' },
  { label: '中国CFR 6月', value: '959–975', unit: '美元/吨' },
  { label: 'CIF印尼 6-25起', value: '1100–1200', unit: '美元/吨', direction: 'down' },
];

function TickerRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((it, i) => (
        <span key={i} className="mx-5 inline-flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-[11px] text-[#8A8177]">{it.label}</span>
          <span
            className={`tnum font-mono text-xs font-semibold ${
              it.direction === 'up' ? 'text-[#DC2626]' : it.direction === 'down' ? 'text-[#15803D]' : 'text-[#1C1917]'
            }`}
          >
            {it.value}
          </span>
          <span className="text-[10px] text-[#B0A797]">{it.unit}</span>
          {it.direction === 'up' ? (
            <TrendingUp className="h-3 w-3 text-[#DC2626]" aria-hidden />
          ) : it.direction === 'down' ? (
            <TrendingDown className="h-3 w-3 text-[#15803D]" aria-hidden />
          ) : null}
          <span className="ml-4 text-[#E0D8CA]" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

/** 顶部价格跑马灯（hover 暂停） */
export default function Ticker() {
  return (
    <div className="ticker-paused overflow-hidden border-b border-[#E7DFD2] bg-[#FDFBF7] py-2" role="marquee" aria-label="最新价格滚动条">
      <div className="animate-ticker flex w-max">
        <TickerRow />
        <TickerRow ariaHidden />
      </div>
    </div>
  );
}
