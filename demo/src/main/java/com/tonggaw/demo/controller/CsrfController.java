package com.tonggaw.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "https://localhost:4200")
public class CsrfController {

	@GetMapping("/csrf")
	public ResponseEntity<Void> csrf() {
		return ResponseEntity.ok().build();
	}
}