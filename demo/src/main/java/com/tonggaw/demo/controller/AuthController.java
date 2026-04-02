package com.tonggaw.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tonggaw.demo.entity.User;
import com.tonggaw.demo.record.RegReq;
import com.tonggaw.demo.service.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "https://localhost:4200")
public class AuthController {

	private UserService userService;
	
	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> register(@RequestBody RegReq regReq) {
		User user = this.userService.registerUser(regReq);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(Map.of("message", "User registered successfully", "username", user.getUsername()));
	}
	
	

}
