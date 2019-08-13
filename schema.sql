DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT ,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NOT NULL default 0.00,
  stock_quantity INTEGER(10) NOT NULL default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("PS4", "Video Games", 399.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Nintendo Switch", "Video Games", 399.99, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Wyze Cam Pan", "Security Equipment", 59.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Sling Pet Carrier", "Pet", 27.99, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Ray Ban Polarized Sunglasses", "Men's Apparel", 399.99, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Bento Compartment for Kids", "Kitchen's Storage", 29.99, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("The Scarlet Letter", "Books", 10.00, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Baltasar and Blimunda", "Books", 15.99, 3);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("The 5 Love Languages", "Books", 14.85, 13);
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Final Fantasy VII: Remake", "Video Games", 89.99, 10);
    
SELECT * FROM products;