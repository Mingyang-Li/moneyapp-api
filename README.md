<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# MoneyApp API

## 🕵️‍♂️ About
Versatile GraphQL API built on top of [NestJS](https://github.com/nestjs/nest) framework for ease of use on data-analytics frontends

## 📍 Purpose
1. Acting an the API for a finance management app (personal use)
2. Provide a flexible way for the front-end to interact with data
3. Learn about NestJS & GraphQL without copying from boring tutorials

## 📚 Frontend repo: [HERE](https://github.com/Mingyang-Li/moneyapp-client)

## 🛠️ Technologies used
| Purpose | Tools |
| :--- | :---- |
| ✅ Language | TypeScript |
| ✅ Framework | [NestJS](https://nestjs.com/) |
| ✅ GraphQL API | Apollo Server |
| ✅ Data source | [Notion API](https://developers.notion.com/) |
| ✅ Data modelling | [Prisma ORM](https://www.prisma.io/) |
| ✅ Decode JWT | jsonwebtoken |
| ✅ Secure API keys | dotenv |
| ✅ Currency conversion | [Exchange Rates API](https://exchangeratesapi.io/) |

## 🛠️ Infrastructure
| No. | Purpose | Tools |
| :-- | :-- | :-- |
| 1 | Databse system | PostgresSQL
| 2 | Hosting database | [Supabase](https://supabase.io/)
| 3 | Authentication & Identity management | [Auth0](https://auth0.com/)
| 4 | API hosting | [Heroku](https://www.heroku.com/)
| 5 | CD/CI | [CircleCI](https://circleci.com/)

## 🏗️ Architecture
![image](https://user-images.githubusercontent.com/53138432/143810605-c543c694-214f-4a12-9110-0019dfc66e75.png)

## ⛰️ Product roadmap
| No. | Description | Status |
| :-- | :-- | :-- |
| 1. | Query any income data by any field | ✅ |
| 2. | Set limit on query amount on income | ✅ |
| 3. | Query any expenses data by any field | ✅ |
| 4. | Set limit on query amount on expenses | ✅ |
| 5. | Group income by any field and calculate sum & counts with date-range filter | ✅ |
| 6. | Group income by date with date-range filter so that the data returned also includes dates with $0 income for data-visualisation | ✅ |
| 7. | Group expenses by any field and calculate sum & counts with date-range filter | ✅ |
| 8. | Group expenses by date with date-range filter so that the data returned also includes dates with $0 expenses for data-visualisation | ✅ |
| 9. | Query average daily income with date-range filter | ✅ |
| 10. | Query average daily expenses with date-range filter | ✅ |
| 11. | Query total income with date-range filter | ✅ |
| 12. | Query total expenses with date-range filter | ✅ |
| 13. | Query net income with date-range filter | ✅ |
| 14. | Prevent authenticated BUT unauthorised users from accessing ALL endpoints | ✅ |
| 14. | Automatically add new users into a `User` table in DB after they signed up the app using Auth0 | |
| 15. | Link up `Income` and `Expense` tables with `User` by introducing association rules |
| 16. | Mutation for creating row for `Income`
| 17. | Mutation for updating row for `Income`
| 18. | Mutation for creating row for `Expense`
| 19. | Mutation for updating row for `Expense`
| 20. | Subscription with pagination for retrieving rows from `Income`
| 21. | Subscription with pagination for retrieving rows from `Expense`

## ⁉️ Challenges & workarounds
| No. | Problem | Solution |
| :-- | :-- | :-- |
| 1 | Rate limit from Notion API + Ugly & Inconsistent response structure from Notion SDK | Migrate table to real DB (PostgreSQL) |
| 2 | DB data isn't in sync with data from Notion | Need Notion webhook to setup triggers but none available, current plan is to manually update DB from time to time |
| 3 | There are no out-of-box auth solutions for Nest + GraphQL + Auth0 in RBAC (Role-based access-control) | Implemented a [custom guard](https://github.com/Mingyang-Li/moneyapp-api/blob/main/src/auth/gql-auth0.guard.ts) that transforms request context from REST into GraphQL context then authenticate and authorise access based on the `permissions` field of the decoded jwt token payload. |
| 4 | When returning `sum` from `IncomeGroupBy` queries, the `sum` amount does not reflect the differences in `currency` (NZD and USD) | Need to either setup compulsory currency filter in query layer or auto-calculate all USD amount to NZD by real-time exchange rate on return |
| 5 | Need to show dates with $0 income for aggregated income queries by dynamic date-range filter for time-series chart display | Used dates API to populate empty dates |

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

## 🔭 Sample query & response:
### All queries are protected by guards, meaning only authorised users are able to execute the queries (which is me, myself and I)

### Query income by payment method and calculate sum of income by payment method
```graphql
# Note: endDate and dateStartInc are optional.
# When date filters are not provided, the query will return all records`
query {
  incomeGroupBy ( 
  	field: "paymentMethod",
    valueType: "sum"
    endDate: "Sun Nov 21 2021 12:12:28 GMT+1300 (New Zealand Daylight Time)"
    startDate: "Wed Sep 01 2021 12:12:28 GMT+1200 (New Zealand Standard Time)"
  ) {
    incomePaymentMethod
    sum
  }
}
```

```json
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

### Query income by payment method and returning the number of times income is received by each payment method
```gql
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

### Query income by "paidBy" and returning sum of each person/org who paid
```gql
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

### Query income by date and returning accumulated income including days when income is $0
```gql
query {
  incomeGroupBy ( 
  	field: "date",
    valueType: "sum"
    startDate: "Sun Nov 21 2021 12:12:28 GMT+1300 (New Zealand Daylight Time)"
    endDate: "Tue Nov 23 2021 13:00:00 GMT+1300 (New Zealand Daylight Time)"
  ) {
    date
    sum
  }
}
```
```json
{
  "data": {
    "incomeGroupBy": [
      {
        "date": "2021-11-21T23:12:28.000Z",
        "sum": 23443
      },
      {
        "date": "2021-11-22T23:12:28.000Z",
        "sum": 0
      },
      {
        "date": "2021-11-23T00:00:00.000Z",
        "sum": 20000
      },
    ]
  }
}
```

### Query daily average income given a date range, returning the type of average income queried and the value
```gql
query {
  averageIncome (
    type: "daily"
    startDate: "Thu Jul 01 2021 12:00:00 GMT+1200 (New Zealand Standard Time)"
    endDate: "Tue Sep 28 2021 13:00:00 GMT+1300 (New Zealand Daylight Time)"
  ) {
    type
    average
  }
}
```
```json
{
  "data": {
    "averageIncome": [
      {
        "type": "daily",
        "average": 5000
      }
    ]
  }
}
```

### Get total income given a date range
```gql
query {
  incomeSum (
    startDate: "Thu Jul 01 2021 12:00:00 GMT+1200 (New Zealand Standard Time)"
    endDate: "Tue Sep 28 2021 13:00:00 GMT+1300 (New Zealand Daylight Time)"
  ) {
    sum
  }
}
```
```json
{
  "data": {
    "incomeSum": [
      {
        "sum": 152360.76
      }
    ]
  }
}
```

### Get total expenses given a date range
```gql
query {
  expenseSum (
    startDate: "Thu Jul 01 2021 12:00:00 GMT+1200 (New Zealand Standard Time)"
    endDate: "Tue Sep 28 2021 13:00:00 GMT+1300 (New Zealand Daylight Time)"
  ) {
    sum
  }
}
```
```json
{
  "data": {
    "expenseSum": [
      {
        "sum": 7639.89
      }
    ]
  }
}
```