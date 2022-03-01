CREATE TABLE if not exists users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(150),
    lastname VARCHAR(150),
    username VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(150)
);