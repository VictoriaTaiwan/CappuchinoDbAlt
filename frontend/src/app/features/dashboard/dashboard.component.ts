import { Component } from '@angular/core';
import { LoginService } from '../../core/services/auth/login.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private loginService: LoginService) {}
  logout() {
    console.log('log out clicked');
    this.loginService.logout();
  }
}
