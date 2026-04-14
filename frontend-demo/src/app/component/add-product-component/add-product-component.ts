import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product-service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BarcodeFormat } from '@zxing/library';
@Component({
  selector: 'app-add-product-component',
  standalone: true,
  imports: [RouterLink, FormsModule, ZXingScannerModule],
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css',
})
export class AddProductComponent {


  public productData: Product;

  protected allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
  ];

  noReceivedDate = false;
  noExpiredDate = false;

  constructor(private productService: ProductService) {
    this.productData = {
      productSpu: '',
      productSku: '',
      productName: '',
      unitOfMeasure: '',
      productQty: 0,
      productPricePerUnit: 0,
      recievedDateExisted: false,
      expiredDateExisted: false,
      recievedDate: undefined,
      expiredDate: undefined,
      productBarCode: '',
    };
  }

 

  addNewProduct(): void {
    this.productService.addNewProduct(this.productData).subscribe({
      next: (response) => {
        console.log('Product added:', response);
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }


  onNoReceivedDateChange(checked: boolean): void {
    this.noReceivedDate = checked;
    if (checked) this.productData.recievedDate = undefined;
  }
  onNoExpiredDateChange(checked: boolean): void {
    this.noExpiredDate = checked;
    if (checked) this.productData.expiredDate = undefined;
  }
}