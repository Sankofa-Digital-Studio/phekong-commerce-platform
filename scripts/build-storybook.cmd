@echo off
set "ROOT=%~dp0.."
for %%I in ("%ROOT%") do set "ROOT=%%~fI"
cmd /c powershell -NoProfile -Command "$env:CACHE_DIR='%ROOT%\tmp\storybook-cache'; cmd /c npx.cmd storybook build"
