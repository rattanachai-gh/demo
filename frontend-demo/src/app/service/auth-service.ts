import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:8080/auth';
  private csrfApiUrl = 'https://localhost:8080/api';


  private authStateSubject = new BehaviorSubject<AuthState>('loading');
  authState$ = this.authStateSubject.asObservable();
  
  constructor(private http: HttpClient) { 

  }

  get authState(): AuthState {
    return this.authStateSubject.value;
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
      }),
      tap(() => {
        this.authStateSubject.next('authenticated');
      })
    );
  }

  setAuthenticated() {
    this.authStateSubject.next('authenticated');
  }

  setUnauthenticated() {
    this.authStateSubject.next('unauthenticated');
  }

  checkAuth(): Observable<boolean> {
    this.authStateSubject.next('loading');

    return this.http.get<any>(`${this.baseUrl}/me`, {
      withCredentials: true
    }).pipe(
      map(response => response.authenticated === true),
      tap(isAuthenticated => {
        this.authStateSubject.next(
          isAuthenticated ? 'authenticated' : 'unauthenticated'
        );
      }),
      catchError(() => {
        this.authStateSubject.next('unauthenticated');
        return of(false);
      })
    );
  }


  
}



  // isUserLoggedIn() {
  //   let user = localStorage.getItem(' ')
  // }



