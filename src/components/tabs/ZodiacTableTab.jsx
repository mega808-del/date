import { useMemo, useState } from 'react';
import { Info, Search, Table } from 'lucide-react';
import { Badge, Card, CardTitle } from '../ui.jsx';
import { ZODIACS, buildZodiacRows, getZodiacByYear } from '../../lib/zodiac.js';
export default function ZodiacTableTab() {
const currentYear = new Date().getFullYear();
const [selectedKey, setSelectedKey] = useState(() => getZodiacByYear(currentYear).key);
const [query, setQuery] = useState('');
const zodiac = ZODIACS.find((z) => z.key === selectedKey);
const rows = useMemo(() => buildZodiacRows(zodiac, currentYear), [zodiac, currentYear]);
const q = query.trim();
const filtered = useMemo(() => {
if (!q) return rows;
return rows.filter(
(r) =>
String(r.birthYear).includes(q) ||
String(r.manAge) === q ||
String(r.yearAge) === q
);
}, [rows, q]);
const latest = rows[0];
return (
<Card>
<CardTitle icon={Table}>띠별 생년 · 나이 대조표</CardTitle>
{/* 12지신 색상 버튼 그리드 */}
<div className="grid grid-cols-4 gap-2">
{ZODIACS.map((z) => {
const active = z.key === selectedKey;
return (
<button
key={z.key}
type="button"
onClick={() => setSelectedKey(z.key)}
className={`flex flex-col items-center gap-0.5 rounded-xl border px-1 py-2.5 transition-all duration-200 active:scale-95 ${
active ? z.active : z.idle
}`}
>
<span className="text-2xl leading-none">{z.emoji}</span>
<span className="text-xs font-bold leading-none">{z.name}</span>
</button>
);
})}
</div>
{/* 빠른 검색 */}
<div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
<Search size={15} className="shrink-0 text-slate-400" />
<input
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder={`${currentYear}년 기준 년생·나이 검색 (예: 1996)`}
className="w-full bg-transparent py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
/>
</div>
{/* 선택 띠 요약 */}
<div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
<div className="flex items-center gap-2 text-sm font-bold text-emerald-800">
<span className="text-xl leading-none">{zodiac.emoji}</span>
{zodiac.name}띠 · {currentYear}년 기준
</div>
{latest && <Badge tone="emerald">최근 출생 {latest.birthYear}년 (만 {latest.manAge}세)</Badge>}
</div>
{/* 대조표 */}
{filtered.length > 0 ? (
<div className="mt-4 max-h-96 overflow-y-auto rounded-2xl border border-slate-200">
<table className="w-full text-sm">
<thead className="sticky top-0 z-10 bg-slate-50 text-xs text-slate-500">
<tr>
<th className="px-4 py-2.5 text-left font-bold">년생</th>
<th className="py-2.5 text-center font-bold">만 나이</th>
<th className="py-2.5 text-center font-bold">연 나이</th>
<th className="py-2.5 pr-4 text-right font-bold">띠</th>
</tr>
</thead>
<tbody className="divide-y divide-slate-100 bg-white">
{filtered.map((r) => (
<tr key={r.birthYear} className="transition-colors hover:bg-emerald-50/40">
<td className="px-4 py-2.5 font-extrabold text-slate-800">
{r.birthYear}
<span className="ml-0.5 text-[11px] font-medium text-slate-400">년</span>
</td>
<td className="py-2.5 text-center">
<span className="inline-flex min-w-[56px] items-center justify-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
{r.manAge}세
</span>
</td>
<td className="py-2.5 text-center text-slate-600">{r.yearAge}세</td>
<td className="py-2.5 pr-4 text-right">
<span className="text-xs font-semibold text-slate-600">
{zodiac.emoji} {zodiac.name}띠
</span>
</td>
</tr>
))}
</tbody>
</table>
</div>
) : (
<div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center text-sm text-slate-500">
검색 결과가 없습니다 🕵️
</div>
)}
<p className="mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-400">
<Info size={13} className="mt-0.5 shrink-0" />
{currentYear}년(올해)을 기준으로 만 0세 ~ 100세의 출생 연도를 계산합니다. 띠는 태어난 해(양력) 기준입니다.
</p>
</Card>
);
}
