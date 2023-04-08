-- Active: 1680972617375@@127.0.0.1@3306

CREATE TABLE products (
  id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  price REAL NOT NULL,
  description TEXT
  image_url TEXT
);

INSERT INTO products (name, price)
VALUES
  ("teclado", 29.90),
  ("mouse", 19.90);

SELECT * FROM products;

DROP TABLE products;