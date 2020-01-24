# Exactive

Simple task and notes management application written in TypeScript. Uses NestJS, TypeORM and Postgres.

## Installation

### Requirements

- Node.js (LTS is recommended) and Yarn
- PostgreSQL 12

#### Optional

- pgAdmin 4
- Any REST client you like (you can even use cURL)

---

Configure your environment with environment variables (See [src/config/typeorm.config.ts](src/config/typeorm.config.ts) and [src/main.ts](src/main.ts)) or edit the files at [config/](config/).

```bash
$ yarn
```

## Running the app

```bash
# Development
$ yarn start

# Development (Watch)
$ yarn start:dev

# Development (Watch and Debug)
$ yarn start:debug

# Production
$ yarn start:prod
```

## Testing

```bash
# Unit tests
$ yarn test

# Unit tests (Watch)
$ yarn test:watch

# Unit tests (Debug)
$ yarn test:debug

# E2E tests
$ yarn test:e2e

# Test coverage
$ yarn test:cov
```

## License

Exactive is [MIT licensed](LICENSE).
