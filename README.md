# Ali Baba Pizza Web

Architecture foundation for a secure food-ordering application built with Next.js, TypeScript, and PostgreSQL.

## Scope of this setup

This phase defines the application boundaries, initial database migration, deterministic local seed data, and development tooling. Customer ordering screens, staff management workflows, and provider integrations remain feature work.

- `src/app` contains route boundaries for the storefront, admin area, and API handlers.
- `src/server` contains server-only database, domain, repository, and service contracts.
- `src/lib` contains configuration, authentication, validation, and security helpers.
- `db/migrations` and `db/seeds` contain database lifecycle artifacts.
- `tests` is split into unit, integration, and end-to-end suites.

## Local setup

1. Use Node.js 22 or newer.
2. Copy `.env.example` to `.env.local` and set a local PostgreSQL `DATABASE_URL` and random `AUTH_SESSION_SECRET`.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Apply the committed initial migration and deterministic local seed:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

   When the schema changes, generate a new migration first:

   ```bash
   npm run db:generate
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## Verification commands

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

The integration suite should use a disposable PostgreSQL database. Never put real credentials, provider tokens, or customer data in committed files or test fixtures.

## Domain invariants

- New orders start at `pending_confirmation` and require restaurant acceptance before confirmation.
- Product names and minor-unit prices are snapshotted on order items.
- Totals, availability, options, delivery fees, opening hours, and status transitions are verified on the server.
- Protected actions perform authentication and role checks independently of UI visibility.
- Public order, login, and notification endpoints require rate limiting before production use.
