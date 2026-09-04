# Welcome to BookWise

An university library to keep track of books and students

If you want to use admin functionalities, login with user "admin" and password "bookwise1234"\
[visit it here](https://book-wise-zeta-one.vercel.app/)

## features

- book library with borrow functionality.
- full admin panel

## Getting Started

### Instalattion

Clone the repo

```bash
git clone https://github.com/DanielJaffritz/BookWise.git
```

I recommend installing pnpm

```bash
npm install -g pnpm
```

install the dependencies

```bash
pnpm install
```

configuration:

- Go to [neon database](https://neon.com/docs/guides/javascript#deleting-data) and create your own database
- Go to [upstash](https://upstash.com/) and get your redis and qstash keys
- Go to [ImageKit](https://imagekit.io/) and get your keys

get your auth secret

```bash
pnpm dlx auth secret
```

fill the .env file

```env
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="image kit url endpoint"
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="image kit public key"
IMGEKIT_PRIVATE_KEY="image kit private key"

NEXT_PUBLIC_API_ENDPOINT="http://localhost:3000"

DATABASE_URL="neon database url"

AUTH_SECRET="generated auth secret"

UPSTASH_REDIS_URL="upstash redis url"
UPSTASH_REDIS_TOKEN="upstash redis token"
QSTASH_URL="qstash url"
QSTASH_TOKEN="qstash token"

```

update the database

```bash
pnpm dlx prisma contract emit
```

```bash
pnpm dlx prisma db update
```

seed the database

```bash
pnpm dlx tsx seed.ts
```

run the app

```bash
pnpm dev
```

## Stack used

- NextJs App Router
- nextAuth
- tailwindCSS
- neon database
- upstash redis
- qstash
- prisma
- shadcn/ui
