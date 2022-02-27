# Users

### 1. **Create**: add a user

```curl
POST http://localhost:3000/users HTTP/1.1
content-type: application/json

{
"firstname": "dishant",
"lastname": "tanwar",
"password": "password123"
}
```

### 2. **Index**: get a list of all users

```
GET http://localhost:3000/users
```

### 3. **Show**: get user with user_id

```
GET http://localhost:3000/users/2
```

# Products

### 1. **Create**: add a product

```
POST http://localhost:3000/products HTTP/1.1
content-type: application/json

{
"name": "tea cup",
"price": "350"
}
```

### 2. **Index**: get a list of all products

```
GET http://localhost:3000/products
```

### 3. **Show**: get a product with poduct_id

```
GET http://localhost:3000/products/2
```

# Orders

### 1. **Create**: add order

```
POST http://localhost:3000/orders HTTP/1.1
content-type: application/json

{
"quantity": "10",
"status": "active",
"user_id": "2",
"product_id": "2"
}
```

### 2. **Index**: get a list of all orders

```
GET http://localhost:3000/orders
```

### 3. **Show**: get current orders for user using user id.

```
GET http://localhost:3000/orders/2
```
