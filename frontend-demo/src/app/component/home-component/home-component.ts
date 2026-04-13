import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  username = '';
  isLoading = true;
  isLoggingOut = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: (response) => {
        this.username = response.username ?? '';
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load your profile.';
        this.isLoading = false;
      }
    });
  }

  goToAddProductPage(): void {
    this.router.navigate(['/add-product']);
  }

  logout(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;
    this.errorMessage = '';

    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Logout failed. Please try again.';
        this.isLoggingOut = false;
      }
    });
  }
}
