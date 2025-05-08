import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports:[ReactiveFormsModule, CommonModule, FormsModule,],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const pw = form.get('password')?.value;
    const pw2 = form.get('password2')?.value;
    return pw === pw2 ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('/api/register/', this.registerForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard']);
          this.registerForm.reset();
        },
        error: (err) => {
          const errors = err.error;
          if (errors) {
            this.errorMessage = Object.values(errors)
              .flatMap((messages) =>
                Array.isArray(messages) ? messages : [messages]
              )
              .join('\n');
          } else {
            this.errorMessage = 'Registration failed.';
          }
        }
      });
    }
  }
}