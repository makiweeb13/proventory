# Proventory - Inventory Management System

A web-based inventory management system built with React, Node.js, and TiDB (MySQL-compatible).

## Features

### 1. User Authentication
- Secure login system with role-based access control (admin and staff)
- Input validation using Formik and Yup
- Password hashing with bcrypt
- JWT stored in an HTTP-only cookie
- Forgot password flow
- Demo credentials always visible on login for testing

### 2. Dashboard
- Overview of key inventory metrics (total products, stock, sales, low stock items, inventory value)
- Sales statistics with daily/weekly/monthly/yearly chart
- Top selling products leaderboard
- Printable report view

### 3. Product Management
- Add, edit, and delete products
- Categorize products
- Track stock levels (stock can reach 0 without deletion)
- Price management (buying and selling prices)
- Buying price visible only to admins
- Search, filtering, and pagination

### 4. Sales Management
- Record sales transactions with quantity selection
- Automatic stock decrement on sale
- Oversell protection (prevents selling more than available stock)
- Out-of-stock products clearly indicated
- Sales history view with search and pagination
- Export transactions to CSV

### 5. Sales Reports
- Daily, weekly, monthly, and yearly sales aggregation
- Visual chart on the dashboard
- Period selector for different granularity

### 6. User Management (Admin Only)
- Create user accounts via modal form
- Assign user roles (admin or staff)
- Edit user name, email, role, and account status
- Account statuses: active, inactive, suspended, deleted
- Soft deletes — deactivated users cannot log in but data is preserved
- Status filter dropdown (All / Active / Inactive / Suspended / Deleted)
- Admins cannot change their own role (prevents accidental lockout)

### 7. Categories Management
- Full CRUD: create, read, update, delete
- Input validation (name required, max length)
- Pagination and search filtering
- Categories linked to products

### 8. Profile Page
- Displays logged-in user's details (name, email, role, account status)
- Logout button clears the JWT cookie and redirects to login

### 9. Seed System
- Idempotent seed route creates sample data: admin user, staff user, categories, products, and sales
- Auto-detects authentication — if no admin exists, seed is accessible without auth
- Seed passwords pass all validation rules

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/proventory.git
cd proventory
```

2. Install dependencies (single root install via npm workspaces)
```bash
npm install
```

3. Set up the database
```bash
cd server
npx prisma generate
npx prisma db push
```

4. Create `.env` file in the `server/` directory
```env
DATABASE_URL="mysql://user:password@host:4000/proventory?sslaccept=strict&foreign_key_checks=1"
JWT_SECRET="your-secret-key"
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

5. Start the application (runs both API and client)
```bash
cd ..
npm run dev
```

The API runs on port 5000 and the client on port 5173 with a Vite proxy forwarding `/api` requests to the backend.

## Seed Data

To populate the database with sample data, send a POST request to `/api/seed`:

```bash
curl -X POST http://localhost:5000/api/seed
```

Credentials:
- Admin: `admin@proventory.com` / `abcDEF123#`
- Staff: `staff@proventory.com` / `abcDEF123#`

## Technologies Used

### Frontend
- React 19
- Zustand (state management)
- Chart.js + react-chartjs-2
- React Router DOM
- Formik + Yup (form validation)

### Backend
- Node.js + Express
- Prisma ORM
- TiDB (MySQL-compatible cloud database)
- bcryptjs
- JSON Web Tokens

### Infrastructure
- npm workspaces (monorepo)
- Vite (build tool)
- Vercel-ready deployment

## Project Structure

```
proventory/
├── api/                    # Vercel serverless entry point
│   └── index.js           # Mounts all routes at /api
├── client/                 # Frontend React application
│   └── src/
│       ├── components/    # React components
│       ├── store/         # Zustand store
│       ├── schemas/       # Yup validation schemas
│       └── App.css        # Global styles (dark theme)
├── server/                 # Backend Node.js application
│   ├── controllers/      # Route controllers
│   ├── services/         # Business logic with Prisma singleton
│   ├── routes/           # Express route definitions
│   ├── middleware/       # Auth and error handling
│   └── prisma/          # Schema and generated client
├── package.json           # Root workspace config
└── README.md
```
