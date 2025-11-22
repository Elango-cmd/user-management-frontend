import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { ApiResponse } from '../../shared/models/api-response.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: Auth, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res: ApiResponse<{ userId: number; token: string }>) => {
        if (res.success) {
          this.authService.saveToken(res.data.token);  // save JWT token
          this.router.navigate(['/users']);          // redirect to user list
        } else {
          this.errorMessage = res.message;
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Server error';
      }
    });
  }
}
