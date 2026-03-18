# DrizzleDrop Frontend & Backend - Startup Guide

## ✅ Server Status

Both servers have been verified and are working correctly:

### Backend Server
- **Status**: ✅ Ready to run
- **Port**: 5000
- **Technology**: Express.js + MongoDB
- **Health Check**: `http://localhost:5000/api/health`
- **Database**: MongoDB Atlas (Connected ✓)

### Frontend Server
- **Status**: ✅ Ready to run
- **Port**: 8080
- **Technology**: Vite + React + TypeScript
- **Access**: `http://localhost:8080`

---

## 🚀 Quick Start

### Option 1: Using Windows Batch Script (Easiest)
```bash
# Double-click this file:
start-servers.bat
```

### Option 2: Using Bash Script
```bash
bash start-servers.sh
```

### Option 3: Manual Terminal Commands

**Terminal 1 - Backend:**
```bash
cd server
node server.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## 📋 Default Admin Credentials

```
Email: admin@drizzledrop.com
Password: Admin@123
```

These are automatically created on first server startup.

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with admin credentials
- `GET /api/auth/verify` - Verify token (protected)

### Advertisements
- `GET /api/ads/active` - Get active ads (public)
- `GET /api/ads` - Get all ads (protected)
- `POST /api/ads` - Create new ad (protected)
- `PUT /api/ads/:id` - Update ad (protected)
- `DELETE /api/ads/:id` - Delete ad (protected)
- `PATCH /api/ads/:id/toggle` - Toggle ad status (protected)

### Health Check
- `GET /api/health` - Check server status

---

## 📁 Project Structure

```
drizzle-background-new-branch-name/
├── src/                          # Frontend (React)
├── server/                        # Backend (Express)
│   ├── config/                   # Database config
│   ├── controllers/              # Route controllers
│   ├── middleware/               # Express middleware
│   ├── models/                   # MongoDB schemas
│   ├── routes/                   # API routes
│   ├── uploads/                  # Image uploads
│   ├── .env                      # Environment variables
│   ├── server.js                 # Main server file
│   └── package.json
├── start-servers.bat             # Windows startup script
└── start-servers.sh              # Bash startup script
```

---

## 🛠️ Environment Variables

Backend `.env` file includes:
- `PORT=5000` - Backend port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `ADMIN_EMAIL` - Default admin email
- `ADMIN_PASSWORD` - Default admin password

---

## ✨ Features Verified

✅ Database connection (MongoDB Atlas)
✅ Admin authentication system
✅ Image upload handling
✅ Ad management (CRUD operations)
✅ Route protection with JWT middleware
✅ CORS enabled
✅ Error handling

---

## 🆘 Troubleshooting

### Port Already in Use
If you see "EADDRINUSE: address already in use :::5000":
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Verify `.env` file has correct `MONGODB_URI`
- Check internet connection (MongoDB Atlas is cloud-based)
- Verify IP whitelist on MongoDB Atlas dashboard

### Missing Dependencies
```bash
cd server
npm install
```

---

## 📝 Notes

- Frontend is a Vite + React SPA with shadcn UI components
- Backend uses Express.js with Mongoose for MongoDB
- Images are stored locally in `server/uploads/`
- JWT tokens expire in 7 days
- Admin accounts are required for all protected routes

---

**Ready to start? Run one of the startup commands above!** 🚀
