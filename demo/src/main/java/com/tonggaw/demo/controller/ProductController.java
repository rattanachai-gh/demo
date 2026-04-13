package com.tonggaw.demo.controller;

import java.net.URI;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tonggaw.demo.entity.Product;
import com.tonggaw.demo.entity.User;
import com.tonggaw.demo.record.ProductDTO;
import com.tonggaw.demo.security.CustomUserDetails;
import com.tonggaw.demo.service.ProductService;
import com.tonggaw.demo.service.UserService;

@RestController 
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private UserService userService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewProduct(@RequestBody ProductDTO productDTO, Authentication authentication) {
        Product product = new Product();
        product.setProductName(productDTO.productName());
        product.setProductSku(productDTO.productSku());
        product.setUnitOfMeasure(productDTO.unitOfMeasure());
        product.setProductQty(productDTO.productQty()); 
        product.setProductPricePerUnit(productDTO.productPricePerUnit());
        product.setRecievedDateExisted(productDTO.recievedDateExisted());
        product.setExpiredDateExisted(productDTO.expiredDateExisted());
        product.setRecievedDate(productDTO.recievedDate());
        product.setExpiredDate(productDTO.expiredDate());
        if (productService.findByBarcode(productDTO.productBarCode()).equals(productDTO.productBarCode())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Product with the same barcode already exists"));
        }
        product.setProductBarCode(productDTO.productBarCode());
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String byUserName = userDetails.getUsername();
        User user = userService.findByUsername(byUserName);
        product.setByUser(user);
        Product saved = productService.addNewProduct(product);
        URI location = URI.create("/api/products/" + saved.getProductSku());

        return ResponseEntity.created(location)
                              .body(Map.of("message", "Product added successfully",
                                            "productSku", saved.getProductSku()));
        }
}
