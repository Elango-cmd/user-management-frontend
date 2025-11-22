import { Component, OnInit } from '@angular/core';
import { UserData } from '../../shared/models/user-data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../shared/models/api-response.model';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit implements OnInit {
  userId!: number;
  user: UserData | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: User,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user ID from route param
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getById(this.userId).subscribe({
      next: (res: ApiResponse<UserData>) => {
        if (res.success) {
          this.user = res.data;
        } else {
          this.errorMessage = res.message;
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Server error';
      }
    });
  }

  updateUser(): void {
    if (!this.user) return;

    this.userService.update(this.userId, this.user).subscribe({
      next: (res: ApiResponse<UserData>) => {
        if (res.success) {
          this.successMessage = 'User updated successfully!';
          this.errorMessage = '';
          this.router.navigate(['/users']);
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

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
