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
import { mideastHistory, mideastSeriesMeta } from '@/data/mideastHistory';
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
  return `${String(d.getFullYear()).slice(2)}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: Row }> }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  const infos = Object.keys(mideastSeriesMeta)
    .map((s) => row[`${s}_info`] as HistoryPoint | undefined)
    .filter((p): p is HistoryPoint => Boolean(p));
  if (!infos.length) return null;
  return (
    <div className="max-w-xs rounded-lg border border-[#E7DFD2] bg-white p-3 shadow-md">
      <p className="tnum mb-2 font-mono text-xs font-semibold text-[#1C1917]">{row.date}</p>
      <div className="space-y-2">
        {infos.map((p) => (
          <div key={p.series} className="border-l-2 pl-2" style={{ borderColor: mideastSeriesMeta[p.series]?.color }}>
            <p className="flex items-baseline gap-1.5">
              <span className="text-[11px] text-[#57534E]">{mideastSeriesMeta[p.series]?.label}</span>
              <span className="tnum font-mono text-sm font-semibold text-[#1C1917]">
                {p.value.toLocaleString('zh-CN')}
              </span>
              <span className="text-[10px] text-[#8A8177]">美元/吨</span>
            </p>
            <p className="text-[11px] leading-snug text-[#8A8177]">{p.caliber}</p>
            <p className="text-[10px] text-[#B0A797]">来源：{p.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 中东 FOB 月度官价走势（ADNOC / QSP / KSP + 国际参考） */
export default function MideastChart() {
  const rows = useMemo<Row[]>(() => {
    const map = new Map<string, Row>();
    for (const p of mideastHistory) {
      const row = map.get(p.date) ?? { date: p.date, ts: ts(p.date) };
      row[p.series] = p.value;
      row[`${p.series}_info`] = p;
      map.set(p.date, row);
    }
    return [...map.values()].sort((a, b) => (a.ts as number) - (b.ts as number));
  }, []);

  return (
    <div className="h-[400px] w-full">
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
            minTickGap={34}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#8A8177', fontFamily: 'IBM Plex Mono' }}
            tickLine={false}
            axisLine={false}
            width={44}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            formatter={(value: string) => <span style={{ color: '#57534E' }}>{value}</span>}
          />
          <ReferenceLine
            x={ts('2026-02-28')}
            stroke="#DC2626"
            strokeDasharray="4 3"
            strokeWidth={1.5}
            label={{ value: '霍尔木兹封锁', position: 'top', fill: '#DC2626', fontSize: 11, fontWeight: 600 }}
          />
          {Object.entries(mideastSeriesMeta).map(([key, meta]) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={meta.label}
              stroke={meta.color}
              strokeWidth={key === 'adnoc' ? 2.4 : 1.6}
              strokeDasharray={key === 'mideastRef' || key === 'vancouver' || key === 'cfrChina' ? '5 4' : undefined}
              dot={{ r: 2.6, fill: meta.color, strokeWidth: 0 }}
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
