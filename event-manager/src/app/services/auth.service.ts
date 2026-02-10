import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor() {
    // Check localStorage for persistence
    const status = localStorage.getItem('isLoggedIn');
    if (status === 'true') {
      this.loggedIn.next(true);
    }
  }

  login() {
    this.loggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }
}