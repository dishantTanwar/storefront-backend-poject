# Storefront Backend Project

## Getting Started

This repo contains a Node and Express API. To get started, clone this repo and run `npm install` in your terminal at the project root.

> To know about this API refer to [REQUIREMENTS.md](REQUIREMENTS.md)

## Required Technologies

Your application must make use of the following libraries:

    - Postgres for the database
    - Node/Express for the application logic
    - dotenv from npm for managing environment variables
    - db-migrate from npm for migrations
    - jsonwebtoken from npm for working with JWTs
    - jasmine from npm for testing

## Steps to get this app `running` in your local-machine

> Refer to [ENDPOINTS.md](ENDPOINTS.md) to know about API endpoints

1. `Clone this repo`

   - open terminal and change directory to file
   - run `npm install`

2. `Run a postgres database in your system`

   - `create` TWO databases: `storefront_backend_project` and `storefront_backend_project_test`

3. Create one .env file in project root folder and `ADD following values`

   - set ENV=dev

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_backend_project
POSTGRES_USER=<USER_NAME>
POSTGRESS_PASSWORD=<PASSWORD>
POSTGRES_TEST_DB=storefront_backend_project_test
ENV=<dev or test>
PEPPER=some_secret_password
SALT_ROUNDS=10
JWT_SECRET=super_secret
```

4. install `db-migrate` by running `npm i db-migrate`

   - and run `db-migrate up`

5. run `npm run watch` and the app should be running

## To run Test:

1 set `ENV=test` in `.env` file

2 run `npm run test`
