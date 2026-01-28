@echo off
REM Portfolio Email Setup Script for Windows

echo ====================================
echo Portfolio Email System Setup
echo ====================================
echo.

REM Check if Node.js is installed
echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo ✓ Dependencies installed
echo.

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file...
    echo # Gmail Configuration > .env
    echo EMAIL_USER=ibnultahsinrihan@gmail.com >> .env
    echo EMAIL_PASSWORD=your_16_digit_app_password_here >> .env
    echo PORT=3000 >> .env
    echo NODE_ENV=development >> .env
    echo.
    echo ✓ .env file created
    echo.
    echo NEXT STEP: Edit .env and add your Gmail App Password
    echo See QUICK_FIX_SUMMARY.md or BACKEND_EMAIL_SETUP.md for instructions
    echo.
)

echo Setup complete!
echo.
echo To start the server, run:
echo   npm start
echo.
pause
