# CLAUDE.md

## Project purpose

This project is a food-ordering website for pizza, burgers, drinks, sides, and other menu items. Customers should be able to browse the menu, customize items, add products to a cart, submit an order, and receive confirmation by phone or WhatsApp. Restaurant staff should be able to manage menu items and order statuses.

## Coding principles

- Write code that is easy for another developer to understand and maintain.
- Prefer small, focused components and functions with one clear responsibility.
- Use descriptive names for variables, functions, components, database fields, and API endpoints.
- Keep business rules explicit. Do not hide pricing, delivery, order-status, or authorization logic inside UI-only code.
- Avoid unnecessary abstractions, clever one-liners, duplicated logic, and premature optimization.
- Add short comments only when explaining why something is done; do not comment obvious code.
- Keep functions predictable and avoid unexpected mutation of shared state.
- Reuse existing project patterns before introducing a new library or architecture.
- Preserve existing behavior unless the task explicitly requires changing it.

## Security requirements

- Treat all browser input as untrusted. Validate and sanitize data on the server, even if it was validated in the UI.
- Never trust prices, totals, discounts, delivery fees, product availability, or order status values submitted by the client. Recalculate and verify them server-side using database data.
- Enforce authorization on every protected server action and API route. Admin-only operations must not rely on hidden UI controls.
- Use allowlists for order statuses, roles, sort fields, and other finite values.
- Use parameterized database queries or the project's safe database client. Never build SQL queries by string concatenation.
- Do not expose service-role keys, database passwords, private tokens, or other secrets in client code, committed files, logs, or error messages.
- Store secrets in environment variables and update environment-example files with placeholders only.
- Protect customer information such as names, phone numbers, addresses, and order history. Return only the fields a user needs.
- Avoid logging personal data, authentication tokens, payment details, or full request bodies.
- Use secure, httpOnly cookies and server-side session checks where applicable. Do not store sensitive credentials in local storage.
- Prevent duplicate orders and unsafe repeated submissions with idempotency or server-side duplicate checks where appropriate.
- Escape user-generated text when rendering it. Do not use unsafe HTML rendering unless the content is sanitized and the need is documented.
- Validate uploaded images and files by type, size, and content; never trust the filename or extension.
- Add rate limiting or abuse protection to public order, login, and notification endpoints when those endpoints are implemented.
- Fail safely: do not reveal stack traces, database details, or internal implementation information to customers.

## Food-ordering rules

- An order should begin as `pending_confirmation` and only become confirmed after the restaurant accepts it.
- Keep an immutable record of the product name and unit price used at checkout so later menu changes do not rewrite historical orders.
- Use integer minor currency units for money calculations where possible; never rely on floating-point arithmetic for totals.
- Validate that products are available, quantities are positive and within a reasonable limit, and selected options belong to the chosen product.
- Make order-status transitions explicit and reject invalid transitions.
- Keep delivery-area, minimum-order, opening-hours, and delivery-fee rules centralized and testable.

## Implementation workflow

1. Inspect the existing code and follow its conventions before making changes.
2. For each feature, identify the UI, server, database, authorization, and validation boundaries.
3. Implement the smallest complete change that solves the task.
4. Add or update tests for pricing, permissions, validation, and important order flows.
5. Run the project's formatter, linter, type checker, and relevant tests before finishing.
6. Review the diff for accidentally exposed secrets, personal data, debug code, and unrelated changes.
7. Report what changed, what was tested, and any remaining assumptions or risks.

## Quality expectations

- Keep TypeScript types accurate; do not use `any` to silence errors without documenting a justified exception.
- Handle loading, empty, success, validation-error, and server-error states in user-facing flows.
- Make forms keyboard accessible and provide clear labels and error messages.
- Keep customer-facing error messages helpful but non-sensitive.
- Optimize images and avoid unnecessary client-side JavaScript, especially on menu pages.
- Do not add dependencies without explaining why the dependency is needed and checking whether existing tools can solve the problem.
