import { useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, Info, Moon, Sun } from 'lucide-react';
import { Badge, Card, CardTitle, DateInput, Label, Segmented } from '../ui.jsx';
import { parseDate, toInputValue, today } from '../../lib/format.js';
import { lunarToSolar, solarToLunar } from '../../lib/lunar.js';
import { getZodiacByYear } from '../../lib/zodiac.js';
export default function SolarLunarTab() {
const [mode, setMode] = useState('solar2lunar');
const [dateStr, setDateStr] = useState(toInputValue(today()));
const [isLeap, setIsLeap] = useState(false);
const d = useMemo(() => parseDate(dateStr), [dateStr]);
const result = useMemo(() => {
if (!d) return null;
try {
const y = d.getFullYear();
const m = d.getMonth() + 1;
const day = d.getDate();
if (mode === 'solar2lunar') {
const l = solarToLunar(y, m, day);
return { kind: 'lunar', ...l, zodiacName: getZodiacByYear(l.year).name };
}
const s = lunarToSolar(y, m, day, isLeap);
return { kind: 'solar', ...s, zodiacName: getZodiacByYear(s.lunarYear).name };
} catch {
return { kind: 'error' };
}
}, [d, mode, isLeap]);
return (
<Card>
<CardTitle icon={Sun}>양력 / 음력 변환</CardTitle>
<Segmented
value={mode}
onChange={setMode}
options={[
{ key: 'solar2lunar', label: '양력 → 음력', icon: Sun },
{ key: 'lunar2solar', label: '음력 → 양력', icon: Moon },
]}
className="mb-5"
/>
<Label>날짜 선택</Label>
<div className="flex gap-2">
<div className="min-w-0 flex-1">
<DateInput value={dateStr} onChange={setDateStr} />
</div>
<button
type="button"
onClick={() => setDateStr(toInputValue(today()))}
className="shrink-0 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-600 transition-all duration-200 hover:bg-emerald-100 active:scale-95"
>
오늘
</button>
</div>
{mode === 'lunar2solar' && (
<label className="mt-4 flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-amber-300 hover:bg-amber-50/60">
<input
type="checkbox"
checked={isLeap}
onChange={(e) => setIsLeap(e.target.checked)}
className="h-4 w-4 accent-amber-500"
/>
<span className="text-sm font-semibold text-slate-700">윤달 (음력)</span>
<Badge tone="amber">윤달 변환</Badge>
</label>
)}
{!d && (
<div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4 text-center text-sm font-semibold text-slate-500">
날짜를 선택해주세요 📅
</div>
)}
{result?.kind === 'error' && (
<div className="animate-fade-up mt-5 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-600">
<AlertCircle size={17} className="mt-0.5 shrink-0" />
변환할 수 없는 날짜입니다. 윤달 여부를 다시 확인해 주세요.
</div>
)}
{result?.kind === 'lunar' && (
<div
key={`lunar-${dateStr}`}
className="animate-fade-up mt-5 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5"
>
<div className="flex items-center gap-1.5 text-xs font-bold text-amber-700">
<Moon size={14} />
음력 변환 결과
{result.isLeap && <Badge tone="amber">윤달</Badge>}
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="text-3xl font-black tracking-tight text-amber-900">
{result.year}년 {result.month}월 {result.day}일
</span>
<ArrowRight size={16} className="shrink-0 text-amber-400" />
</div>
<div className="mt-1.5 text-sm font-semibold text-amber-800">
{result.ganZhi}년 · {result.zodiacName}띠 · {result.dayCn}
</div>
</div>
)}
{result?.kind === 'solar' && (
<div
key={`solar-${dateStr}-${isLeap}`}
className="animate-fade-up mt-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5"
>
<div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
<Sun size={14} />
양력 변환 결과
</div>
<div className="mt-2 flex items-baseline gap-2">
<span className="text-3xl font-black tracking-tight text-emerald-900">
{result.year}년 {result.month}월 {result.day}일
</span>
<ArrowRight size={16} className="shrink-0 text-emerald-400" />
</div>
<div className="mt-1.5 text-sm font-semibold text-emerald-800">
{result.weekday} · {result.ganZhi}년 {result.zodiacName}띠
</div>
</div>
)}
<p className="mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-400">
<Info size={13} className="mt-0.5 shrink-0" />
음력은 29~30일로 구성되며, 윤달이 있는 해에만 윤달 변환이 가능합니다. (lunar-javascript 기반)
</p>
</Card>
);
}
