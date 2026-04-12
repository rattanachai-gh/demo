package com.tonggaw.demo.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name="users")
public class User {
	
	@Id
	@NotNull
	private String username;
	
	@NotNull
	private String password;
	
	
	
	
	@Pattern(regexp = "^[a-zA-Z\\u0E00-\\u0E7F\\s]*$", message = "รองรับเฉพาะภาษาไทยและอังกฤษเท่านั้น")
	@NotNull
	private String userFirstName;
	
	
	@Pattern(regexp = "^[a-zA-Z\\u0E00-\\u0E7F\\s]*$", message = "รองรับเฉพาะภาษาไทยและอังกฤษเท่านั้น")
	@NotNull
	private String userLastName;
	
	
	@OneToMany(mappedBy = "byUser",cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = false)
    private List<Product> products = new ArrayList<>();
	
	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getUserFirstName() {
		return userFirstName;
	}


	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}


	public String getUserLastName() {
		return userLastName;
	}


	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}


	public List<Product> getProducts() {
		return products;
	}


	public void setProducts(List<Product> products) {
		this.products = products;
	}

	
}
