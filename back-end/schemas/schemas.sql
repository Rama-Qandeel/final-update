-- write the database name that you use here
create database project-5;
use project-5 

--store

CREATE table product_category (
product_category_id int AUTO_INCREMENT NOT NULL,
categoryName varchar(55),
PRIMARY KEY (product_category_id)
);

CREATE table store (
store_id int AUTO_INCREMENT NOT NULL,
user_id int,
store_category varchar(55),
store_name varchar(55),
store_pic varchar(255),
address varchar(255),
is_deleted BIT NOT NULL DEFAULT 0,
PRIMARY KEY (store_id)
);


CREATE table products(
product_id int AUTO_INCREMENT NOT NULL ,
product_category_id int ,
store_id int ,
product_name varchar(255),
product_descripition varchar(255),
quantity_per_unit varchar(100),
unit_price DECIMAL(10,2) ,
available_product Boolean ,
discount_available varchar(20),
picture varchar(255),
is_deleted  BIT NOT NULL DEFAULT 0,
PRIMARY key (product_id),
FOREIGN KEY (store_id) REFERENCES store(store_id),
FOREIGN KEY (product_category_id) REFERENCES product_category(product_category_id)
);



CREATE table orders(
orders_id int auto_increment NOT NULL,
user_id int,
delivary_user_id int ,
store_id int,
product_id int,
price LONGTEXT NULL DEFAULT NULL ;,
product_name varchar(255),
quantity int,
is_done BIT NOT NULL DEFAULT 0,
is_deleted BIT NOT NULL DEFAULT 0,
PRIMARY KEY (orders_id),
);

--users
CREATE TABLE roles (
role_id int NOT NULL,
type varchar(55),
 PRIMARY KEY (role_id)
 );



CREATE TABLE users (
user_id int auto_increment NOT NULL,
first_name varchar(25),
last_name varchar(25),
birhday date,
address varchar(255),
city varchar(255),
region varchar(255),
phone_number varchar(255),
email varchar(255) UNIQUE,
password varchar(255),
image_profile varchar(255),
role_id int ,
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (user_id),
FOREIGN KEY (role_id) REFERENCES roles (role_id)
 );
 
CREATE table payment (
payment_id int auto_increment NOT NULL,
user_id int,
payment_type varchar(255),
credit_card varchar(255),
expiration varchar(255),
cvv varchar(255),
check_out_id int,
user_id int,
is_deleted tinyint default 0,
PRIMARY KEY (payment_id)
FOREIGN KEY (user_id) REFERENCES users (user_id),
 FOREIGN KEY (check_out_id) REFERENCES check_out (check_out_id)
)

//*************************************************/
 CREATE TABLE check_out (
 check_out_id int auto_increment NOT NULL,
 user_id  varchar(255),
 orders_id int,
 delivary_user_id int,
 is_deleted TINYINT DEFAULT 0,
 PRIMARY KEY (check_out_id),
 FOREIGN KEY (user_id) REFERENCES users (user_id),
 FOREIGN KEY (orders_id) REFERENCES orders (orders_id)
 )