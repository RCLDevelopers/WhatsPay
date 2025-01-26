@echo off
echo Checking MongoDB setup...

REM Run MongoDB setup if needed
call setup-mongodb.bat
if %ERRORLEVEL% NEQ 0 (
    echo MongoDB setup failed. Please check the error messages above.
    exit /b 1
)

REM Check MongoDB connection
echo Checking MongoDB connection...
mongosh --eval "db.adminCommand('ping')" >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Cannot connect to MongoDB. Starting MongoDB...
    start "MongoDB" mongod --config "backend/config/mongod.conf"
    timeout /t 5 /nobreak
)

if not exist node_modules (
    echo Installing dependencies...
    call npm run install:all
)

echo Starting development servers...
npm run dev 