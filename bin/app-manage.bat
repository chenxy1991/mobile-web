@echo off
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
goto UACPrompt
) else ( goto gotAdmin )
:UACPrompt
echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
"%temp%\getadmin.vbs"
exit /B
:gotAdmin
if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )

rem ��ǰbat������  
  
echo ==================begin========================  
cd %~dp0 
cls   
SET DISK_DIR=%~d0 
SET APP_DIR=%~dp0
color 0a   
TITLE NODE ������� Power By skyice (http://www.tisson.cn)  
  
CLS   
  
ECHO.   
ECHO. * * NODE ������� Power By skyice (http://www.tisson.cn)    *    
ECHO.   
  
:MENU   
  
ECHO. * node ����list *    
tasklist|findstr /i "node.exe"  
  
if ERRORLEVEL 1 (echo node.exe������) else (echo node.exe����)  


  
ECHO.   
    ECHO.  [1] ����Node    
    ECHO.  [2] �ر�Node    
    ECHO.  [3] ����Node
    ECHO.  [0] �� ��   
ECHO.   
  
ECHO.������ѡ����Ŀ�����:  
set /p ID=  
    IF "%id%"=="1" GOTO start   
    IF "%id%"=="2" GOTO stop   
    IF "%id%"=="3" GOTO restart
    IF "%id%"=="4" GOTO install
    IF "%id%"=="0" EXIT  
PAUSE   
  
:start   
    call :startNode  
    GOTO MENU  
  
:stop   
    call :shutdownNode  
    GOTO MENU  
  
:restart   
    call :shutdownNode  
    call :startNode 
    GOTO MENU

:install
   call :installDependencies
  
:shutdownNode 
    ECHO.   
    ECHO.�ر�Node......   
    taskkill /F /IM node.exe > nul  
    ECHO.OK,�ر�����Node ����  
    goto :eof  
  
:startNode  
    ECHO.   
    ECHO.����Node.....  
    
    %DISK_DIR%   
  
    cd "%APP_DIR%"/..
  
    echo "start '' npm run dev"  
    start "" npm run dev  
    
    ECHO.OK  
    goto :eof

pause