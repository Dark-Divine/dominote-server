## Dominote Server

Production-ready NestJS service wired to Neon/PostgreSQL via Drizzle ORM. The project includes typed schema definitions, a global database module, and scripts for generating and pushing migrations with drizzle-kit.

## Getting started

```bash
# install dependencies
pnpm install
```

Use `.env.example` and edit with your environment variables

Essential environment variables:

| Name | Description |
| --- | --- |
| `DATABASE_URL` | Full Neon connection string (`postgresql://...` with `sslmode=require`). |
| `DATABASE_SSL` | Set to `true` for Neon. |
| `DATABASE_SSL_REJECT_UNAUTHORIZED` | Set to `false` for Neon unless you load CA certs. |
| `DATABASE_MAX_CONNECTIONS` | Pool size (Neon suggests 5–10 for free tiers). |
| `DATABASE_LOG_QUERIES` | Enable verbose Drizzle logging in dev. |

## Database workflow

```bash
# generate SQL migrations from the Drizzle schema
pnpm db:generate

# push migrations to Neon/PostgreSQL
pnpm db:migrate

# open the Drizzle Studio UI
pnpm db:studio
```

Schema lives in `src/database/schema`. Tables are exported via `schema/index.ts`, which keeps Drizzle types consistent both in the Nest container and the CLI tooling.

## Application layout

- `src/config` – Environment validation (`zod`) plus structured database config (`registerAs`).
- `src/database/database.module.ts` – Global module that builds a pooled `pg` connection and exposes a typed Drizzle client.
- `src/database/database.service.ts` – Lazily instantiates the pool, exposes `db` for repositories, performs graceful shutdown, and offers a cheap `ping`.
- `src/database/schema` – Source of truth for all tables. Example `users` table demonstrates timestamps, UUIDs, and unique constraints.
- `src/app.service.ts` – Shows how to consume the Drizzle client via dependency injection (the root route returns the current DB timestamp).

## Running the API

```bash
# development
pnpm start:dev

# production build + run
pnpm build && pnpm start:prod
```

The Nest app refuses to serve traffic if it cannot reach the database, which protects downstream modules that rely on transactions.

## Testing

```bash
pnpm test        # unit
pnpm test:e2e    # e2e (DatabaseService is mocked)
pnpm test:cov    # coverage
```

The e2e suite overrides `DatabaseService`, so tests run without a real Neon instance while the application code still expects a live Drizzle client in other environments.
