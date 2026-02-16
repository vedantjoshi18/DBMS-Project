# Quick Test Credentials

## 🔐 Login Credentials

### Regular Users:
```
Email: john@example.com
Password: password123
```

```
Email: jane@example.com
Password: password123
```

```
Email: alice@example.com
Password: password123
```

### Admin User:
```
Email: admin@example.com
Password: admin123
```

## 🚀 Quick Start

1. **Seed the database:**
   ```bash
   cd backend
   npm run seed
   ```

2. **Start backend:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start frontend:**
   ```bash
   npm start
   ```

4. **Test login:**
   - Go to `http://localhost:4200`
   - Click "Login"
   - Use: `john@example.com` / `password123`

## 📊 Sample Data

- **4 Users** (3 regular + 1 admin)
- **6 Events** (various categories)
- **3 Bookings** (for testing)

## 🔗 API Base URL

- Backend: `http://localhost:5000/api`
- Frontend: `http://localhost:4200`

## 📝 Notes

- All passwords are: `password123` (except admin: `admin123`)
- Seed script clears existing data by default
- Set `CLEAR_DATA=false` in `.env` to keep existing data
