package com.tonggaw.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tonggaw.demo.entity.Product;

public interface ProductRepository extends JpaRepository<Product, String> {

}
