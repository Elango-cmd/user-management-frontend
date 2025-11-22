import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})  
export class Auth {
 private baseUrl = 'http://localhost:8080/api/auth'; // backend URL

  constructor(private http: HttpClient) {}

  // Register new user
  register(data: { name: string; email: string; password: string }): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.baseUrl}/register`, data);
  }

  // Login user
  login(email: string, password: string): Observable<ApiResponse<{ userId: number; token: string }>> {
    return this.http.post<ApiResponse<{ userId: number; token: string }>>(`${this.baseUrl}/login`, { email, password });
  }

  // Store token in localStorage
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
