import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ParticleBackgroundComponent } from './components/particle-background/particle-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, ParticleBackgroundComponent],
  template: `
    <app-particle-background></app-particle-background>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'event-manager';
}
