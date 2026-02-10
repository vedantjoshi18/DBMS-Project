import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { BookingService } from '../../services/booking.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatIconModule],
  template: `
    <div class="booking-page">
      <div class="booking-container">
        <div class="form-header">
          <h2 class="form-title">Secure Your Spot</h2>
          <p class="event-name">{{ eventTitle }}</p>
        </div>

        <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="glass-form">
          <div class="form-group">
            <label for="userName">Full Name</label>
            <div class="input-wrapper">
              <mat-icon>person_outline</mat-icon>
              <input type="text" id="userName" formControlName="userName" placeholder="Enter your full name">
            </div>
            <div class="error-msg" *ngIf="bookingForm.get('userName')?.touched && bookingForm.get('userName')?.invalid">
              Name is required
            </div>
          </div>

          <div class="form-group">
            <label for="userEmail">Email Address</label>
            <div class="input-wrapper">
              <mat-icon>mail_outline</mat-icon>
              <input type="email" id="userEmail" formControlName="userEmail" placeholder="Enter your email">
            </div>
            <div class="error-msg" *ngIf="bookingForm.get('userEmail')?.touched && bookingForm.get('userEmail')?.invalid">
              Valid email is required
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="tickets">Tickets</label>
              <div class="input-wrapper">
                <mat-icon>confirmation_number</mat-icon>
                <input type="number" id="tickets" formControlName="tickets" min="1" max="5">
              </div>
              <div class="error-msg" *ngIf="bookingForm.get('tickets')?.touched && bookingForm.get('tickets')?.invalid">
                1-5 tickets allowed
              </div>
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <div class="input-wrapper">
                <mat-icon>phone_iphone</mat-icon>
                <input type="tel" id="phone" formControlName="phone" placeholder="10-digit number">
              </div>
              <div class="error-msg" *ngIf="bookingForm.get('phone')?.touched && bookingForm.get('phone')?.invalid">
                Invalid phone number
              </div>
            </div>
          </div>

          <button type="submit" [disabled]="bookingForm.invalid" class="submit-btn">
            <span>Confirm Booking</span>
            <mat-icon>arrow_forward</mat-icon>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .booking-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 120px 1rem 2rem; /* Clear navbar */
      box-sizing: border-box;
    }

    .booking-container {
      width: 100%;
      max-width: 500px;
      perspective: 1000px;
      animation: fadeIn 0.8s ease-out;
    }

    .glass-form {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
    }

    .glass-form::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    }

    .form-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .form-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0;
      background: linear-gradient(to right, #fff, #a5b4fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.02em;
    }

    .event-name {
      color: #a5b4fc;
      font-size: 1.1rem;
      margin-top: 0.5rem;
      font-weight: 500;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    label {
      display: block;
      color: #d1d5db;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .input-wrapper {
      position: relative;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .input-wrapper:focus-within {
      background: rgba(0, 0, 0, 0.4);
      border-color: #818cf8;
      box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.1);
    }

    .input-wrapper mat-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      transition: color 0.3s ease;
    }

    .input-wrapper:focus-within mat-icon {
      color: #818cf8;
    }

    input {
      width: 100%;
      background: transparent;
      border: none;
      padding: 1rem 1rem 1rem 3rem;
      color: #fff;
      font-size: 1rem;
      outline: none;
      font-family: inherit;
    }

    input::placeholder {
      color: #4b5563;
    }

    .error-msg {
      color: #ef4444;
      font-size: 0.8rem;
      margin-top: 0.5rem;
      margin-left: 0.5rem;
      animation: slideDown 0.2s ease-out;
    }

    .submit-btn {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border: none;
      border-radius: 12px;
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      margin-top: 1rem;
      position: relative;
      overflow: hidden;
    }

    .submit-btn:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px -10px rgba(124, 58, 237, 0.5);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: #374151;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      .booking-page {
        padding-top: 100px;
      }
    }
  `]
})
export class BookingFormComponent {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  eventService = inject(EventService);
  bookingService = inject(BookingService);
  snackBar = inject(MatSnackBar);

  eventId: number = 0;
  eventTitle: string = '';

  bookingForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    userEmail: ['', [Validators.required, Validators.email]],
    tickets: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  });

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(this.eventId).subscribe(event => {
      this.eventTitle = event.title;
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const bookingData = {
        ...this.bookingForm.value,
        eventId: this.eventId,
        eventTitle: this.eventTitle,
        bookingDate: new Date()
      };

      this.bookingService.createBooking(bookingData).subscribe(() => {
        this.snackBar.open('Booking Confirmed! 🚀', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/my-bookings']);
      });
    }
  }
}
