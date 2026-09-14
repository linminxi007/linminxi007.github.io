@echo off
cd /d "%~dp0"
where quarto >nul 2>nul
if errorlevel 1 (
  echo Quarto was not found. Install Quarto, then reopen this window.
  pause
  exit /b 1
)
echo Previewing the folder that contains _quarto.yml ...
call quarto preview
if errorlevel 1 pause
