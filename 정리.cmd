@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 올인원 날짜 ^& 띠 계산기 - 구버전 정리

echo.
echo  ==========================================================
echo   이 스크립트는 구버전(Vite/React/Node) 관련 파일을 삭제합니다.
echo   삭제 대상: src 폴더, package.json, vite.config.js,
echo              tailwind.config.js, postcss.config.js,
echo              .github, dist, node_modules, 실행.cmd 등
echo   남는 파일: index.html, 정리.cmd, README.md
echo  ==========================================================
echo.
choice /c YN /m "삭제를 진행하시겠습니까 (Y=삭제, N=취소)"
if errorlevel 2 goto :end
if errorlevel 1 goto :do

:do
echo.
echo  삭제 중입니다...
if exist "src" rmdir /s /q "src"
if exist "node_modules" rmdir /s /q "node_modules"
if exist "dist" rmdir /s /q "dist"
if exist ".github" rmdir /s /q ".github"
if exist "package.json" del /q "package.json"
if exist "package-lock.json" del /q "package-lock.json"
if exist "vite.config.js" del /q "vite.config.js"
if exist "tailwind.config.js" del /q "tailwind.config.js"
if exist "postcss.config.js" del /q "postcss.config.js"
if exist ".gitignore" del /q ".gitignore"
if exist "실행.cmd" del /q "실행.cmd"
echo.
echo  완료! 이제 index.html 을 더블클릭하면 바로 실행됩니다.
goto :end

:end
echo.
pause
exit /b 0
