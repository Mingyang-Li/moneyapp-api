<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



# Description

GraphQL API built on top of [Nest.js](https://github.com/nestjs/nest) framework using TypeScript, Notion API and a bunch of small tools.

## Purpose
1. Acting an the API for a finance management app (personal use)
2. Provide a flexible way for the front-end to interact with data
3. Learn about NestJS & GraphQL without following along boring tutorials

## Features
1. Read, create, update and delete all personal finance data hosted in cloud DB
2. Filter all tables by each column
3. Sorting, pagination, searching
4. Date range filter on all date-type fields for both tables (Very important)


## Development steps
1. Setup project structure including essential tools including <br>
  a) NestJS: CLI, graphql, Swagger <br>
  b) Notion Client API <br>
  c) Apollo Server <br>
  d) dotenv <br>
  e) nodemon <br>
  f) Prisma ORM
2. Setup `code-first` GraphQL module for Notion service, include it into main app module
3. Setting up controllers and services
4. Set up basic filtering on columns with type `string`
5. Working on sorting and searching
6. Next: Date-range filtering

## Challenges & workarounds
1. Rate limit from Notion API => migrate table to real DB (Done)
2. Updating notion table doesn't update DB data => setup triggers to post/update data to DB in realtime (In progress)
3. API is accessible to public (not safe as it contains personal finance data) => Setup authorisation for access

## Infrastructure
1. Database: PostgreSQL
2. Platform: AWS

## Running the app

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
