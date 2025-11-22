import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from '../../shared/models/api-response.model';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { UserData } from '../../shared/models/user-data.model';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList implements OnInit {

  users: UserData[] = [];
  errorMessage: string = '';

  constructor(private userService: User, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
  this.userService.getAll().subscribe({
    next: (res: ApiResponse<UserData[]>) => {
      if (res.success) {
        this.users = res.data;
      } else {
        this.errorMessage = res.message;
      }
    },
    error: (err) => {
      console.log(err);
      this.errorMessage = err.error?.message || 'Server error';
    }
  });
}

  editUser(id: number) {
    this.router.navigate(['/users/edit', id]);
  }

  viewUser(id: number) {
    this.router.navigate(['/users', id]);
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.loadUsers(); // reload list after deletion
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
}
