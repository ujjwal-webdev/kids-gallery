# Kid's Gallery 🎨

> An ecommerce platform for Kid's Gallery — Stationery, Gifts, Party Supplies & More (India)

## Tech Stack

| Layer | Technology |
|---|---|
| **Mobile App** | React Native (Expo) |
| **Website** | Next.js 14+ (App Router) + TypeScript + Tailwind CSS |
| **Admin Panel** | Next.js 14+ (App Router) + TypeScript + Tailwind CSS |
| **Backend API** | Node.js + Express + TypeScript |
| **Database** | PostgreSQL + Prisma ORM |
| **Cache** | Redis |
| **Image Storage** | Cloudinary |
| **Payments** | Razorpay |
| **Auth** | OTP-based (phone number login) |
| **Notifications** | Firebase Cloud Messaging (FCM) |

## Prerequisites

- **Node.js** 20+
- **npm** 10+
- **Docker** & **Docker Compose** (for local PostgreSQL + Redis)
- **Expo CLI** (for mobile development)

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/ujjwal-webdev/kids-gallery.git
cd kids-gallery
npm install
```

### 2. Start Database & Redis

```bash
docker-compose up -d
```

### 3. Configure Environment Variables

Copy and fill in the environment files for each app:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
cp apps/mobile/.env.example apps/mobile/.env
```

### 4. Set Up Database

```bash
npm run db:migrate
npm run db:seed
```

### 5. Run Applications

```bash
# All apps (requires Turbo)
npm run dev

# Individual apps
npm run dev:api       # http://localhost:4000
npm run dev:web       # http://localhost:3000
npm run dev:admin     # http://localhost:3001
npm run dev:mobile    # Expo DevTools
```

## Environment Variables

### API (`apps/api/.env`)

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/kids_gallery` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-key` |
| `JWT_EXPIRES_IN` | JWT expiry | `7d` |
| `PORT` | API server port | `4000` |
| `NODE_ENV` | Environment | `development` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | - |
| `RAZORPAY_KEY_ID` | Razorpay key ID | - |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret | - |
| `FCM_SERVER_KEY` | Firebase FCM server key | - |
| `OTP_EXPIRY_MINUTES` | OTP expiry in minutes | `10` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000,http://localhost:3001` |

### Web / Admin

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key |

## Project Structure

```
kids-gallery/
├── apps/
│   ├── api/          # Node.js + Express backend
│   ├── web/          # Next.js customer website
│   ├── admin/        # Next.js admin panel
│   └── mobile/       # React Native (Expo) app
├── packages/
│   └── shared/       # Shared types, constants, utils
├── docker-compose.yml
└── turbo.json
```

## API Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/send-otp` | Send OTP to phone |
| POST | `/api/auth/verify-otp` | Verify OTP & login |
| GET | `/api/products` | List products |
| GET | `/api/products/:slug` | Get product detail |
| GET | `/api/categories` | List categories |
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart/items` | Add to cart |
| GET | `/api/orders` | List user orders |
| POST | `/api/orders` | Create order |
| POST | `/api/payments/create` | Create Razorpay order |
| POST | `/api/payments/verify` | Verify payment |
| GET | `/api/admin/dashboard` | Admin dashboard stats |
| GET | `/api/admin/products` | Admin product list |
| GET | `/api/admin/orders` | Admin order list |

## Database Setup

```bash
# Run migrations
cd apps/api
npx prisma migrate dev

# Open Prisma Studio
npx prisma studio

# Seed database
npx ts-node prisma/seed.ts
```

## Features

- Full ecommerce flow (browse → cart → checkout → order tracking)
- Mobile app with Expo Router
- Razorpay payment integration (UPI, Cards, Net Banking, COD)
- OTP-based phone authentication
- PIN code delivery serviceability check
- GST support (HSN codes, CGST/SGST)
- Coupon/discount system
- Product reviews & ratings
- Push notifications (FCM)
- Cloudinary image management
- Admin dashboard with analytics
