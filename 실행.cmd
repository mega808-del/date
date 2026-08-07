@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 올인원 날짜 ^& 띠 계산기 - 실행기

rem ============================================
rem  올인원 날짜 & 띠 계산기 더블클릭 실행기
rem  (설치 -> 빌드 -> 브라우저 실행 자동 진행)
rem ============================================

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  [오류] Node.js가 설치되어 있지 않습니다.
  echo  https://nodejs.org 에서 LTS 버전을 설치한 후 다시 실행해 주세요.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo  [1/3] 의존성 패키지를 설치하는 중입니다...
  call npm install
  if errorlevel 1 (
    echo  [오류] 패키지 설치에 실패했습니다. 인터넷 연결을 확인해 주세요.
    pause
    exit /b 1
  )
)

echo  [2/3] 앱을 빌드하는 중입니다...
call npm run build
if errorlevel 1 (
  echo  [오류] 빌드에 실패했습니다.
  pause
  exit /b 1
)

echo  [3/3] 브라우저에서 실행합니다...
start "" "dist\index.html"
exit /b 0
