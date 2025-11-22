import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiResponse } from '../../shared/models/api-response.model';
import { User } from '../user';
import { UserData } from '../../shared/models/user-data.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit {
  userId!: number;
  user: UserData | null = null;
  errorMessage: string = '';

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

  goBack(): void {
    this.router.navigate(['/users']);
  }
}