package com.tonggaw.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tonggaw.demo.entity.Product;
import com.tonggaw.demo.entity.ProductId;

public interface ProductRepository extends JpaRepository<Product, ProductId> {
    Product findByProductBarCode(String barcode);
}
