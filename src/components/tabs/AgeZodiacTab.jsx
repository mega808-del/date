import { useMemo, useState } from 'react';
import { Baby, Cake, Calendar, Heart, Info, Sparkles } from 'lucide-react';
import { Badge, Card, CardTitle, DateInput, Label, StatCard } from '../ui.jsx';
import { daysBetween, parseDate, toInputValue, today } from '../../lib/format.js';
import { getGanZhi, getKoreanAge, getManAge, getYearAge, getZodiacByYear } from '../../lib/zodiac.js';
export default function AgeZodiacTab() {
const [birthStr, setBirthStr] = useState('');
const now = useMemo(() => today(), []);
const birth = useMemo(() => parseDate(birthStr), [birthStr]);
const info = useMemo(() => {
if (!birth || birth > now) return null;
return {
manAge: getManAge(birth, now),
yearAge: getYearAge(birth, now),
koreanAge: getKoreanAge(birth, now),
zodiac: getZodiacByYear(birth.getFullYear()),
ganZhi: getGanZhi(birth.getFullYear()),
daysAlive: daysBetween(birth, now),
};
}, [birth, now]);
return (
<Card>
<CardTitle icon={Cake}>만 나이 & 띠 정보</CardTitle>
<Label>생년월일</Label>
<DateInput value={birthStr} onChange={setBirthStr} max={toInputValue(now)} />
{!info ? (
<div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center">
<div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
<Baby size={26} />
</div>
<p className="text-sm font-semibold text-slate-600">생년월일을 선택하면</p>
<p className="mt-1 text-sm text-slate-500">나이와 띠를 계산해 드려요 🎂</p>
</div>
) : (
<div key={birthStr} className="animate-fade-up mt-5 space-y-4">
<div className="grid grid-cols-3 gap-3">
<StatCard icon={Sparkles} tone="emerald" label="만 나이" value={`${info.manAge}세`} />
<StatCard icon={Calendar} tone="sky" label="연 나이" value={`${info.yearAge}세`} />
<StatCard icon={Heart} tone="rose" label="세는 나이" value={`${info.koreanAge}세`} />
</div>
<div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
<div
className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border text-4xl ${info.zodiac.idle}`}
>
{info.zodiac.emoji}
</div>
<div className="min-w-0">
<div className="flex flex-wrap items-center gap-2">
<span className="text-lg font-extrabold text-slate-800">{info.zodiac.name}띠</span>
<Badge tone="amber">{info.ganZhi}년</Badge>
</div>
<div className="mt-1 text-sm text-slate-500">
{birth.getFullYear()}년생 · 태어난 지{' '}
<b className="text-slate-700">{info.daysAlive.toLocaleString('ko-KR')}일</b>
</div>
</div>
</div>
<p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-400">
<Info size={13} className="mt-0.5 shrink-0" />
입춘·설날 경계가 아닌 <b>태어난 해(양력)</b>를 기준으로 띠와 나이를 계산합니다.
</p>
</div>
)}
</Card>
);
}
