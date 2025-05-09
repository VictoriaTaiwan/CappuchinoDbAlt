import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { LoginService } from './core/services/auth/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,  
    MatButtonModule, 
    CommonModule, 
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn: boolean = false;
  
  constructor(private authService: LoginService, private router: Router) {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      console.log('Logged in state:', isLoggedIn);
      this.isLoggedIn = isLoggedIn;
    });
  }
}
