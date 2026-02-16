# Database Seeding Script

This script populates your MongoDB database with sample data for testing the application.

## What it creates:

- **4 Users** (including 1 admin)
- **6 Events** (various categories: Conference, Workshop, Concert, Meetup, Seminar, Sports)
- **3 Bookings** (sample bookings for testing)

## How to run:

```bash
# From the backend directory
npm run seed

# Or directly
node scripts/seedData.js
```

## Test Credentials:

After running the seed script, you can use these credentials to test the application:

### Regular Users:
- **Email:** `john@example.com`
- **Password:** `password123`

- **Email:** `jane@example.com`
- **Password:** `password123`

- **Email:** `alice@example.com`
- **Password:** `password123`

### Admin User:
- **Email:** `admin@example.com`
- **Password:** `admin123`

## Sample Events Created:

1. **Tech Conference 2026** - Conference (₹1,500)
2. **Angular Workshop** - Workshop (₹500)
3. **Music Festival** - Concert (₹2,000)
4. **Business Networking Meetup** - Meetup (₹300)
5. **Web Development Seminar** - Seminar (₹800)
6. **Marathon Run** - Sports (₹600)

## Notes:

- The script will **clear all existing data** before seeding (users, events, bookings)
- If you want to keep existing data, comment out the deletion lines in `seedData.js`
- All events are set to "upcoming" status
- Sample bookings are created for testing the booking functionality

## Troubleshooting:

- Make sure your `.env` file has the correct `MONGODB_URI`
- Ensure MongoDB is running and accessible
- Check that all required models are properly set up
