import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../model/product.model';
import { AuthService } from './auth-service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService  {


  private productApiUrl = `https://localhost:8080/api/products`;
  // private productApiUrl = `http://192.168.1.112:8080/api/products`;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    
  }

  addNewProduct(productData: Product) {
    return this.authService.getCsrfToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'X-CSRF-TOKEN': token
        });

        return this.http.post(`${this.productApiUrl}/add`, productData, {
          headers,
          withCredentials: true
        });
      })
    );
  }

}
