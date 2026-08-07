import { Lunar, Solar } from 'lunar-javascript';

export function isValidYmd(y, m, d) {
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return false;
  if (m < 1 || m > 12 || d < 1) return false;
  return d <= new Date(y, m, 0).getDate();
}

/**
 * 양력 -> 음력
 * @returns {{ year, month, day, isLeap, ganZhi, dayCn }}
 */
export function solarToLunar(y, m, d) {
  if (!isValidYmd(y, m, d)) throw new Error('invalid solar date');
  const solar = Solar.fromYmd(y, m, d);
  const lunar = solar.getLunar();
  const lm = lunar.getMonth(); // 윤달이면 음수
  return {
    year: lunar.getYear(),
    month: Math.abs(lm),
    day: lunar.getDay(),
    isLeap: lm < 0,
    ganZhi: lunar.getYearInGanZhi(),
    dayCn: lunar.getDayInChinese(),
  };
}

/**
 * 음력 -> 양력
 * @returns {{ year, month, day, weekday, ganZhi, lunarYear }}
 */
export function lunarToSolar(y, m, d, isLeap = false) {
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) throw new Error('invalid');
  if (m < 1 || m > 12 || d < 1 || d > 30) throw new Error('invalid lunar date');
  const lunar = Lunar.fromYmd(y, m, d, !!isLeap);
  const solar = lunar.getSolar();
  // 왕복 검증: 요청한 윤달이 실제로 존재하는지 확인
  const back = solar.getLunar();
  if (!!isLeap !== (back.getMonth() < 0)) throw new Error('no such leap month');
  return {
    year: solar.getYear(),
    month: solar.getMonth(),
    day: solar.getDay(),
    weekday: solar.getWeekInChinese(),
    ganZhi: back.getYearInGanZhi(),
    lunarYear: back.getYear(),
  };
}
