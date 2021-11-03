<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



# About

GraphQL API built on top of [NestJS](https://github.com/nestjs/nest) framework using TypeScript, Notion API and a bunch of small tools.

## 📍 Purpose
1. Acting an the API for a finance management app (personal use)
2. Provide a flexible way for the front-end to interact with data
3. Learn about NestJS & GraphQL without following along boring tutorials

## 💥 Features
1. Read, create, update and delete all personal finance data hosted in cloud DB
2. Filter all tables by each column
3. Sorting, pagination, searching
4. Date range filter on all date-type fields for both tables (Very important)


## 📝 Development process
1. Setup project structure including essential tools including <br>
  a) NestJS: CLI, graphql, Swagger <br>
  b) Notion Client API <br>
  c) Apollo Server <br>
  d) dotenv <br>
  e) nodemon <br>
  f) Prisma ORM
2. Setup `code-first` GraphQL module for Notion service, include it into main app module
3. Setting up controllers, resolvers, services and DTOs using built-in `dependency injection`.
4. Seeding local `PostgreSQL` DB using `Notion API`
5. Set up basic filtering on columns with type `string`
6. Setup sorting by date as query param
7. Next: Date-range filtering
8. MUST: Authorisation (Guards & interceptors)
9. Nice-to-have: search (user typing on frontend, triggers search query onChange => every new character)

## ⁉️ Challenges & workarounds
1. Rate limit from Notion API => migrate table to real DB (Done)
2. DB data isn't in sync with data from Notion => need Notion webhook to setup triggers but none available
3. API is accessible to public (not safe as it contains personal finance data) => Setup authorisation for access (in progress)

## 🛠️ Infrastructure (TBD)
1. Database: PostgreSQL
2. Platform: AWS

## 🛫 Running the app

```bash
# Installation
$ yarn

# build
$ yarn build

# development
$ yarn start

# watch mode
$ yarn dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# unit tests - auto-update
$ yarn test:watch

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
