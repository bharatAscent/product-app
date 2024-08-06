This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Run project

Run the development server using :

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run tests

Run the tests using :

```bash
npm run test
```

## Project info

-   The project contains App router of next js
-   The project uses Mui for components and table uis
-   The project uses `tanstack/react-table` for a headless table
-   The project uses `react-hook-form` with `zod` schema validator
-   For API calls `axios` is being used
-   `Date-fns` is used for any date manipulations

-   The `services` folder contains an API file for all the APIs
-   `App` folder contains all the pages and their related code
-   The `schema.ts` files has all type interface and zod schemas defined in it.
-   The main `page.tsx` contains login related code to use textfield and loading button from MUI for login fields
-   The `products` folder has page.tsx related to products table listing and the reviews dialog component
-   The `page.tsx` inside product folders has tanstack table intialisation, custom styles for header and column and table using Mui table.
-   The `reviews.tsx` has the dialog for the reviews fetched using product by id API and displayed in it.

-   The `__tests__` folder contains test files for both the pages and the modal
