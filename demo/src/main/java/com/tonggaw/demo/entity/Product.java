package com.tonggaw.demo.entity;

import java.util.Date;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="products")
public class Product {
	
	@Id
	private String productSku;
	
	
	private String productName;
	
	
	private String unitOfMeasure;
	
	
	private double productQty;
	
	
	private double productPricePerUnit;
	
	
	private boolean recievedDateExisted;
	
	
	private boolean expiredDateExisted; 
	
	@Nullable
	private Date recievedDate;
	
	@Nullable
	private Date expiredDate;

	@Getter
	@Setter
	private String productBarCode;
	
	@ManyToOne
	@JoinColumn(name = "username", nullable = true)
	private User byUser;


	public String getProductSku() {
		return productSku;
	}


	public void setProductSku(String productSku) {
		this.productSku = productSku;
	}


	public String getProductName() {
		return productName;
	}


	public void setProductName(String productName) {
		this.productName = productName;
	}


	public String getUnitOfMeasure() {
		return unitOfMeasure;
	}


	public void setUnitOfMeasure(String unitOfMeasure) {
		this.unitOfMeasure = unitOfMeasure;
	}


	public double getProductQty() {
		return productQty;
	}


	public void setProductQty(double productQty) {
		this.productQty = productQty;
	}


	public double getProductPricePerUnit() {
		return productPricePerUnit;
	}


	public void setProductPricePerUnit(double productPricePerUnit) {
		this.productPricePerUnit = productPricePerUnit;
	}


	public boolean isRecievedDateExisted() {
		return recievedDateExisted;
	}


	public void setRecievedDateExisted(boolean recievedDateExisted) {
		this.recievedDateExisted = recievedDateExisted;
	}


	public boolean isExpiredDateExisted() {
		return expiredDateExisted;
	}


	public void setExpiredDateExisted(boolean expiredDateExisted) {
		this.expiredDateExisted = expiredDateExisted;
	}


	public Date getRecievedDate() {
		return recievedDate;
	}


	public void setRecievedDate(Date recievedDate) {
		this.recievedDate = recievedDate;
	}


	public Date getExpiredDate() {
		return expiredDate;
	}


	public void setExpiredDate(Date expiredDate) {
		this.expiredDate = expiredDate;
	}


	public User getByUser() {
		return byUser;
	}


	public void setByUser(User byUser) {
		this.byUser = byUser;
	}
	
	
	
}
