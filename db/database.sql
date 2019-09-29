CREATE DATABASE api_rest_nodejs;
USE api_rest_nodejs;

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary int(11) DEFAULT NULL,
    PRIMARY KEY(id)
);

INSERT INTO employee VALUES
(1, 'PRUEBA', 20000),
(2, 'PRUEBA 2', 30000),
(3, 'PRUEBA 3', 40000),
(4, 'PRUEBA 4', 50000);

DESCRIBE employee;