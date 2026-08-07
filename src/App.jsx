import { useState } from 'react';
import { CalendarHeart, Sparkles } from 'lucide-react';
import TabBar from './components/TabBar.jsx';
import SolarLunarTab from './components/tabs/SolarLunarTab.jsx';
import DDayTab from './components/tabs/DDayTab.jsx';
import AgeZodiacTab from './components/tabs/AgeZodiacTab.jsx';
import ZodiacTableTab from './components/tabs/ZodiacTableTab.jsx';
import MilitaryTab from './components/tabs/MilitaryTab.jsx';
import { fmtLong, today } from './lib/format.js';
import { getGanZhi, getZodiacByYear } from './lib/zodiac.js';

export default function App() {
  const [tab, setTab] = useState('solar');

  const now = today();
  const yearZodiac = getZodiacByYear(now.getFullYear());

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-emerald-50/50">
      <div className="mx-auto max-w-[640px] px-4 pb-20">
        <header className="pt-8 pb-5 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/40">
            <CalendarHeart size={28} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800">올인원 날짜 & 띠 계산기</h1>
          <p className="mt-1.5 text-sm font-medium text-slate-500">
            양·음력 변환 · D-Day · 만 나이 · 띠 대조표 · 전역일
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
            <Sparkles size={13} />
            오늘 {fmtLong(now)} · {yearZodiac.emoji} {yearZodiac.name}띠해 ({getGanZhi(now.getFullYear())}년)
          </div>
        </header>

        <TabBar value={tab} onChange={setTab} />

        <main key={tab} className="animate-fade-up mt-5">
          {tab === 'solar' && <SolarLunarTab />}
          {tab === 'dday' && <DDayTab />}
          {tab === 'age' && <AgeZodiacTab />}
          {tab === 'zodiac' && <ZodiacTableTab />}
          {tab === 'military' && <MilitaryTab />}
        </main>

        <footer className="mt-10 text-center text-[11px] leading-relaxed text-slate-400">
          <p>lunar-javascript 기반 음력 변환 · 모든 계산은 브라우저에서 처리됩니다</p>
          <p className="mt-0.5">Made with 💚 for a smarter day</p>
        </footer>
      </div>
    </div>
  );
}
