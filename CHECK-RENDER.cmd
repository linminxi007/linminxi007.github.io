@echo off
cd /d "%~dp0"
call quarto render
if errorlevel 1 (
  echo BUILD FAILED. Please copy the complete error message.
) else (
  echo BUILD OK. Output is in _site.
)
pause
