import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, CalendarPlus, PartyPopper, Timer } from 'lucide-react';
import { Badge, Card, CardTitle, DateInput, Label, Segmented } from '../ui.jsx';
import {
  addDays,
  daysBetween,
  fmtDot,
  fmtLong,
  parseDate,
  toInputValue,
  today,
  weekdayOf,
} from '../../lib/format.js';

const PRESETS = [
  { label: '+30일', value: 30 },
  { label: '+100일', value: 100 },
  { label: '+365일', value: 365 },
  { label: '+1000일', value: 1000 },
  { label: '-30일', value: -30 },
];

/** 일수를 "1년 2개월 3일" 형태로 (부호 유지) */
function humanize(n) {
  const sign = n < 0 ? '-' : '';
  const abs = Math.abs(n);
  const years = Math.floor(abs / 365);
  const months = Math.floor((abs % 365) / 30);
  const days = abs % 30;
  const parts = [];
  if (years > 0) parts.push(`${years}년`);
  if (months > 0) parts.push(`${months}개월`);
  parts.push(`${days}일`);
  return sign + parts.join(' ');
}

function DDayBadge({ n }) {
  if (n > 0) return <Badge tone="emerald">D-{n}</Badge>;
  if (n === 0) return <Badge tone="rose">D-Day 🎉</Badge>;
  return <Badge tone="slate">D+{-n}</Badge>;
}

export default function DDayTab() {
  const [mode, setMode] = useState('add');
  const [baseStr, setBaseStr] = useState(toInputValue(today()));
  const [days, setDays] = useState(100);
  const [targetStr, setTargetStr] = useState(toInputValue(addDays(today(), 100)));

  const now = useMemo(() => today(), []);
  const base = useMemo(() => parseDate(baseStr), [baseStr]);
  const target = useMemo(() => parseDate(targetStr), [targetStr]);

  const addResult = useMemo(() => (base ? addDays(base, days) : null), [base, days]);
  const ddayFromToday = useMemo(
    () => (addResult ? daysBetween(now, addResult) : null),
    [addResult, now]
  );
  const dday = useMemo(() => (target ? daysBetween(now, target) : null), [target, now]);

  return (
    <Card>
      <CardTitle icon={CalendarDays}>날짜 / D-Day 계산</CardTitle>

      <Segmented
        value={mode}
        onChange={setMode}
        options={[
          { key: 'add', label: '날짜 더하기', icon: CalendarPlus },
          { key: 'dday', label: 'D-Day 계산', icon: Timer },
        ]}
        className="mb-5"
      />

      {mode === 'add' ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>기준 날짜</Label>
              <DateInput value={baseStr} onChange={setBaseStr} />
            </div>
            <div>
              <Label>더할 일수</Label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const active = days === p.value;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setDays(p.value)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-200 active:scale-95 ${
                    active
                      ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {addResult && base && (
            <div
              key={`add-${baseStr}-${days}`}
              className="animate-fade-up mt-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <span>{fmtDot(base)}</span>
                <ArrowRight size={13} />
                <span>
                  {days > 0 ? '+' : ''}
                  {days}일
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-3xl font-black tracking-tight text-emerald-900">{fmtDot(addResult)}</span>
                <span className="text-sm font-bold text-emerald-600">({weekdayOf(addResult)})</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-emerald-700">오늘 기준</span>
                <DDayBadge n={ddayFromToday} />
                {ddayFromToday !== null && Math.abs(ddayFromToday) > 0 && (
                  <span className="text-[11px] text-emerald-600/80">약 {humanize(ddayFromToday)}</span>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <Label>목표 날짜 (기념일)</Label>
          <DateInput value={targetStr} onChange={setTargetStr} />

          {target && dday !== null && (
            <div
              key={`dday-${targetStr}`}
              className="animate-fade-up mt-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 text-center"
            >
              {dday > 0 ? (
                <>
                  <div className="text-xs font-bold text-emerald-600">목표일까지</div>
                  <div className="mt-1 text-6xl font-black tracking-tight text-emerald-600">D-{dday}</div>
                </>
              ) : dday === 0 ? (
                <>
                  <div className="text-xs font-bold text-rose-500">오늘이 바로 그날!</div>
                  <div className="mt-1 flex items-center justify-center gap-2 text-4xl font-black text-rose-500">
                    D-Day <PartyPopper size={32} />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-xs font-bold text-slate-500">이미 지난 날</div>
                  <div className="mt-1 text-6xl font-black tracking-tight text-slate-500">D+{-dday}</div>
                </>
              )}
              <div className="mt-3 text-sm font-semibold text-slate-600">{fmtLong(target)}</div>
              <div className="mt-1 text-xs text-slate-400">
                오늘 {fmtDot(now)} 기준 · 약 {humanize(dday)}
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
