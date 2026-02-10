import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  getUserBookings(email: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}?userEmail=${email}`);
  }
}