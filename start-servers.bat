@echo off
REM Start DrizzleDrop Frontend & Backend

echo.
echo 🚀 Starting DrizzleDrop Frontend ^& Backend...
echo.

REM Kill any existing processes on ports 5000 and 8080
echo Clearing ports 5000 and 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5000 :8080"') do (
    taskkill /PID %%a /F 2>nul
)
timeout /t 2 /nobreak >nul

REM Start backend
echo.
echo 📦 Starting Backend Server on port 5000...
cd server
start "DrizzleDrop-Backend" node server.js
cd ..
timeout /t 3 /nobreak >nul

REM Start frontend
echo.
echo 🎨 Starting Frontend Server on port 8080...
start "DrizzleDrop-Frontend" npm run dev

echo.
echo ✅ Both servers are starting!
echo.
echo Frontend: http://localhost:8080
echo Backend:  http://localhost:5000
echo.
pause

