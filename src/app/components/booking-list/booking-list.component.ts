import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="booking-container">
      <h2 class="page-title">My Bookings</h2>
      
      <div class="bookings-grid" *ngIf="bookings$ | async as bookings">
        <div class="booking-card" *ngFor="let booking of bookings; let i = index" [style.animation-delay]="i * 100 + 'ms'">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="icon-wrapper">
              <mat-icon>confirmation_number</mat-icon>
            </div>
            
            <h3 class="event-title">{{ booking.eventTitle }}</h3>
            
            <div class="details">
              <div class="detail-item">
                <mat-icon>airplane_ticket</mat-icon>
                <span>{{ booking.tickets }} Tickets</span>
              </div>
              <div class="detail-item">
                <mat-icon>calendar_today</mat-icon>
                <span>{{ booking.bookingDate | date:'mediumDate' }}</span>
              </div>
            </div>

            <div class="status-badge">
              Confirmed
            </div>
          </div>
        </div>

        <div *ngIf="bookings.length === 0" class="no-bookings">
          <mat-icon>event_busy</mat-icon>
          <p>No bookings found. Start exploring events!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .booking-container {
      padding: 120px 2rem 4rem; /* Clear fixed navbar */
      min-height: 100vh;
      color: white;
      max-width: 1400px;
      margin: 0 auto;
    }

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 3rem;
      text-align: center;
      background: linear-gradient(to right, #fff, #a5b4fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
    }

    .bookings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }

    .booking-card {
      position: relative;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 2rem;
      backdrop-filter: blur(10px);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      animation: fadeInUp 0.6s ease-out backwards;
      cursor: default;
    }

    .booking-card:hover {
      transform: translateY(-8px) scale(1.02);
      background: rgba(255, 255, 255, 0.07);
      border-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    }

    .card-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent 40%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .booking-card:hover .card-glow {
      opacity: 1;
    }

    .card-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .icon-wrapper {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }

    .icon-wrapper mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #818cf8;
    }

    .event-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 1.5rem;
      color: #fff;
      line-height: 1.3;
    }

    .details {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-bottom: 2rem;
      padding: 1rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: #d1d5db;
      font-size: 0.9rem;
    }

    .detail-item mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #a5b4fc;
    }

    .status-badge {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      padding: 0.5rem 1.5rem;
      border-radius: 99px;
      font-size: 0.875rem;
      font-weight: 600;
      border: 1px solid rgba(16, 185, 129, 0.3);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .no-bookings {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 24px;
      border: 1px dashed rgba(255, 255, 255, 0.1);
    }

    .no-bookings mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: rgba(255, 255, 255, 0.2);
      margin-bottom: 1rem;
    }

    .no-bookings p {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.25rem;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .booking-container {
        padding: 100px 1rem 2rem;
      }
      .page-title {
        font-size: 2rem;
      }
      .bookings-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BookingListComponent {
  bookingService = inject(BookingService);
  bookings$: Observable<Booking[]> = this.bookingService.getMyBookings();
}