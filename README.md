<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest



# Description

GraphQL API built on top of [Nest.js](https://github.com/nestjs/nest) framework using TypeScript, Notion API and a bunch of small tools.

## Purpose
```
1. Provide a flexible way for a data-vis tool to consume database content from Notion
2. Learn about NestJS without following along boring tutorials
```

## Features
```
1. Retrieve specified database tables from Notion API
2. Filter all tables by each column
3. Sorting pagination, searching
```

## Development steps
1. Setup project structure including essential tools including <br>
  a) NestJS: `CLI`, `graphql`, `Swagger` <br>
  b) Notion Client API <br>
  c) Apollo Server <br>
  d) dotenv <br>
  e) nodemon <br>
2. Setup `code-first` GraphQL module for Notion service, include it into main app module
3. Setting up controllers and services
4. Currently working on implementing filtering, sorting and searching features on controllers

## Challenges & workarounds
```
1. Rate limit from Notion API => migrate table to real DB
2. Updating notion table doesn't update DB data => setup triggers to post data to DB
```

## CD/CD
```
1. Platform: Heroku
2. Process TBA
```

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
