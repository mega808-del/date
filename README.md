# 📅 올인원 날짜 & 띠 계산기 (단일 HTML 파일 버전)

**파일 하나(`index.html`)로 완성된** 날짜 계산 프로그램입니다.
Vite/React/Node.js 없이, **더블클릭만으로 바로 실행**됩니다.

- 양·음력 변환 · D-Day · 만 나이 · 띠 대조표 · 전역일 — 5가지 기능
- 디자인/기능은 기존 React 버전과 동일

## 🚀 실행 방법

### 1️⃣ 로컬 더블클릭 (설치 불필요)
`index.html` 파일을 **더블클릭** → 브라우저에서 즉시 실행됩니다.
(인터넷 연결 필요: Tailwind·Lucide·음력 라이브러리를 CDN에서 불러옵니다)

### 2️⃣ GitHub Pages 배포
1. `index.html` **파일 하나**를 GitHub `date` 저장소에 업로드 (main 브랜치)
2. 저장소 **Settings → Pages** → Source: `Deploy from a branch` → `main / (root)` → Save
3. 몇 초 후 **https://mega808-del.github.io/date/** 에서 바로 확인
   - 안 보이면 **Ctrl+F5** (브라우저 캐시)

> 이전에 올렸던 소스(빈 화면) 대신 **빌드할 필요 없는 완전한 `index.html`** 이므로
> 어떤 설정도 필요 없습니다. 저장소의 기존 파일은 새 `index.html`로 교체하면 됩니다.

## 🧹 구버전(Vite/React) 파일 정리

`정리.cmd` 를 더블클릭하면 아래 항목이 자동 삭제됩니다.
(수동으로 삭제할 경우: `src/`, `package.json`, `vite.config.js`, `tailwind.config.js`,
`postcss.config.js`, `.github/`, `dist/`, `node_modules/`, `실행.cmd`, `.gitignore`)

## 📦 사용 라이브러리 (모두 CDN)

| 라이브러리 | 용도 |
| --- | --- |
| Tailwind CSS (Play CDN) | 스타일링 |
| Lucide Icons | 아이콘 |
| lunar-javascript | 양·음력 변환 |

## ✨ 기능

| 탭 | 설명 |
| --- | --- |
| **양/음력 변환** | 양력↔음력 상호 변환, 윤달 체크박스, 간지·띠 표시 |
| **날짜 계산** | 기준일 + N일 → 목표일 / 목표일 → D-Day 배지 (D-XX / D+XX), +100·+1000일 프리셋 |
| **만 나이/띠** | 생년월일 → 만 나이·연 나이·세는 나이, 띠(이모지)·간지·살아온 일수 |
| **띠 대조표** | 12지신 컬러 버튼 → 해당 띠의 만 0~100세 출생 연도 대조표 + 빠른 검색 |
| **전역일** | 입대일 + 군별(육군 18·해군 20·공군 21·해병대 18·공익 21개월) → 전역일·복무 진행률·잔여 일수 |

## 📁 구조

```
index.html   ← 전체 프로그램 (HTML + CSS + JS 통합)
README.md
정리.cmd     ← (선택) 구버전 파일 삭제용
```
