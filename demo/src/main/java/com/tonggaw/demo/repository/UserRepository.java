package com.tonggaw.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tonggaw.demo.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

}
