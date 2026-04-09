import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:8080/auth';
  private csrfApiUrl = 'https://localhost:8080/api';

  constructor(private http: HttpClient) { 

  }

  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.csrfApiUrl}/csrf`, {
      withCredentials: true,
      responseType: 'text'
    });
  }
  
  login(credentials: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'X-CSRF-TOKEN': token
        });

        return this.http.post(`${this.baseUrl}/login`, credentials, {
          headers,
          withCredentials: true,
          responseType: 'text'
        });
      })
    );
  }


  
}



  // isUserLoggedIn() {
  //   let user = localStorage.getItem(' ')
  // }



