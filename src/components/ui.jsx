export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ icon: Icon, children, className = '' }) {
  return (
    <h2 className={`mb-4 flex items-center gap-2 text-sm font-bold text-slate-700 ${className}`}>
      {Icon && <Icon size={17} className="text-emerald-500" />}
      {children}
    </h2>
  );
}

export function Label({ children }) {
  return <label className="mb-1.5 block text-xs font-semibold text-slate-500">{children}</label>;
}

export function DateInput({ value, onChange, min, max }) {
  return (
    <input
      type="date"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
    />
  );
}

export function Segmented({ options, value, onChange, className = '' }) {
  return (
    <div
      role="tablist"
      className={`grid gap-1 rounded-xl bg-slate-100 p-1 ${className}`}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((o) => {
        const active = o.key === value;
        return (
          <button
            key={o.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.key)}
            className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[13px] font-semibold transition-all duration-200 active:scale-95 ${
              active
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:bg-white/60 hover:text-slate-700'
            }`}
          >
            {o.icon && <o.icon size={15} strokeWidth={2.5} />}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const STAT_TONES = {
  emerald: 'from-emerald-500 to-teal-500',
  amber: 'from-amber-500 to-orange-500',
  rose: 'from-rose-500 to-pink-500',
  sky: 'from-sky-500 to-cyan-500',
  violet: 'from-violet-500 to-purple-500',
};

export function StatCard({ icon: Icon, label, value, sub, tone = 'emerald' }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4 text-center shadow-sm">
      <div
        className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${
          STAT_TONES[tone] || STAT_TONES.emerald
        }`}
      >
        <Icon size={17} />
      </div>
      <div className="text-2xl font-extrabold text-slate-800">{value}</div>
      <div className="mt-0.5 text-xs font-medium text-slate-500">{label}</div>
      {sub && <div className="mt-0.5 text-[11px] text-slate-400">{sub}</div>}
    </div>
  );
}

const BADGE_TONES = {
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700',
  slate: 'bg-slate-100 text-slate-600',
  sky: 'bg-sky-100 text-sky-700',
};

export function Badge({ children, tone = 'emerald' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
        BADGE_TONES[tone] || BADGE_TONES.emerald
      }`}
    >
      {children}
    </span>
  );
}
