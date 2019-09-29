CREATE DATABASE api_rest_nodejs;
USE api_rest_nodejs;

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary int(11) DEFAULT NULL,
    PRIMARY KEY(id)
);

DESCRIBE employee;