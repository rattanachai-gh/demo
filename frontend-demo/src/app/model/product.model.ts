import { User } from "./user.model";

// product.model.ts
export interface Product {
  productSpu: string;
  productSku: string;
  productName: string;
  unitOfMeasure: string;
  productQty: number;
  productPricePerUnit: number;

  recievedDateExisted: boolean;
  expiredDateExisted: boolean;

  recievedDate?: Date;
  expiredDate?: Date;

  productBarCode?: string;

  byUser?: User;
}