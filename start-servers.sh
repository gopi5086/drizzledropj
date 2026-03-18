#!/bin/bash

echo "🚀 Starting DrizzleDrop Frontend & Backend..."
echo ""

# Kill any existing processes on ports 5000 and 8080
echo "Clearing ports 5000 and 8080..."
netstat -ano | grep -E ":5000|:8080" | awk '{print $NF}' | sort -u | xargs -r taskkill -PID -F 2>/dev/null || true
sleep 2

# Start backend
echo "📦 Starting Backend Server on port 5000..."
cd "c:/Users/JAYASRI/Downloads/drizzle-background-new-branch-name/drizzle-background-new-branch-name/server"
node server.js &
BACKEND_PID=$!

sleep 3

# Start frontend
echo "🎨 Starting Frontend Server on port 8080..."
cd "c:/Users/JAYASRI/Downloads/drizzle-background-new-branch-name/drizzle-background-new-branch-name"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are running!"
echo ""
echo "Frontend: http://localhost:8080"
echo "Backend: http://localhost:5000"
echo ""
echo "Processes:"
echo "  Backend PID:  $BACKEND_PID"
echo "  Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both servers"

wait
