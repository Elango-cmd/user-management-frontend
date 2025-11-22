import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/models/api-response.model';
import { UserData } from '../shared/models/user-data.model';

@Injectable({
  providedIn: 'root',
})
export class User {
  private baseUrl = 'http://localhost:8080/api/user'; 

  constructor(private http: HttpClient) {}

private getHeader() {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
}


  // Get all users
  getAll(): Observable<ApiResponse<UserData[]>> {
    return this.http.get<ApiResponse<UserData[]>>(this.baseUrl,{
      headers: this.getHeader()
    });
  }

  // Get user by ID
  getById(id: number): Observable<ApiResponse<UserData>> {
    return this.http.get<ApiResponse<UserData>>(`${this.baseUrl}/${id}`,{
      headers: this.getHeader()
    });
  }

  // Update user
  update(id: number, data: Partial<UserData>): Observable<ApiResponse<UserData>> {
    return this.http.put<ApiResponse<UserData>>(`${this.baseUrl}/${id}`, data,{
      headers: this.getHeader()
    });
  }

  // Delete user
  delete(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`,{
      headers: this.getHeader()
    });
  }
}
