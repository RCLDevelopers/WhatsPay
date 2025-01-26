@echo off
echo Setting up MongoDB...

REM Create directories for MongoDB
mkdir "data\db" 2>nul
mkdir "data\logs" 2>nul

REM Check if MongoDB is installed
mongod --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo MongoDB is not installed. Installing MongoDB...
    REM You can modify this to use winget or chocolatey
    echo Please install MongoDB from https://www.mongodb.com/try/download/community
    echo After installing, run this script again
    pause
    exit /b 1
)

REM Start MongoDB service
echo Starting MongoDB...
start "MongoDB" mongod --config "backend/config/mongod.conf"

REM Wait for MongoDB to start
timeout /t 5 /nobreak

echo MongoDB setup complete! 