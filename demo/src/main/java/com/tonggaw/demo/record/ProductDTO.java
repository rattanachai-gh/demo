package com.tonggaw.demo.record;

import java.util.Date;

public record ProductDTO(
    String productSpu,
    String productSku,
    String productName,
    String unitOfMeasure,
    double productQty,
    double productPricePerUnit,

    boolean recievedDateExisted,
    boolean expiredDateExisted,

    Date recievedDate,
    Date expiredDate,

    String productBarCode
) 
{
    
}