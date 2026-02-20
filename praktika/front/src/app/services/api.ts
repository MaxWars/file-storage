import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    return this.http.post(`${this.baseUrl}/auth/login`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  getFile(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/${id}`);
  }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/files/`, formData);
  }
  downloadFile(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/files/${id}/download`, {
      responseType: 'blob'
    });
  }

  deleteFile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/files/${id}`);
  }

}
