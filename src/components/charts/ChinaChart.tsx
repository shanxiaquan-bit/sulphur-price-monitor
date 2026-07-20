import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { chinaHistory, chinaSeriesMeta } from '@/data/chinaHistory';
import { chartEvents } from '@/data/events';
import type { HistoryPoint } from '@/data/types';

type Row = {
  date: string;
  ts: number;
  [key: string]: string | number | HistoryPoint | undefined;
};

function ts(date: string) {
  return new Date(`${date}T00:00:00`).getTime();
}

function fmtTick(t: number) {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const eventColor: Record<string, string> = {
  crisis: '#DC2626',
  peak: '#B45309',
  relief: '#15803D',
};

function ChartTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: Row }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  const infos = Object.keys(chinaSeriesMeta)
    .map((s) => row[`${s}_info`] as HistoryPoint | undefined)
    .filter((p): p is HistoryPoint => Boolean(p));
  if (!infos.length) return null;
  return (
    <div className="max-w-xs rounded-lg border border-[#E7DFD2] bg-white p-3 shadow-md">
      <p className="tnum mb-2 font-mono text-xs font-semibold text-[#1C1917]">{row.date}</p>
      <div className="space-y-2">
        {infos.map((p) => (
          <div key={p.series} className="border-l-2 pl-2" style={{ borderColor: chinaSeriesMeta[p.series]?.color }}>
            <p className="flex items-baseline gap-1.5">
              <span className="text-[11px] text-[#57534E]">{chinaSeriesMeta[p.series]?.label}</span>
              <span className="tnum font-mono text-sm font-semibold text-[#1C1917]">
                {p.value.toLocaleString('zh-CN')}
              </span>
              <span className="text-[10px] text-[#8A8177]">元/吨</span>
            </p>
            <p className="text-[11px] leading-snug text-[#8A8177]">{p.caliber}</p>
            <p className="text-[10px] text-[#B0A797]">来源：{p.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 中国硫磺价格走势（2024–2026，三口径 + 事件标注） */
export default function ChinaChart() {
  const rows = useMemo<Row[]>(() => {
    const map = new Map<string, Row>();
    for (const p of chinaHistory) {
      const row = map.get(p.date) ?? { date: p.date, ts: ts(p.date) };
      row[p.series] = p.value;
      row[`${p.series}_info`] = p;
      map.set(p.date, row);
    }
    return [...map.values()].sort((a, b) => (a.ts as number) - (b.ts as number));
  }, []);

  return (
    <div className="h-[420px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ top: 28, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDE6D9" vertical={false} />
          <XAxis
            dataKey="ts"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={fmtTick}
            tick={{ fontSize: 11, fill: '#8A8177', fontFamily: 'IBM Plex Mono' }}
            tickLine={false}
            axisLine={{ stroke: '#E7DFD2' }}
            minTickGap={40}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#8A8177', fontFamily: 'IBM Plex Mono' }}
            tickLine={false}
            axisLine={false}
            width={52}
            tickFormatter={(v: number) => v.toLocaleString('zh-CN')}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            formatter={(value: string) => <span style={{ color: '#57534E' }}>{value}</span>}
          />
          {chartEvents.map((ev) => (
            <ReferenceLine
              key={ev.date}
              x={ts(ev.date)}
              stroke={eventColor[ev.tone]}
              strokeDasharray="4 3"
              strokeWidth={1.5}
              label={{
                value: ev.label,
                position: 'top',
                fill: eventColor[ev.tone],
                fontSize: 11,
                fontWeight: 600,
              }}
            />
          ))}
          {Object.entries(chinaSeriesMeta).map(([key, meta]) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={meta.label}
              stroke={meta.color}
              strokeWidth={key === 'benchmark' ? 2.4 : 1.8}
              dot={{ r: 2.4, fill: meta.color, strokeWidth: 0 }}
              activeDot={{ r: 4.5 }}
              connectNulls
              isAnimationActive
              animationDuration={900}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
