import { useMemo, useState } from 'react';
import {
Anchor,
Calendar,
Clock,
Flag,
HeartHandshake,
PartyPopper,
Plane,
Shield,
Ship,
Timer,
} from 'lucide-react';
import { Badge, Card, CardTitle, DateInput, Label, StatCard } from '../ui.jsx';
import {
addMonthsSafe,
daysBetween,
fmtDot,
fmtLong,
parseDate,
toInputValue,
today,
weekdayOf,
} from '../../lib/format.js';
const BRANCHES = [
{
key: 'army',
name: '육군',
months: 18,
desc: '18개월',
icon: Shield,
idle: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100',
active: 'bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-500/30',
},
{
key: 'navy',
name: '해군',
months: 20,
desc: '20개월',
icon: Anchor,
idle: 'bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100',
active: 'bg-sky-500 border-sky-600 text-white shadow-md shadow-sky-500/30',
},
{
key: 'air',
name: '공군',
months: 21,
desc: '21개월',
icon: Plane,
idle: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100',
active: 'bg-indigo-500 border-indigo-600 text-white shadow-md shadow-indigo-500/30',
},
{
key: 'marine',
name: '해병대',
months: 18,
desc: '18개월',
icon: Ship,
idle: 'bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100',
active: 'bg-teal-500 border-teal-600 text-white shadow-md shadow-teal-500/30',
},
{
key: 'public',
name: '공익근무',
months: 21,
desc: '21개월',
icon: HeartHandshake,
idle: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100',
active: 'bg-amber-500 border-amber-600 text-white shadow-md shadow-amber-500/30',
},
];
export default function MilitaryTab() {
const [enlistStr, setEnlistStr] = useState(toInputValue(today()));
const [branchKey, setBranchKey] = useState('army');
const now = useMemo(() => today(), []);
const enlist = useMemo(() => parseDate(enlistStr), [enlistStr]);
const branch = BRANCHES.find((b) => b.key === branchKey);
const calc = useMemo(() => {
if (!enlist) return null;
const discharge = addMonthsSafe(enlist, branch.months);
const total = Math.max(1, daysBetween(enlist, discharge));
const served = Math.max(0, daysBetween(enlist, now));
const remaining = daysBetween(now, discharge);
const pct = Math.min(100, Math.max(0, Math.round((served / total) * 100)));
const status = now < enlist ? 'before' : now >= discharge ? 'done' : 'serving';
return { discharge, total, served, remaining, pct, status };
}, [enlist, branch, now]);
return (
<Card>
<CardTitle icon={Flag}>전역일 계산기</CardTitle>
<Label>입대일</Label>
<DateInput value={enlistStr} onChange={setEnlistStr} />
<Label>군별 선택</Label>
<div className="grid grid-cols-3 gap-2">
{BRANCHES.map((b) => {
const active = b.key === branchKey;
return (
<button
key={b.key}
type="button"
onClick={() => setBranchKey(b.key)}
className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 transition-all duration-200 active:scale-95 ${
active ? b.active : b.idle
}`}
>
<b.icon size={20} strokeWidth={2.5} />
<span className="text-sm font-extrabold leading-none">{b.name}</span>
<span className="text-[10px] font-semibold opacity-80">{b.desc}</span>
</button>
);
})}
</div>
{calc && (
<div key={`${enlistStr}-${branchKey}`} className="animate-fade-up mt-5 space-y-4">
{calc.status === 'done' ? (
<div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
<PartyPopper size={24} />
</div>
<div>
<div className="text-lg font-extrabold text-emerald-700">전역 완료! 🎉</div>
<div className="text-sm text-emerald-600">{fmtLong(calc.discharge)}에 전역하셨어요.</div>
</div>
</div>
) : (
<div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
<div className="flex items-center justify-between">
<span className="text-xs font-bold text-slate-500">전역 예정일</span>
{calc.status === 'before' ? (
<Badge tone="sky">입대 전</Badge>
) : (
<Badge tone="emerald">복무 중</Badge>
)}
</div>
<div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
<span className="text-3xl font-black tracking-tight text-slate-800">
{fmtDot(calc.discharge)}
</span>
<span className="text-sm font-semibold text-slate-500">({weekdayOf(calc.discharge)})</span>
{calc.status === 'serving' && <Badge tone="emerald">D-{calc.remaining}</Badge>}
</div>
<div className="mt-4">
<div className="mb-1.5 flex items-center justify-between text-xs font-bold">
<span className="text-slate-500">복무 진행률</span>
<span className="text-emerald-600">{calc.pct}%</span>
</div>
<div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
<div
className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 transition-all duration-700"
style={{ width: `${calc.pct}%` }}
/>
</div>
{calc.status === 'before' && (
<p className="mt-1.5 text-[11px] text-slate-400">
아직 입대 전이에요. 입대일부터 진행률이 계산됩니다.
</p>
)}
</div>
</div>
)}
<div className="grid grid-cols-3 gap-3">
<StatCard
icon={Calendar}
tone="sky"
label="총 복무일"
value={calc.total.toLocaleString('ko-KR')}
sub="일"
/>
<StatCard
icon={Timer}
tone="emerald"
label="경과일"
value={calc.served.toLocaleString('ko-KR')}
sub="일"
/>
<StatCard
icon={Clock}
tone={calc.remaining < 0 ? 'rose' : 'amber'}
label={calc.remaining < 0 ? '전역 후 일수' : '남은 일수'}
value={Math.abs(calc.remaining).toLocaleString('ko-KR')}
sub="일"
/>
</div>
</div>
)}
</Card>
);
}
