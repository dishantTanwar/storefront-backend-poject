# Users

### 1. **Create**: add a user

REQUEST

```js

POST http://localhost:3000/users HTTP/1.1
content-type: application/json

{
"firstname": "dishant",
"lastname": "tanwar",
"username": "dishantTanwar",
"password": "password123"
}
```

RESPONSE

```js
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsInVzZXJuYW1lIjoiZGlzaGFudFRhbndhciJ9LCJpYXQiOjE2NDYxNjIwMTl9.ul0LP0xtYcOseF6eZasc3xQPZlEnF4VoNOa52p0Ml8g";
```

### 2. **Index**: get a list of all users

REQUEST:

```js
GET http://localhost:3000/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsInVzZXJuYW1lIjoiZGlzaGFudFRhbndhciJ9LCJpYXQiOjE2NDYxNjIwMTl9.ul0LP0xtYcOseF6eZasc3xQPZlEnF4VoNOa52p0Ml8g

```

RESPONSE:

```js
[
  {
    "id": 1,
    "firstname": "dishant",
    "lastname": "tanwar",
    "username": "dishantTanwar",
    "password": "$2b$10$pBGi0ZzD2mlhhRCCOYteW.lajaX.SQ7OmhhlceaSwNV3xHQnhdytC"
  }
]

<!-- if token is invalid -->

{
  "name": "JsonWebTokenError",
  "message": "invalid token"
}
```

### 3. **Show**: get user with user_id

REQUEST:

```js
GET http://localhost:3000/users/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsInVzZXJuYW1lIjoiZGlzaGFudFRhbndhciJ9LCJpYXQiOjE2NDYxNjIwMTl9.ul0LP0xtYcOseF6eZasc3xQPZlEnF4VoNOa52p0Ml8g

```

RESPONSE:

```js
{
  "id": 1,
  "firstname": "dishant",
  "lastname": "tanwar",
  "username": "dishantTanwar",
  "password": "$2b$10$pBGi0ZzD2mlhhRCCOYteW.lajaX.SQ7OmhhlceaSwNV3xHQnhdytC"
}
```

# Authentication

REQUEST:

```js
POST http://localhost:3000/users/authenticate HTTP/1.1
content-type: application/json

{
"username": "dishantTanwar",
"password": "password123"
}
```

RESPONSE:

```js
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsInVzZXJuYW1lIjoiZGlzaGFudFRhbndhciJ9LCJpYXQiOjE2NDYxNjIzNjN9.cIUEhWHRltvps9tpGX-ZnipQsBIpNpZH40HsbzNbSDM",
  "message": "Success: user is authenticated"
}
```

# Products

### 1. **Create**: add a product

REQUEST:

```js
POST http://localhost:3000/products HTTP/1.1
content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsInVzZXJuYW1lIjoiZGlzaGFudFRhbndhciJ9LCJpYXQiOjE2NDYxNjIwMTl9.ul0LP0xtYcOseF6eZasc3xQPZlEnF4VoNOa52p0Ml8g

{
"name": "football",
"price": "200"
}
```

RESPONSE:

```js
{
    id: 1,
    name: "football",
    price: "200.00"
}
```

### 2. **Index**: get a list of all products

REQUEST:

```js
GET http://localhost:3000/products
```

RESPONSE:

```js
[
  {
    id: 1,
    name: "football",
    price: "200.00"
  }
];
```

### 3. **Show**: get a product with poduct_id

REQUEST:

```js
GET http://localhost:3000/products/1
```

RESPONSE:

```js
{
    "id": 1,
    "name": "football",
    "price": "200.00"
}
```

# Orders

### 1. **Create**: add order

REQUEST:

```js
POST http://localhost:3000/orders/1 HTTP/1.1
content-type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsInVzZXJuYW1lIjoiZGlzaGFudFRhbndhciJ9LCJpYXQiOjE2NDYxNjIwMTl9.ul0LP0xtYcOseF6eZasc3xQPZlEnF4VoNOa52p0Ml8g

{
"quantity": "5",
"status": "active",
"user_id": "1",
"product_id": "1"
}
```

RESPONSE:

```js
{
  "id": 1,
  "quantity": "5",
  "status": "active",
  "user_id": "1",
  "product_id": "1"
}
```

### 2. **Index**: get a list of all orders

REQUEST:

```js
GET http://localhost:3000/orders

```

RESPONSE:

```js
[
  {
    id: 1,
    quantity: "5",
    status: "active",
    user_id: "1",
    product_id: "1"
  }
];
```

### 3. **Show**: get current orders for user using user id.

REQUEST:

```js
GET http://localhost:3000/orders/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOjEsInVzZXJuYW1lIjoiZGlzaGFudFRhbndhciJ9LCJpYXQiOjE2NDYxNjIwMTl9.ul0LP0xtYcOseF6eZasc3xQPZlEnF4VoNOa52p0Ml8g

```

RESPONSE:

```js
[
  {
    id: 1,
    quantity: "5",
    status: "active",
    user: {
      id: 1,
      username: "dishantTanwar",
      firstname: "dishant",
      lastname: "dishant"
    },
    product: {
      id: 1,
      name: "football",
      price: "200.00"
    }
  }
];
```
