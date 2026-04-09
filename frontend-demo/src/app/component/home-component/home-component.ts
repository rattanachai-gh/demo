import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { ProductService } from '../../service/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  constructor(private authService: AuthService, private productService: ProductService, private router: Router) {

  }

  

}
