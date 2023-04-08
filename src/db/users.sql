-- Active: 1680972617375@@127.0.0.1@3306

CREATE TABLE users (
  id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at DATE DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (name, email, password)
VALUES
  ("fulano", "fulano@teste.com", "123"),
  ("beltrano", "beltrano@teste.com", "123");

SELECT * FROM users;

DROP TABLE users;