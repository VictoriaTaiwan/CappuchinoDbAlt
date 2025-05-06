import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from '../../core/services/auth/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    this.loginService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = 'Invalid login credentials.';
      }
    );
  }
}