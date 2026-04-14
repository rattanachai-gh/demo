import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login-component',
  imports: [],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private credentials: User;
  constructor(private authService: AuthService, private router: Router) { 
    this.credentials = {
      username: '',
      password: '',
    };
  }


  get getCredentials() {
    return this.credentials;
  }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {

        // localStorage.setItem('token', response.token);

        console.log('Login successful:', response);
        // Handle successful login, e.g., store token, navigate to dashboard, etc.
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error: ', error);
      }
    });
  }

}
