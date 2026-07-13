# FitProERP

FitProERP is a multi-tenant SaaS Gym Management ERP designed to streamline gym operations through a centralized platform. It enables gym owners to efficiently manage branches, trainers, members, subscriptions, attendance, payments, salaries, expenses, revenue, and analytics while maintaining secure tenant isolation.

---

# Features

## Super Admin
- Manage gym subscriptions
- Manage gyms
- Monitor subscription payments
- View platform analytics
- Manage subscription plans

## Gym Admin
- Dashboard with business insights
- Multi-branch management
- Trainer management
- Member management
- Package management
- Revenue and expense tracking
- Profit analytics
- Salary generation
- Leave management
- Gym profile management
- Subscription management

## Trainer
- Dashboard
- Member Management
- Session Management
- Slot Management
- Leave Management
- Salary Management
- Profile Management
- Real-time Chat with Members

## Member
- Dashboard
- Purchase Membership Packages
- View Workout Plans
- View Diet Plans
- Track BMI & Fitness Progress
- Trainer Session Booking
- Payment History
- Profile Management
- Real-time Chat with Trainer

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Ant Design
- React Router DOM
- Redux Toolkit
- TanStack Query
- React Hook Form
- Zod
- Axios
- Framer Motion

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Redis
- JWT
- Multer
- Cloudinary
- Stripe
- Nodemailer
- Socket.IO

### DevOps

- Docker
- Docker Compose
- GitHub Actions
- AWS EC2
- AWS Amplify
- AWS Route 53
- Nginx

---

# Architecture

The backend follows **Clean Architecture** to ensure scalability, maintainability, and separation of concerns.

Layers include:

- Presentation Layer
- Application Layer
- Domain Layer
- Infrastructure Layer

Design principles:

- SOLID Principles
- Dependency Injection
- Use Case Pattern
- DTO Pattern

---

# Authentication & Authorization

- JWT Authentication
- Refresh Token mechanism
- Role-Based Access Control (RBAC)
- Multi-Tenant Authorization
- Redis-based OTP verification
- Redis session management

Supported Roles

- Super Admin
- Gym Admin
- Trainer
- Member

---

# Multi-Tenant Architecture

FitProERP uses a subdomain-based multi-tenant architecture.

Example:

```
https://fitproerp.services
```

Super Admin

```
https://energy.fitproerp.services
```

Gym Admin

Each gym operates under its own isolated tenant while sharing the same infrastructure.

---

# Core Modules

- Authentication & Authorization
- Branch Management
- Trainer Management
- Member Management
- Lead Management
- Package Management
- Subscription Management
- Revenue Management
- Expense Management
- Profit Analytics
- Attendance Management
- Salary Management
- Leave Management
- Session & Slot Management
- Payment Management

# Advanced Features

- AI-Based Workout Plan Generation
- AI-Based Diet Plan Generation
- Notification Management
- Real-time Trainer–Member Chat
- Monthly Revenue & Expense Report Generation
- Audit Logs
- Multi-Tenant SaaS Architecture
- Role-Based Access Control (RBAC)

---

# Third-Party Integrations

- Stripe Payment Gateway
- Cloudinary Image Storage
- Redis
- AWS

---

# Development Standards

The project follows:

- Clean Architecture
- SOLID Principles
- RESTful API Design
- TypeScript Best Practices
- ESLint
- Prettier
- Modular Folder Structure
- Environment-based Configuration

---

## Deployment

### Frontend

- AWS Amplify
- AWS Route 53

### Backend

- AWS EC2
- Nginx Reverse Proxy
- PM2 Process Manager

### Database

- MongoDB Atlas

### Cache

- Redis

### File Storage

- Cloudinary

### Payments

- Stripe

### Domain

https://fitproerp.services

---

# DevOps

Deployment pipeline includes:

- Docker
- Docker Compose
- GitHub Actions
- CI/CD Pipeline
- Automatic deployment to AWS EC2

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/Muhammed-navas-MT/fitProERP.git
```

## Install Dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

---

## Environment Variables

### Backend

| Category | Variables |
|----------|-----------|
| Server | PORT, NODE_ENV |
| Database | MONGODB_URI |
| Authentication | JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY |
| Redis | REDIS_URL |
| Email | GOOGLE_EMAIL, GOOGLE_APP_PASSWORD |
| Cloudinary | CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET |
| Payments | STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET |
| AI Services | GPT_API_KEY, GROQ_API_KEY |
| External APIs | EXCHANGE_RATE_API_KEY |
| Client | CLIENT_DOMAIN, CLIENT_PROTOCOL, CLIENT_PORT |
| Security | ALLOWED_ORIGIN, ALLOWED_DOMAIN |
| Cookies | MAX_AGE |

### Frontend

| Variable |
|----------|
| VITE_API_BASE_URL |
| VITE_STRIPE_PUBLISHABLE_KEY |

---

## Run Application

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

# Project Structure

```
backend/
 ├── application
 ├── domain
 ├── infrastructure
 ├── presentation
 └── config

frontend/
 ├── components
 ├── pages
 ├── routes
 ├── hooks
 ├── services
 ├── store
 └── utils
```

---

# Security

- JWT Authentication
- Refresh Token Rotation
- Password Hashing
- Redis OTP Expiration
- Tenant Isolation
- Role-Based Authorization
- Protected Routes
- Input Validation using Zod
- Secure File Upload
- CORS Protection

---

# Future Improvements

- Mobile Application
- Advanced Reporting
- Multi-language Support
