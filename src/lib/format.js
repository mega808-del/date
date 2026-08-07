export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 'yyyy-mm-dd' 문자열을 로컬 타임존 Date로 변환한다.
 * 유효하지 않으면 null.
 */
export function parseDate(str) {
  if (!str) return null;
  const parts = str.split('-');
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d || m < 1 || m > 12 || d < 1) return null;
  const date = new Date(y, m - 1, d);
  // 일자 오버플로우(예: 2월 31일) 방지 검증
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

/** Date -> 'yyyy-mm-dd' (input[type=date]용) */
export function toInputValue(date) {
  const p = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`;
}

/** 오늘 0시 기준 Date */
export function today() {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

export function addDays(date, n) {
  const r = new Date(date);
  r.setDate(r.getDate() + n);
  return r;
}

/** 월 더하기 (말일 오버플로우를 안전하게 클램프) */
export function addMonthsSafe(date, months) {
  const r = new Date(date.getFullYear(), date.getMonth(), 1);
  r.setMonth(r.getMonth() + months);
  const last = new Date(r.getFullYear(), r.getMonth() + 1, 0).getDate();
  r.setDate(Math.min(date.getDate(), last));
  return r;
}

/** b - a (일 단위) */
export function daysBetween(a, b) {
  return Math.round((b - a) / 86400000);
}

export function weekdayOf(date) {
  return WEEKDAYS[date.getDay()];
}

/** 2026년 8월 7일 금요일 */
export function fmtLong(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${weekdayOf(date)}요일`;
}

/** 2026.08.07 */
export function fmtDot(date) {
  const p = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${p(date.getMonth() + 1)}.${p(date.getDate())}`;
}
