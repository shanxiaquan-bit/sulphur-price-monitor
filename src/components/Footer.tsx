import { Link } from 'react-router';
import { ExternalLink } from 'lucide-react';

const quickSources = [
  { name: '生意社硫磺频道', url: 'https://sulfur.100ppi.com' },
  { name: 'SMM 快讯', url: 'https://news.smm.cn' },
  { name: 'TradingEconomics 硫磺', url: 'https://tradingeconomics.com/commodity/sulfur' },
  { name: 'Argus Media', url: 'https://www.argusmedia.com' },
  { name: 'ChemNet 化工网', url: 'https://news.chemnet.com' },
];

const navItems = [
  { to: '/', label: '价格仪表盘' },
  { to: '/trends', label: '价格走势' },
  { to: '/regions', label: '区域市场' },
  { to: '/news', label: '市场动态' },
  { to: '/sources', label: '数据来源' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#3A332C] bg-[#1C1917] text-[#CFC7BB]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
              <rect x="9" y="9" width="14" height="14" rx="1.5" transform="rotate(45 16 16)" fill="#B45309" />
              <rect x="12.5" y="12.5" width="7" height="7" rx="0.5" transform="rotate(45 16 16)" fill="#FBEEDB" />
            </svg>
            <span className="text-sm font-bold text-[#FAF7F1]">硫磺价格监测站</span>
          </div>
          <p className="text-xs leading-relaxed text-[#A89F93]">
            监测中国主要硫磺贸易区域价格与海外硫磺价格。数据快照日期：2026-07-17；每条价格均标注来源名称、日期与原始链接。
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#E8C99A]">站内导航</h3>
          <ul className="space-y-2">
            {navItems.map((it) => (
              <li key={it.to}>
                <Link to={it.to} className="text-xs text-[#CFC7BB] transition-colors hover:text-[#F5C076]">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#E8C99A]">常用信息源</h3>
          <ul className="space-y-2">
            {quickSources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#CFC7BB] transition-colors hover:text-[#F5C076]"
                >
                  {s.name}
                  <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#3A332C]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-6">
          <p className="text-[11px] text-[#8A8177]">
            免责声明：本站数据均来自公开信息源（生意社、SMM、隆众、Argus 等），仅供研究参考，不构成任何投资建议。
          </p>
          <p className="font-mono text-[11px] text-[#8A8177]">SNAPSHOT 2026-07-17</p>
        </div>
      </div>
    </footer>
  );
}
