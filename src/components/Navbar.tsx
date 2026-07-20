import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: '价格仪表盘' },
  { to: '/trends', label: '价格走势' },
  { to: '/regions', label: '区域市场' },
  { to: '/news', label: '市场动态' },
  { to: '/sources', label: '数据来源' },
];

/** 品牌标：琥珀菱形硫结晶 SVG */
function BrandMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect x="9" y="9" width="14" height="14" rx="1.5" transform="rotate(45 16 16)" fill="#B45309" />
      <rect x="12.5" y="12.5" width="7" height="7" rx="0.5" transform="rotate(45 16 16)" fill="#FBEEDB" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#3A332C] bg-[#1C1917]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="leading-tight">
            <span className="block text-[15px] font-bold tracking-wide text-[#FAF7F1]">硫磺价格监测站</span>
            <span className="block font-mono text-[10px] tracking-[0.22em] text-[#A89F93]">
              SULPHUR PRICE MONITOR
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative rounded-md px-3.5 py-2 text-sm transition-colors ${
                  isActive
                    ? 'font-semibold text-[#F5C076] after:absolute after:inset-x-3 after:bottom-0.5 after:h-0.5 after:bg-[#B45309]'
                    : 'text-[#CFC7BB] hover:bg-[#292524] hover:text-[#FAF7F1]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded border border-[#B45309]/40 bg-[#292524] px-2.5 py-1 font-mono text-[11px] text-[#E8C99A]">
            数据快照 2026-07-17
          </span>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-[#CFC7BB] hover:bg-[#292524] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? '关闭菜单' : '打开菜单'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-[#3A332C] bg-[#1C1917] px-4 pb-4 pt-2 md:hidden" aria-label="移动端导航">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2.5 text-sm ${
                  isActive ? 'bg-[#292524] font-semibold text-[#F5C076]' : 'text-[#CFC7BB] hover:bg-[#292524]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mt-2 px-3">
            <span className="inline-block rounded border border-[#B45309]/40 bg-[#292524] px-2.5 py-1 font-mono text-[11px] text-[#E8C99A]">
              数据快照 2026-07-17
            </span>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
