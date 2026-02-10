export interface Booking {
  id?: number;
  eventId: number;
  eventTitle: string;
  userEmail: string;
  userName: string;
  tickets: number;
  bookingDate: Date;
}