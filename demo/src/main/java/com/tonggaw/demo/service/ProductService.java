package com.tonggaw.demo.service;

import org.springframework.stereotype.Service;

import com.tonggaw.demo.entity.Product;
import com.tonggaw.demo.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    public Product addNewProduct(Product product) {
    
        return productRepository.save(product);
    }


    public Product findByBarCode(String barcode) {
    
        return productRepository.findByProductBarCode(barcode);

    }

}
