# This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

## Getting Started

Installation:

```bash
npx create-next-app@latest
```

Run the development server:

```bash
npm run dev
# or
node --run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Running server locally

```bash
# Start the container
docker-compose up -d
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Other technologies used

### Prisma ORM

```bash
# Install Prisma CLI as a development dependency
npm install prisma -D
# or
# Install Prisma CLI as a development dependency (alternative syntax)
npm install prisma --save-dev

# Initialize Prisma in your project, creating schema and .env files
npx prisma init
# or
# Initialize Prisma specifically for PostgreSQL
npx prisma init --datasource-provider postgresql
# or
# Initialize Prisma specifically for SQLite
npx prisma init --datasource-provider sqlite

# Create and apply a new migration based on schema changes (prompts for name)
npx prisma migrate dev
# or
# Create and apply a new migration with a specific name (e.g., "init")
npx prisma migrate dev --name init

# Open Prisma Studio, a GUI for your database
npx prisma studio
```

### React Hook Form

```bash
npm i react-hook-form
```

### Bcrypt

```bash
npm i bcrypt
```

### NextAuth

```bash
npm i next-auth
```

### Nodemailer

```bash
npm i nodemailer
```

### Flowbite

```bash
npx flowbite-react@latest init
```

### React Icons

```bash
npm i react-icons
```

### Axios

```bash
npm i axios
```

## Source video

<https://youtu.be/_SPoSMmN3ZU?si=ThE3_TkEtm5kRmP3>
