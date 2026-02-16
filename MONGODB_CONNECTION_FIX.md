# MongoDB Atlas Connection Fix

## Problem
Your MongoDB Atlas cluster is rejecting connections because your current IP address is not whitelisted.

## Solution 1: Whitelist Your IP in MongoDB Atlas (Recommended)

### Steps:

1. **Go to MongoDB Atlas Dashboard**
   - Visit: https://cloud.mongodb.com/
   - Log in to your account

2. **Navigate to Network Access**
   - Click on your project
   - Click on **"Network Access"** in the left sidebar
   - Or go directly to: https://cloud.mongodb.com/v2#/security/network/whitelist

3. **Add Your IP Address**
   - Click **"Add IP Address"** button
   - You have two options:
     - **Option A:** Click **"Add Current IP Address"** (easiest)
     - **Option B:** Manually enter your IP address
   - Click **"Confirm"**

4. **Wait for Changes**
   - It may take 1-2 minutes for changes to propagate
   - Your backend should automatically reconnect

5. **For Development (Allow All IPs - Less Secure)**
   - If you're frequently changing networks, you can temporarily add:
     - IP Address: `0.0.0.0/0` (allows all IPs)
     - **⚠️ Warning:** Only use this for development, NOT production!

### Find Your Current IP Address:

**Windows:**
```powershell
# Open PowerShell and run:
(Invoke-WebRequest -Uri "https://api.ipify.org").Content
```

**Or visit:** https://www.whatismyip.com/

## Solution 2: Use Local MongoDB (Alternative)

If you prefer to use a local MongoDB instance for development:

### Install MongoDB Locally:

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Download and install for Windows

2. **Update .env file:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/eventDB
   ```

3. **Start MongoDB:**
   ```bash
   # MongoDB should start automatically as a service on Windows
   # Or start manually:
   mongod
   ```

## Solution 3: Check Your Connection String

Verify your MongoDB connection string in `backend/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**Common Issues:**
- ✅ Username and password are correct
- ✅ Database name is correct
- ✅ Special characters in password are URL-encoded (e.g., `@` becomes `%40`)
- ✅ Connection string includes `?retryWrites=true&w=majority`

## Quick Fix Checklist:

- [ ] IP address is whitelisted in MongoDB Atlas
- [ ] Connection string in `.env` is correct
- [ ] Password special characters are URL-encoded
- [ ] MongoDB Atlas cluster is running (not paused)
- [ ] Network firewall isn't blocking MongoDB ports (27017 or Atlas uses 27017+)

## Test Connection:

After whitelisting your IP, restart your backend server:

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: <cluster-name>
```

## Still Having Issues?

1. **Check MongoDB Atlas Status:**
   - Go to: https://status.mongodb.com/
   - Verify Atlas is operational

2. **Check Firewall/VPN:**
   - Corporate firewalls may block MongoDB connections
   - Try disconnecting VPN if connected
   - Check if your ISP blocks MongoDB ports

3. **Verify Database User:**
   - Go to MongoDB Atlas → Database Access
   - Ensure your database user exists and has proper permissions
   - Password should match what's in your connection string

4. **Check Connection String Format:**
   ```env
   # Correct format:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   
   # If password contains special characters, URL-encode them:
   # @ becomes %40
   # # becomes %23
   # / becomes %2F
   ```

## Security Best Practices:

1. **For Development:**
   - Whitelist only your development IPs
   - Use strong database passwords
   - Don't commit `.env` files to git

2. **For Production:**
   - Whitelist only specific IP addresses/ranges
   - Use MongoDB Atlas IP Access Lists
   - Enable MongoDB Atlas encryption
   - Use VPC peering if deploying on cloud

## Need Help?

- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- Network Access Guide: https://docs.atlas.mongodb.com/security/ip-access-list/
- Connection Troubleshooting: https://docs.atlas.mongodb.com/troubleshoot-connection/
