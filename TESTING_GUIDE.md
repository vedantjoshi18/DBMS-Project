# Testing Guide - Backend-Frontend Integration

This guide will help you test the connection between your Angular frontend and Node.js backend.

## Prerequisites

1. **Backend Server Running**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend should be running on `http://localhost:5000`

2. **Frontend Server Running**
   ```bash
   npm install
   npm start
   ```
   Frontend should be running on `http://localhost:4200`

3. **MongoDB Connection**
   - Ensure your MongoDB URI in `backend/.env` is correct
   - Database should be accessible

## Step 1: Seed Sample Data

Run the seed script to populate your database with test data:

```bash
cd backend
npm run seed
```

This will create:
- 4 users (3 regular users + 1 admin)
- 6 sample events
- 3 sample bookings

## Step 2: Test Authentication

### Test Login:
1. Open `http://localhost:4200`
2. Click "Login" button in navbar
3. Use test credentials:
   - **Email:** `john@example.com`
   - **Password:** `password123`
4. Click "Login"
5. You should be redirected to events page

### Test Registration:
1. Navigate to login page
2. Use a new email (e.g., `test@example.com`)
3. Fill in registration form
4. Submit and verify you can login

## Step 3: Test Events API

### View All Events:
1. Navigate to `/events` page
2. You should see 6 sample events displayed
3. Check browser DevTools Network tab to see API calls to `/api/events`

### View Event Details:
1. Click on any event card
2. Should navigate to `/event/:id`
3. Verify event details are displayed correctly
4. Check API call to `/api/events/:id`

### Filter Events:
1. Use category filter dropdown
2. Verify events filter correctly
3. Check API calls include query parameters

## Step 4: Test Bookings API

### Create Booking:
1. Login as a user
2. Navigate to an event detail page
3. Click "Book Tickets Now"
4. Enter number of tickets (1-5)
5. Submit booking
6. Verify success message
7. Check API call to `/api/bookings` (POST)

### View My Bookings:
1. Navigate to `/my-bookings`
2. Should see bookings for logged-in user
3. Check API call to `/api/bookings/my-bookings`

### Cancel Booking:
1. Go to bookings list
2. Find cancel option (if implemented)
3. Verify cancellation works
4. Check API call to `/api/bookings/:id/cancel` (PUT)

## Step 5: Test Error Handling

### Invalid Login:
1. Try logging in with wrong credentials
2. Verify error message displays
3. Check console for error handling

### Network Errors:
1. Stop backend server
2. Try to fetch events
3. Verify error handling works
4. Restart backend and verify recovery

## Step 6: Test Admin Features

### Admin Login:
1. Login as admin:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`
2. Verify admin access (if admin routes are implemented)

## API Endpoints to Test:

### Authentication:
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Events:
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (requires auth)
- `PUT /api/events/:id` - Update event (requires auth)
- `DELETE /api/events/:id` - Delete event (requires auth)

### Bookings:
- `POST /api/bookings` - Create booking (requires auth)
- `GET /api/bookings/my-bookings` - Get user's bookings (requires auth)
- `GET /api/bookings/:id` - Get single booking (requires auth)
- `PUT /api/bookings/:id/cancel` - Cancel booking (requires auth)
- `GET /api/bookings/admin/all` - Get all bookings (requires admin)

## Browser DevTools Checklist:

1. **Network Tab:**
   - Verify all API calls are going to `http://localhost:5000/api`
   - Check request headers include `Authorization: Bearer <token>` for protected routes
   - Verify response format matches expected structure

2. **Console Tab:**
   - Check for any JavaScript errors
   - Verify no CORS errors
   - Check for authentication errors

3. **Application Tab:**
   - Verify `token` is stored in localStorage after login
   - Verify `user` data is stored in localStorage
   - Check `isLoggedIn` flag

## Common Issues & Solutions:

### CORS Errors:
- Verify `FRONTEND_URL` in backend `.env` is `http://localhost:4200`
- Check backend CORS configuration in `server.js`

### 401 Unauthorized:
- Verify token is being sent in headers
- Check token expiration
- Verify user is logged in

### 404 Not Found:
- Verify backend routes are correct
- Check API base URL in frontend environment files
- Verify backend server is running

### Data Not Displaying:
- Check API response format matches frontend expectations
- Verify data mapping in services
- Check browser console for errors

## Test Data Summary:

### Users:
- `john@example.com` / `password123` (User)
- `jane@example.com` / `password123` (User)
- `alice@example.com` / `password123` (User)
- `admin@example.com` / `admin123` (Admin)

### Events:
- Tech Conference 2026 (Conference, ₹1,500)
- Angular Workshop (Workshop, ₹500)
- Music Festival (Concert, ₹2,000)
- Business Networking Meetup (Meetup, ₹300)
- Web Development Seminar (Seminar, ₹800)
- Marathon Run (Sports, ₹600)

## Next Steps:

1. Test all CRUD operations
2. Test edge cases (empty data, invalid inputs)
3. Test pagination if implemented
4. Test search/filter functionality
5. Test responsive design with API calls
6. Test error scenarios

Happy Testing! 🚀
