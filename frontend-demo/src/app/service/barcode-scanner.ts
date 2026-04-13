import { Injectable } from '@angular/core';
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';

@Injectable({
  providedIn: 'root',
})
export class BarcodeScannerService {
  private codeReader = new BrowserMultiFormatReader();
  private controls: IScannerControls | null = null;

  async getAvailableCameras(): Promise<MediaDeviceInfo[]> {
    return BrowserMultiFormatReader.listVideoInputDevices();
  }

  async startScan(
    videoElement: HTMLVideoElement,
    onResult: (barcode: string) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    this.controls = await this.codeReader.decodeFromVideoDevice(
      undefined,
      videoElement,
      (result, error) => {
        if (result) {
          onResult(result.getText());
        }
        if (error && onError) {
          // error มาตลอดเวลาที่ยังไม่เจอ barcode — ไม่ต้อง handle ทุก error
        }
      }
    );
  }

  stopScan(): void {
    this.controls?.stop();
    this.controls = null;
  }
}
