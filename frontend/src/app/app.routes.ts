import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events', component: EventListComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'book/:id', 
    component: BookingFormComponent,
    canActivate: [authGuard] 
  },
  { 
    path: 'my-bookings', 
    component: BookingListComponent,
    canActivate: [authGuard] 
  }
];