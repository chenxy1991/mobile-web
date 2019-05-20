@echo off
SET DISK_DIR= %~d0
SET APP_DIR=%~dp0

%DISK_DIR%
cd  %APP_DIR%\..
cnpm run build
pause



