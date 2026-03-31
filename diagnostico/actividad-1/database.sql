CREATE USER 'user_fabricaa'@'localhost' IDENTIFIED BY '12345';
GRANT ALL PRIVILEGES ON `stock\_materials`.* TO 'user_fabricaa'@'localhost';

create table if not exists fabrica_stock (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50) NOT NULL,
stock INT NOT NULL,
price FLOAT NOT NULL,
units VARCHAR(50) NOT NULL,
state INT NOT NULL
)

INSERT INTO fabrica_stock(id, name, stock, price, units, state) VALUES (1,"Vidrio", 4, 12000.0, "4kg", 1)

SELECT name, stock, price, units, state FROM fabrica_stock WHERE id = 1

ALTER TABLE `fabrica_stock`
ADD UNIQUE `name` (`name`);