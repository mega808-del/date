export const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

/**
 * 띠별 고유 색상 (Tailwind 클래스는 리터럴로 고정해야 하므로 문자열로 정의)
 */
const STYLE = {
  rose: {
    idle: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100',
    active: 'bg-rose-500 border-rose-600 text-white shadow-lg shadow-rose-500/30',
  },
  amber: {
    idle: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100',
    active: 'bg-amber-500 border-amber-600 text-white shadow-lg shadow-amber-500/30',
  },
  orange: {
    idle: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100',
    active: 'bg-orange-500 border-orange-600 text-white shadow-lg shadow-orange-500/30',
  },
  pink: {
    idle: 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100',
    active: 'bg-pink-500 border-pink-600 text-white shadow-lg shadow-pink-500/30',
  },
  emerald: {
    idle: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100',
    active: 'bg-emerald-500 border-emerald-600 text-white shadow-lg shadow-emerald-500/30',
  },
  lime: {
    idle: 'bg-lime-50 border-lime-200 text-lime-700 hover:bg-lime-100',
    active: 'bg-lime-600 border-lime-700 text-white shadow-lg shadow-lime-500/30',
  },
  cyan: {
    idle: 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:bg-cyan-100',
    active: 'bg-cyan-500 border-cyan-600 text-white shadow-lg shadow-cyan-500/30',
  },
  violet: {
    idle: 'bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100',
    active: 'bg-violet-500 border-violet-600 text-white shadow-lg shadow-violet-500/30',
  },
  yellow: {
    idle: 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100',
    active: 'bg-yellow-500 border-yellow-600 text-white shadow-lg shadow-yellow-500/30',
  },
  red: {
    idle: 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100',
    active: 'bg-red-500 border-red-600 text-white shadow-lg shadow-red-500/30',
  },
  blue: {
    idle: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100',
    active: 'bg-blue-500 border-blue-600 text-white shadow-lg shadow-blue-500/30',
  },
  fuchsia: {
    idle: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-100',
    active: 'bg-fuchsia-500 border-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30',
  },
};

/**
 * 12지신 (배열 순서: 0=쥐 ... 11=돼지, 연도는 (year - 4) % 12 로 매핑)
 */
export const ZODIACS = [
  { key: 'rat', name: '쥐', emoji: '🐭', ...STYLE.rose },
  { key: 'ox', name: '소', emoji: '🐮', ...STYLE.amber },
  { key: 'tiger', name: '호랑이', emoji: '🐯', ...STYLE.orange },
  { key: 'rabbit', name: '토끼', emoji: '🐰', ...STYLE.pink },
  { key: 'dragon', name: '용', emoji: '🐲', ...STYLE.emerald },
  { key: 'snake', name: '뱀', emoji: '🐍', ...STYLE.lime },
  { key: 'horse', name: '말', emoji: '🐴', ...STYLE.cyan },
  { key: 'goat', name: '양', emoji: '🐑', ...STYLE.violet },
  { key: 'monkey', name: '원숭이', emoji: '🐵', ...STYLE.yellow },
  { key: 'rooster', name: '닭', emoji: '🐔', ...STYLE.red },
  { key: 'dog', name: '개', emoji: '🐶', ...STYLE.blue },
  { key: 'pig', name: '돼지', emoji: '🐷', ...STYLE.fuchsia },
];

/** 연도 -> 띠 (양력 연도 기준, 2020=쥐, 2026=말) */
export function getZodiacByYear(year) {
  return ZODIACS[(((year - 4) % 12) + 12) % 12];
}

/** 연도 -> 간지 (예: 2026 -> 丙午) */
export function getGanZhi(year) {
  return STEMS[(year - 4) % 10] + BRANCHES[(year - 4) % 12];
}

/** 만 나이 */
export function getManAge(birth, now) {
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

/** 연 나이 */
export function getYearAge(birth, now) {
  return now.getFullYear() - birth.getFullYear();
}

/** 세는 나이 */
export function getKoreanAge(birth, now) {
  return getYearAge(birth, now) + 1;
}

/**
 * 선택한 띠에 해당하는 출생 연도 목록 (만 0세 ~ maxAge세, 최신순)
 */
export function buildZodiacRows(zodiac, currentYear, maxAge = 100) {
  const rows = [];
  for (let manAge = 0; manAge <= maxAge; manAge += 1) {
    const birthYear = currentYear - manAge;
    if (getZodiacByYear(birthYear).key === zodiac.key) {
      rows.push({
        birthYear,
        manAge,
        yearAge: currentYear - birthYear,
        zodiac,
      });
    }
  }
  return rows;
}
