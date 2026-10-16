@echo off
title ArtViSiON STUDiO - Run
where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js nahi mila! https://nodejs.org se LTS install karo.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Pehli baar: dependencies install ho rahi hai (2-5 min)...
  call npm install
)
call npm start
