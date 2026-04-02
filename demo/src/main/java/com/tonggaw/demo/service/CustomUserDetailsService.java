package com.tonggaw.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.tonggaw.demo.entity.User;
import com.tonggaw.demo.repository.UserRepository;
import com.tonggaw.demo.security.CustomUserDetails;

public class CustomUserDetailsService implements UserDetailsService {
	
	
	private UserRepository userRepository;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> userExisting = userRepository.findById(username);
		User user = userExisting.get();
		
		if (userExisting.isEmpty()) {
		    throw new UsernameNotFoundException("user not found with given username.");
		}
		
		CustomUserDetails userDetails= new CustomUserDetails();
		userDetails.setUser(user);
		
		
		return userDetails;
	}



	

}
