import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatCardModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private loginService: AuthService) {}
  logout() {
    console.log('log out clicked');
    this.loginService.logout().subscribe();
  }
}
