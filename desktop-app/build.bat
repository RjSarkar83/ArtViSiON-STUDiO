@echo off
title ArtViSiON STUDiO - EXE Builder
echo ============================================
echo   ArtViSiON STUDiO v9.9 - Windows .exe Builder
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js nahi mila!
  echo.
  echo Pehle Node.js LTS install karo: https://nodejs.org
  echo Install ke baad is file ko dobara double-click karo.
  echo.
  pause
  exit /b 1
)

echo [1/3] Node mil gaya. Dependencies install ho rahi hai...
echo       (pehli baar me 2-5 minute, internet chahiye)
call npm install
if errorlevel 1 goto fail

echo.
echo [2/3] Windows .exe build ho raha hai (5-10 minute)...
call npm run dist
if errorlevel 1 goto fail

echo.
echo [3/3] DONE! dist folder me ready:
echo    - ArtViSiON STUDiO Setup 9.9.0.exe  (installer)
echo    - ArtViSiON STUDiO 9.9.0.exe        (portable)
echo.
if exist dist explorer dist
pause
exit /b 0

:fail
echo.
echo [ERROR] Build fail hua. Upar ka error message padho.
echo Zyada tar cases: internet nahi, ya npm cache issue.
pause
exit /b 1
