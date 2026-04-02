package com.tonggaw.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.stereotype.Service;


import com.tonggaw.demo.entity.User;
import com.tonggaw.demo.record.RegReq;
import com.tonggaw.demo.repository.UserRepository;

@Service
public class UserService {
	
	
	private UserRepository userRepository;
	private BCryptPasswordEncoder passwordEncoder;
	
	
	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Autowired
	public void setPasswordEncoder(BCryptPasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}
	

	public User registerUser(RegReq regReq) {
		
		
		User user = new User();
		user.setUsername(regReq.username());
		user.setPassword(this.passwordEncoder.encode(regReq.password()));
		user.setUserFirstName(regReq.firstname());
		user.setUserLastName(regReq.lastname());
		
		return this.userRepository.save(user);
	}
	
	
	
}
