import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product-service';
import { BarcodeScannerService } from '../../service/barcode-scanner';

@Component({
  selector: 'app-add-product-component',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css',
})
export class AddProductComponent {

  // เพิ่ม ViewChild สำหรับ video element
  @ViewChild('scannerVideo') scannerVideo?: ElementRef<HTMLVideoElement>;
  isScannerOpen = false;
  scannerError = '';

  @ViewChild('productNgForm') productNgForm?: NgForm;

  noReceivedDate = false;
  noExpiredDate = false;
  isSaving = false;
  showSaveConfirmation = false;
  successMessage = '';
  errorMessage = '';
  toastMessage = '';
  toastVariant: 'success' | 'error' = 'success';
  private toastTimeoutId: number | null = null;

  productForm = {
    productSku: '',
    productName: '',
    unitOfMeasure: '',
    productQty: null as number | null,
    productPricePerUnit: null as number | null,
    productBarCode: '',
    recievedDate: '',
    expiredDate: '',
  };

  constructor(private productService: ProductService,private scannerService: BarcodeScannerService) {}

  addProduct(): void {
    this.showSaveConfirmation = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  confirmSave(): void {
    if (this.isSaving) return;

    this.isSaving = true;
    this.showSaveConfirmation = false;
    this.successMessage = '';
    this.errorMessage = '';
    this.clearToast();

    const payload: Product = {
      productSku: this.productForm.productSku.trim(),
      productName: this.productForm.productName.trim(),
      unitOfMeasure: this.productForm.unitOfMeasure.trim(),
      productQty: Number(this.productForm.productQty ?? 0),
      productPricePerUnit: Number(this.productForm.productPricePerUnit ?? 0),
      recievedDateExisted: !this.noReceivedDate,
      expiredDateExisted: !this.noExpiredDate,
      recievedDate:
        this.noReceivedDate || !this.productForm.recievedDate
          ? undefined
          : new Date(`${this.productForm.recievedDate}T00:00:00`),
      expiredDate:
        this.noExpiredDate || !this.productForm.expiredDate
          ? undefined
          : new Date(`${this.productForm.expiredDate}T00:00:00`),
      productBarCode: this.productForm.productBarCode.trim() || undefined,
    };

    this.productService.addNewProduct(payload).subscribe({
      next: (response: any) => {
        const savedSku = response?.productSku ? ` (${response.productSku})` : '';
        this.successMessage = `Product saved successfully${savedSku}.`;
        this.showToast(`Product added successfully${savedSku}.`, 'success');
        this.isSaving = false;
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message ?? 'Unable to add product.';
        this.showToast(this.errorMessage, 'error');
        this.isSaving = false;
      }
    });
  }

  cancelSaveConfirmation(): void {
    this.showSaveConfirmation = false;
    this.resetForm();
  }

  onNoReceivedDateChange(checked: boolean): void {
    this.noReceivedDate = checked;
    if (checked) this.productForm.recievedDate = '';
  }

  onNoExpiredDateChange(checked: boolean): void {
    this.noExpiredDate = checked;
    if (checked) this.productForm.expiredDate = '';
  }

  dismissToast(): void {
    this.clearToast();
  }

  private resetForm(): void {
    this.productNgForm?.resetForm({
      productSku: '',
      productName: '',
      unitOfMeasure: '',
      productQty: null,
      productPricePerUnit: null,
      productBarCode: '',
      recievedDate: '',
      expiredDate: '',
    });

    this.noReceivedDate = false;
    this.noExpiredDate = false;
    this.showSaveConfirmation = false;
  }

  private showToast(message: string, variant: 'success' | 'error'): void {
    this.clearToast();
    this.toastMessage = message;
    this.toastVariant = variant;
    this.toastTimeoutId = window.setTimeout(() => {
      this.clearToast();
    }, 4000);
  }

  private clearToast(): void {
    if (this.toastTimeoutId !== null) {
      clearTimeout(this.toastTimeoutId);
      this.toastTimeoutId = null;
    }
    this.toastMessage = '';
  }

  async openScanner(): Promise<void> {
    this.isScannerOpen = true;
    this.scannerError = '';
    let hasScanned = false;
    // รอให้ DOM render video element ก่อน
    setTimeout(async () => {
      if (!this.scannerVideo?.nativeElement) return;
      try {
        await this.scannerService.startScan(
          this.scannerVideo.nativeElement,
          (barcode) => {
            hasScanned = true;
            this.productForm.productBarCode = barcode;
            this.closeScanner();
          }
        );
      } catch (err: any) {
        this.scannerError = 'ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้กล้อง';
      }
    }, 100);
  }

  closeScanner(): void {
    this.scannerService.stopScan();
    this.isScannerOpen = false;
  }

  ngOnDestroy(): void {
    this.scannerService.stopScan();
  }
}
