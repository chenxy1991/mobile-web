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

rem 当前bat的作用  
  
echo ==================begin========================  
cd %~dp0 
cls   
SET DISK_DIR=%~d0 
SET APP_DIR=%~dp0
color 0a   
TITLE NODE 管理程序 Power By skyice (http://www.tisson.cn)  
  
CLS   
  
ECHO.   
ECHO. * * NODE 管理程序 Power By skyice (http://www.tisson.cn)    *    
ECHO.   
  
:MENU   
  
ECHO. * node 进程list *    
tasklist|findstr /i "node.exe"  
  
if ERRORLEVEL 1 (echo node.exe不存在) else (echo node.exe存在)  


  
ECHO.   
    ECHO.  [1] 启动Node    
    ECHO.  [2] 关闭Node    
    ECHO.  [3] 重启Node
    ECHO.  [0] 退 出   
ECHO.   
  
ECHO.请输入选择项目的序号:  
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
    ECHO.关闭Node......   
    taskkill /F /IM node.exe > nul  
    ECHO.OK,关闭所有Node 进程  
    goto :eof  
  
:startNode  
    ECHO.   
    ECHO.启动Node.....  
    
    %DISK_DIR%   
  
    cd "%APP_DIR%"/..
  
    echo "start '' npm run dev"  
    start "" npm run dev  
    
    ECHO.OK  
    goto :eof

pause