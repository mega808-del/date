import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// base: './'  — 빌드 산출물을 상대 경로로 생성
//   (1) dist/index.html 을 더블클릭해 file:// 로 바로 실행 가능
//   (2) GitHub Pages 하위 경로(https://mega808-del.github.io/date/)에서도 정상 동작
// viteSingleFile — JS/CSS 를 index.html 한 파일에 인라인 → 단일 파일로 어디서든 실행 가능
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
});
