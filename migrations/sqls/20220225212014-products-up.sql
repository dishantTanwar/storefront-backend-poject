CREATE TABLE if not exists products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),

    -- numeric(precision, scale) 
    -- where: precision is total number of digits
    -- scale: number of digits after the decimal
    -- ex. 123.01 [here precision is: 5, and scale is 2]
    price NUMERIC(12, 2)
);