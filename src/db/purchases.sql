-- Active: 1680972617375@@127.0.0.1@3306

CREATE TABLE purchases (
  id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
  buyer_id INTEGER NOT NULL,
  total_price REAL,
  paid BOOLEAN DEFAULT(false) NOT NULL,
  created_at DATE DEFAULT(DATETIME()) NOT NULL,
  Foreign Key (buyer_id) REFERENCES users(id)
);

CREATE TABLE purchases_products (
  purchase_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  Foreign Key (purchase_id) REFERENCES purchases(id),
  Foreign Key (product_id) REFERENCES products(id)
);

INSERT INTO purchases (buyer_id, total_price)
VALUES
  (1, 29.90),
  (1, 299);

INSERT INTO purchases_products
VALUES
  (1, 1, 1),
  (2, 1, 10);

SELECT * FROM purchases;

SELECT * FROM purchases_products;

DROP TABLE purchases;

DROP TABLE purchases_products;