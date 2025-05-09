import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,  
    MatButtonModule, 
    CommonModule, 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn: boolean = false;
  
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      console.log('Logged in state:', isLoggedIn);
      this.isLoggedIn = isLoggedIn;
    });
  }
}
