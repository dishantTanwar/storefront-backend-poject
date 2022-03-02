CREATE TABLE if not exists orders (
    id SERIAL PRIMARY KEY,
    order_id BIGINT,
    quantity BIGINT,
    status VARCHAR(15),
    user_id BIGINT REFERENCES users(id),
    product_id BIGINT REFERENCES products(id)
);