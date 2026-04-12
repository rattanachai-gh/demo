import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { Observable } from 'rxjs';

interface MeResponse {
  authenticated: boolean;
  username?: string;
}
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = `https://localhost:8080/auth`;
  private csrfApiUrl = `https://localhost:8080/api`;
  constructor(private http: HttpClient) { 

  }
  getCsrfToken(): Observable<string> {
    return this.http.get(`${this.csrfApiUrl}/csrf`, {
      withCredentials: true,
      responseType: 'text'
    });
  }

  login(credentials: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap((token) => {
        console.log('Received CSRF token: ', token);
        const headers = new HttpHeaders({
          'X-CSRF-TOKEN': token
        });

        return this.http.post(`${this.baseUrl}/login`, credentials, {
          headers,
          withCredentials: true
        });
      })
    );
  }

  getCurrentUser(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.baseUrl}/me`, {
      withCredentials: true
    });
  }

  logout(): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'X-CSRF-TOKEN': token
        });

        return this.http.post<void>(`${this.baseUrl}/logout`, {}, {
          headers,
          withCredentials: true
        });
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(res => res.authenticated),
      catchError((error) => {
        console.log('Error checking authentication status. Assuming not authenticated.', error);
        return of(false);
      })
    );
  }

}
