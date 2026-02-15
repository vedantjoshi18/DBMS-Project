const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBooking,
  cancelBooking,
  getAllBookings
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Protected routes
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.put('/:id/cancel', protect, cancelBooking);

// Admin only
router.get('/admin/all', protect, adminOnly, getAllBookings);

module.exports = router;