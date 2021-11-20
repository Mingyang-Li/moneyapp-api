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

## 📚 Frontend repository
- [HERE](https://github.com/Mingyang-Li/moneyapp-client)

## 💥 Features
1. Read, create, update and delete all personal finance data hosted in cloud DB
2. Filter all tables by each column
3. Sorting, pagination, searching
4. Date range filter on all date-type fields for both tables (Very important)
5. Rolse-base access-control for GraphQL endpoints on Nest.js Guards
6. Aggregated queries on all tables [see samples at bottom of file](https://github.com/Mingyang-Li/moneyapp-api/blob/main/src/notion/notion.entity.ts)


## 📝 Development process
1. Setup project structure including essential tools including <br>
  a) NestJS: CLI, graphql, Swagger <br>
  b) Notion Client API <br>
  c) Apollo Server <br>
  d) dotenv <br>
  e) nodemon <br>
  f) Prisma ORM <br>
  g) jsonwebtoken
2. Setup `code-first` GraphQL module for Notion service, include it into main app module
3. Setting up controllers, resolvers, services and DTOs using built-in `dependency injection`.
4. Defining DB schema, seeding local `PostgreSQL` DB using `Notion API`
5. Set up basic filtering on columns with type `string`
6. Setup sorting by date as query param
7. Setup Guards for role-based authentication and authorisation 
8. Current: Date-range filtering
9. Nice-to-have: search (user typing on frontend, triggers search query onChange => every new character)

## ⁉️ Challenges & workarounds
<b> Problem 1.</b> Rate limit from Notion API + Ugly & Inconsistent response structure from Notion SDK <br>
<b>Solution:</b> Migrate table to real DB (PostgreSQL)

<b>Problem 2.</b> DB data isn't in sync with data from Notion<br>
<b>Solution:</b> Need Notion webhook to setup triggers but none available, current plan is to manually update DB from time to time

<b>Problem 3.</b> There are no out-of-box auth solutions for Nest + GraphQL + Auth0 in RBAC<br>
<b>Solution:</b> Implemented a [custom guard](https://github.com/Mingyang-Li/moneyapp-api/blob/main/src/auth/gql-auth0.guard.ts) that transforms request context from REST into GraphQL context then authenticate and authorise access based on the `permissions` field of the decoded jwt token payload.

<b>Problem 4.</b> When returning `sum` from `IncomeGroupBy` queries, the `sum` amount does not reflect the differences in `currency` (NZD and USD)<br>
<b>Solution:</b> Need to either setup currency filter in query layer or auto-calculate all USD amount to NZD by real-time exchange rate on return

## 🛠️ Infrastructure
1. Database: [PostgreSQL](https://www.postgresql.org/)
2. Realtime Cloud DB: [Supabase](https://supabase.io/) free tier
3. Authentication: [Auth0](https://auth0.com/docs/security/tokens/access-tokens/validate-access-tokens)
4. Deployment: [Heroku](https://www.heroku.com/)
5. CD/CI: [CircleCI](https://circleci.com/)

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


## Test
# unit tests
$ yarn test

# unit tests - auto-update
$ yarn test:watch

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov

## Database
# database seeding
$ npx prisma db seed

# See DB using prisma studio
$ npx prisma studio
```

## 🛫 Sample query & response:
### All queries are protected by guards, meaning only authorised users are able to execute the queries (which is me, myself and I)
```graphql
IncomeGroupBy

# Query grouped income by payment method and calculate sum of income by payment method

## query
query {
  incomeGroupBy ( 
  	field: "paymentMethod",
    valueType: "sum"
  ) {
    incomePaymentMethod
    sum
  }
}
```

```json
## Response
{
  "data": {
    "incomeGroupBy": [
      {
        "incomePaymentMethod": "Cash",
        "sum": 10070.43
      },
      {
        "incomePaymentMethod": "Paypal",
        "sum": 10222.8
      },
      {
        "incomePaymentMethod": "Direct Debit",
        "sum": 32190.28
      }
    ]
  }
}
```

```gql

# Query grouped income by payment method and returning the number of times income is received by each payment method

## Query
query {
  incomeGroupBy ( 
  	field: "paymentMethod",
    valueType: "count"
  ) {
    incomePaymentMethod
    count
  }
}
```

```json
## Response
{
  "data": {
    "incomeGroupBy": [
      {
        "incomePaymentMethod": "Bitcoin",
        "count": 28
      },
      {
        "incomePaymentMethod": "Polkadot",
        "count": 35
      },
      {
        "incomePaymentMethod": "Ethereum",
        "count": 41
      }
    ]
  }
}
```

# Query grouped income by "paidBy" and returning sum of each person/org who paid

```gql
## Query
query {
  incomeGroupBy ( 
  	field: "paidBy",
    valueType: "sum"
  ) {
    incomePaidBy
    sum
  }
}
```
```json
## Response

{
  "data": {
    "incomeGroupBy": [
      {
        "incomePaidBy": "Amazon Inc",
        "sum": 332830
      },
      {
        "incomePaidBy": "Google Inc",
        "sum": 312872
      },
      {
        "incomePaidBy": "Salesforce Inc",
        "sum": 3298770
      },
    ]
  }
}
```