import { Cake, CalendarDays, ShieldCheck, Sun, Table } from 'lucide-react';

export const TABS = [
  { key: 'solar', label: '양/음력', icon: Sun },
  { key: 'dday', label: '날짜 계산', icon: CalendarDays },
  { key: 'age', label: '만 나이/띠', icon: Cake },
  { key: 'zodiac', label: '띠 대조표', icon: Table },
  { key: 'military', label: '전역일', icon: ShieldCheck },
];

export default function TabBar({ value, onChange }) {
  return (
    <nav
      role="tablist"
      aria-label="기능 선택"
      className="sticky top-3 z-20 rounded-2xl border border-white/60 bg-white/90 p-1.5 shadow-lg shadow-slate-200/60 backdrop-blur"
    >
      <div className="grid grid-cols-5 gap-1">
        {TABS.map((t) => {
          const active = t.key === value;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(t.key)}
              className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2.5 transition-all duration-200 active:scale-95 ${
                active
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <t.icon size={18} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10.5px] font-bold leading-none">{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
