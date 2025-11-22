import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiResponse } from '../../shared/models/api-response.model';
import { Auth } from '../auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: Auth, private router: Router) {}

  register() {
    this.authService.register({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: (res: ApiResponse<number>) => {
          if(res.success) {
            this.successMessage = "Registration successful! Please login.";
            this.errorMessage = '';
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = res.message;
            this.successMessage = '';
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Server error';
          this.successMessage = '';
        }
      });
  }
}
