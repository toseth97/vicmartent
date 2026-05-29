# Vicmart Enterprises Limited - Official Website

A modern, secure, and responsive website for Vicmart Enterprises Limited built with **Next.js 16**, **TypeScript**, **MongoDB**, and **Tailwind CSS**.

## 🚀 Features

### Public Pages
- **Homepage** - Dynamic hero slider, services overview, stats counter, product highlights
- **About** - Company story, mission/vision/values, timeline milestones, Board of Directors (fed from backend)
- **Products** - Food, beverages, and non-food product categories with brand details
- **Distribution** - Nationwide distribution network, branch offices, capabilities
- **Manufacturing** - Manufacturing capabilities, certifications, process steps
- **CSR** - Corporate Social Responsibility pillars, CSR events from backend
- **Press** - News and events with category filtering and search
- **Careers** - Job vacancies from backend with department filtering and expandable details
- **Contact** - Inquiry form, branch offices, contact information

### Admin Dashboard
- **Authentication** - Secure login with account lockout (5 attempts → 30min lock)
- **Dashboard** - Overview stats, recent applications, recent inquiries, quick actions
- **Directors Management** - CRUD operations for board of directors
- **Events Management** - CRUD operations for news/press events with categories
- **Vacancies Management** - CRUD operations for job postings with dynamic requirements/responsibilities
- **Applications Viewer** - View job applications, update status (pending → hired)
- **Inquiries Management** - View, reply to, and manage contact form inquiries
- **Settings** - Site configuration: general, contact info, social media, hero section

### Security (OWASP Top 10)
- **Input Validation** - Zod schemas for all API inputs
- **XSS Prevention** - Input sanitization with HTML entity encoding
- **CSRF Protection** - NextAuth CSRF tokens
- **Authentication** - bcrypt password hashing (12 rounds), account lockout
- **Authorization** - Role-based access (superadmin, admin, editor)
- **Rate Limiting** - API rate limiting (100 req/15min per IP)
- **Security Headers** - X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, HSTS, Referrer-Policy, Permissions-Policy
- **SQL/NoSQL Injection Prevention** - Mongoose schema validation, parameterized queries
- **Secure Cookies** - HTTP-only, Secure flag in production, SameSite=Lax
- **JWT Sessions** - 8-hour session with 1-hour update cycle

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Full-stack React framework |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database & ODM |
| NextAuth.js v4 | Authentication |
| Tailwind CSS v3 | Styling |
| Framer Motion | Animations |
| React Icons | Icon library |
| Zod | Input validation |
| bcryptjs | Password hashing |

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (Atlas or local)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/toseth97/vicmartent.git
   cd vicmartent
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vicmart?retryWrites=true&w=majority
   NEXTAUTH_SECRET=your-very-long-random-secret-string-at-least-32-chars
   NEXTAUTH_URL=http://localhost:3000
   ADMIN_EMAIL=admin@vic.com
   ADMIN_PASSWORD=12345678
   ```

4. **Seed the database:**
   ```bash
   npx tsx src/seed/index.ts
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Access the application:**
   - Public site: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin/login
   - Default credentials: `admin@vic.com` / `12345678`

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing pages
│   │   ├── page.tsx       # Homepage
│   │   ├── about/         # About page
│   │   ├── products/      # Products page
│   │   ├── distribution/  # Distribution page
│   │   ├── manufacturing/ # Manufacturing page
│   │   ├── csr/           # CSR page
│   │   ├── press/         # Press/News page
│   │   ├── careers/       # Careers page
│   │   └── contact/       # Contact page
│   ├── (admin)/           # Admin dashboard pages
│   │   ├── layout.tsx     # Admin layout with sidebar
│   │   └── admin/
│   │       ├── login/     # Login page
│   │       ├── dashboard/ # Dashboard overview
│   │       ├── directors/ # Directors management
│   │       ├── events/    # Events management
│   │       ├── vacancies/ # Vacancies management
│   │       ├── applications/ # Applications viewer
│   │       ├── inquiries/ # Inquiries management
│   │       └── settings/  # Site settings
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth
│   │   ├── admins/        # Admin management
│   │   ├── directors/     # Directors CRUD
│   │   ├── events/        # Events CRUD
│   │   ├── vacancies/     # Vacancies CRUD
│   │   ├── applications/  # Applications CRUD
│   │   ├── inquiries/     # Inquiries CRUD
│   │   ├── settings/      # Settings CRUD
│   │   └── stats/         # Dashboard stats
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── globals.css        # Global styles
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx # Site navigation
│   │   └── Footer.tsx     # Site footer
│   ├── SessionProvider.tsx # NextAuth provider
│   └── CookieConsent.tsx  # Cookie consent banner
├── lib/
│   ├── mongodb.ts         # MongoDB connection
│   ├── security.ts        # Security utilities
│   └── hooks.ts           # Custom React hooks
├── models/                # Mongoose models
│   ├── Admin.ts
│   ├── Director.ts
│   ├── Event.ts
│   ├── Vacancy.ts
│   ├── Application.ts
│   ├── Inquiry.ts
│   └── Settings.ts
├── validators/
│   └── schemas.ts         # Zod validation schemas
├── seed/
│   └── index.ts           # Database seeder
└── types/
    └── next-auth.d.ts     # NextAuth type extensions
```

## 🔐 Security Configuration

### Admin Account Lockout
- 5 failed login attempts triggers a 30-minute account lock
- Lock status stored in MongoDB with automatic expiry
- Failed attempt counter resets on successful login

### Rate Limiting
- API routes: 100 requests per 15 minutes per IP
- Configurable via environment variables
- Returns 429 status with Retry-After header

### Content Security Policy
Configured via security headers to prevent XSS, clickjacking, and data injection attacks.

## 📝 License

Proprietary - Vicmart Enterprises Limited

## 👨‍💻 Development

Built with ❤️ for Vicmart Enterprises Limited
