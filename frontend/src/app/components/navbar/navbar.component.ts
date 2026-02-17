import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled" [class.nav-hidden]="!isNavVisible">
      <div class="nav-container">
        <a routerLink="/" class="logo">
          <span class="logo-text">Event<span class="logo-accent">Hub</span></span>
        </a>
        
        <div class="nav-inner-pill">
          <ul class="nav-links">
            <li><a (click)="scrollToSection('about')" class="nav-link">About</a></li>
            <li><a routerLink="/events" routerLinkActive="active" class="nav-link">Events</a></li>
            <li><a (click)="scrollToSection('categories')" class="nav-link">Categories</a></li>
            <li><a routerLink="/my-bookings" routerLinkActive="active" class="nav-link">My Bookings</a></li>
            <li><a (click)="scrollToSection('contact')" class="nav-link">Contact</a></li>
          </ul>
        </div>
        
        <button class="btn-pill-login" *ngIf="!isLoggedIn" (click)="toggleLogin()">Login</button>
        <button class="btn-pill-login" *ngIf="isLoggedIn" (click)="logout()">Logout</button>
        
        <button class="mobile-menu-btn" (click)="toggleMobileMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    
    <!-- Login Modal - Outside nav to fix positioning -->
    <div class="login-modal" *ngIf="showLogin">
      <div class="modal-content glass-card">
        <button class="modal-close" (click)="toggleLogin()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <h2 class="modal-title">Student Login</h2>
        <p class="modal-subtitle">Enter your credentials to continue</p>
        
        <form #loginForm="ngForm" (ngSubmit)="onLogin(loginForm)" class="registration-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" 
                   id="email"
                   name="email" 
                   ngModel 
                   required 
                   placeholder="Enter your email"
                   email>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" 
                   id="password"
                   name="password" 
                   ngModel 
                   required 
                   minlength="6"
                   placeholder="Enter your password">
          </div>
          
          <div class="captcha-container">
            <div class="captcha-display">
              <span class="captcha-text">{{captchaCode}}</span>
              <button type="button" class="refresh-btn" (click)="generateCaptcha()">
                <mat-icon>refresh</mat-icon>
              </button>
            </div>
            
            <div class="form-group">
              <label for="captcha">Enter Captcha</label>
              <input type="text" 
                     id="captcha"
                     name="captcha" 
                     [(ngModel)]="captchaInput"
                     required 
                     placeholder="Enter code above">
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full">
            <mat-icon>login</mat-icon>
            Login
          </button>
        </form>
      </div>
    </div>
    
    <!-- Backdrop -->
    <div class="modal-backdrop" *ngIf="showLogin" (click)="toggleLogin()"></div>
  `,
  styles: [`
    /* Navbar */
    .navbar {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      border-radius: 50px;
      background: transparent;
      border: 1px solid transparent;
      box-shadow: none;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .navbar.scrolled {
      top: 12px;
      background: rgba(18, 18, 24, 0.92);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }
    
    .navbar.nav-hidden {
      transform: translateX(-50%) translateY(-150%);
      opacity: 0;
      pointer-events: none;
    }
    
    .nav-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      padding: 12px 20px;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .navbar.scrolled .nav-container {
      padding: 10px 20px;
      gap: 32px;
    }
    
    /* Logo */
    .logo {
      text-decoration: none;
    }
    
    .logo-text {
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      font-size: 1.4rem;
      color: white;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      transition: all 0.3s ease;
    }
    
    .logo:hover .logo-text {
      text-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
    }
    
    .logo-accent {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Inner Pill - Nested container for nav links */
    .nav-inner-pill {
      display: flex;
      align-items: center;
      background: rgba(40, 40, 50, 0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50px;
      padding: 8px 24px;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .navbar.scrolled .nav-inner-pill {
      background: rgba(50, 50, 60, 0.5);
      border-color: rgba(255, 255, 255, 0.08);
    }
    
    /* Nav Links */
    .nav-links {
      display: flex;
      list-style: none;
      gap: 28px;
      margin: 0;
      padding: 0;
    }
    
    .nav-link {
      text-decoration: none;
      color: rgba(255, 255, 255, 0.7);
      font-weight: 500;
      font-size: 0.85rem;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      padding: 6px 0;
      white-space: nowrap;
    }
    
    .nav-link:hover,
    .nav-link.active {
      color: white;
    }
    
    /* Login Button inside Pill */
    .btn-pill-login {
      padding: 8px 20px;
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      border: none;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: inherit;
      white-space: nowrap;
    }
    
    .btn-pill-login:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 16px rgba(220, 38, 38, 0.4);
    }
    
    /* Nav Actions */
    .nav-actions {
      display: flex;
      gap: 12px;
    }
    
    .btn-gradient {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      border: none;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
      font-family: inherit;
    }
    
    .btn-gradient:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(220, 38, 38, 0.4);
    }
    
    .btn-gradient mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
    
    /* Mobile Menu Button */
    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
    }
    
    .mobile-menu-btn span {
      width: 24px;
      height: 2px;
      background: white;
      transition: all 0.3s ease;
    }
    
    /* Login Modal */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      z-index: 999;
      animation: fadeIn 0.3s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .login-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1001;
      width: 100%;
      max-width: 420px;
      padding: 0 20px;
      animation: modalSlideIn 0.3s ease-out;
    }
    
    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) translateY(0);
      }
    }
    
    .modal-content {
      padding: 40px;
    }
    
    .modal-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      padding: 8px;
      transition: all 0.3s ease;
    }
    
    .modal-close:hover {
      color: white;
      transform: rotate(90deg);
    }
    
    .modal-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 8px;
    }
    
    .modal-subtitle {
      text-align: center;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 30px;
      font-size: 0.95rem;
    }
    
    .registration-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .form-group label {
      font-size: 0.9rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
    }
    
    .form-group input {
      padding: 14px 18px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: white;
      font-size: 1rem;
      transition: all 0.2s ease;
    }
    
    .form-group input:focus {
      outline: none;
      border-color: #dc2626;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }
    
    .form-group input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    /* Captcha */
    .captcha-container {
      margin: 8px 0;
    }
    
    .captcha-display {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(102, 126, 234, 0.1);
      border: 1px solid rgba(102, 126, 234, 0.3);
      border-radius: 12px;
      padding: 16px 20px;
      margin-bottom: 16px;
    }
    
    .captcha-text {
      font-family: 'Courier New', monospace;
      font-size: 1.6rem;
      font-weight: 700;
      color: white;
      letter-spacing: 6px;
      flex: 1;
      user-select: none;
      text-decoration: line-through;
      text-decoration-color: rgba(102, 126, 234, 0.3);
    }
    
    .refresh-btn {
      background: none;
      border: none;
      color: #dc2626;
      cursor: pointer;
      padding: 8px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .refresh-btn:hover {
      transform: rotate(180deg);
    }
    
    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.95rem;
      text-decoration: none;
      cursor: pointer;
      border: none;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #dc2626 0%, #1a1a1a 100%);
      color: white;
      box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
    }
    
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 30px rgba(255, 255, 255, 0.2);
    }
    
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn-outline {
      background: transparent;
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .btn-outline:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: #dc2626;
    }
    
    .btn-full {
      width: 100%;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      
      .mobile-menu-btn {
        display: flex;
      }
      
      .nav-actions {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn = false;
  isScrolled = false;
  isNavVisible = true;
  lastScrollY = 0;
  showMobileMenu = false;

  // Login modal properties
  showLogin = false;
  captchaCode = '';
  captchaInput = '';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;

    // Update scrolled state for styling
    this.isScrolled = currentScrollY > 50;

    // Show navbar at the very top
    if (currentScrollY < 10) {
      this.isNavVisible = true;
    }
    // Hide navbar when scrolling down, show when scrolling up
    else if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      // Scrolling down - hide navbar
      this.isNavVisible = false;
    } else if (currentScrollY < this.lastScrollY) {
      // Scrolling up - show navbar
      this.isNavVisible = true;
    }

    this.lastScrollY = currentScrollY;
  }

  ngOnInit() {
    // Sync with AuthService login state
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
    this.generateCaptcha();
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
    if (this.showLogin) {
      this.generateCaptcha();
      this.captchaInput = '';
    }
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    this.captchaCode = '';
    for (let i = 0; i < 6; i++) {
      this.captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  onLogin(form: any) {
    const email = form.value.email;
    const password = form.value.password;

    // Check if fields are filled
    if (!email || !password || !this.captchaInput) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate captcha (case-insensitive)
    if (this.captchaInput.toLowerCase() !== this.captchaCode.toLowerCase()) {
      alert('Invalid captcha! Please try again.');
      this.generateCaptcha();
      this.captchaInput = '';
      return;
    }

    console.log('Login data:', form.value);
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        if (response.success) {
          this.showLogin = false;
          this.isLoggedIn = true;
          this.router.navigate(['/events']);
        }
      },
      error: (error) => {
        alert(error.error?.message || 'Login failed. Please check your credentials.');
        this.generateCaptcha();
        this.captchaInput = '';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/events']);
  }

  scrollToSection(sectionId: string) {
    // First navigate to events page if not already there
    if (this.router.url !== '/events' && this.router.url !== '/') {
      this.router.navigate(['/events']).then(() => {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}