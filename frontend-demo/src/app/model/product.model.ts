import { User } from "./user.model";

// product.model.ts
export interface Product {
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