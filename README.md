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
- Overview of key inventory metrics (total products, stock, sales, profit, low stock items, inventory value)
- Sales statistics with daily/weekly/monthly/yearly chart
- Top selling products leaderboard
- Total Profit dashboard stat
- Printable report view

### 3. Product Management
- Add, edit, and delete products
- Categorize products
- **Add Stock** — inline button to increment stock without editing the product
- **Bulk CSV Import** — upload a CSV file with product data for mass import
- **Low Stock Badges** — visual "Low" (yellow) and "Out" (red) indicators when stock ≤ 10 or 0
- Track stock levels (stock can reach 0 without deletion)
- Price management (buying and selling prices)
- Buying price visible only to admins
- Search, filtering, and pagination

### 4. Sales & Transactions
- Record sales with quantity selection and optional customer name
- Automatic stock decrement on sale
- Oversell protection (prevents selling more than available stock)
- **Invoice Preview** — receipt modal with print button after every sale
- **Profit & Loss** — profit column calculated per transaction
- Terminology: "New Sale" for recording, "Sale History" for viewing past transactions
- Sale history view with search and pagination
- Export transactions to CSV

### 5. Profit & Loss
- Automatic profit calculation per sale: `(selling_price - buying_price) * quantity`
- Profit column displayed in the Sale History table
- Total Profit stat on the dashboard
- Color-coded (green for positive, red for negative)

### 6. Sales Reports
- Daily, weekly, monthly, and yearly sales aggregation
- Visual chart on the dashboard
- Period selector for different granularity

### 7. User Management (Admin Only)
- Create user accounts via modal form
- Assign user roles (admin or staff)
- Edit user name, email, role, and account status
- Account statuses: active, inactive, suspended, deleted
- Soft deletes — deactivated users cannot log in but data is preserved
- Status filter dropdown (All / Active / Inactive / Suspended / Deleted)
- Admins cannot change their own role (prevents accidental lockout)

### 8. Profile Page
- View your name, email, and role
- **Edit Profile** — update your own name and email
- **Change Password** — update password with current password verification
- Logout button clears the JWT cookie and redirects to login

### 9. Categories Management
- Full CRUD: create, read, update, delete
- Input validation (name required, max length)
- Pagination and search filtering
- Categories linked to products

### 10. Audit Log (Admin Only)
- Tracks key actions: product deletion, stock addition, user status changes
- Paginated table with user, action, entity, details, and timestamp
- Searchable by user name, action, or entity

### 11. Dark / Light Theme
- Toggle between dark and light mode via a sun/moon button in the header
- Preference persisted to localStorage
- All components adapt via CSS custom properties
- Light mode uses softer shadows for a cleaner look

### 12. Seed System
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
- multer (file upload)
- csv-parse (CSV parsing)

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
│       └── App.css        # Global styles (dark/light themes)
├── server/                 # Backend Node.js application
│   ├── controllers/      # Route controllers
│   ├── services/         # Business logic with Prisma singleton
│   ├── routes/           # Express route definitions
│   ├── middleware/       # Auth and error handling
│   └── prisma/          # Schema and generated client
├── package.json           # Root workspace config
└── README.md
```

## Deployment

### Deploy to Vercel

1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set the **Root Directory** to `./` (monorepo root)
4. Add the following **Environment Variables** in Vercel:
   - `DATABASE_URL` — your TiDB connection string
   - `JWT_SECRET` — a random hex string
   - `FRONTEND_URL` — your Vercel deployment domain (e.g. `https://proventory.vercel.app`)
   - `NODE_ENV` — set to `production`
5. Deploy — Vercel will build the frontend and deploy the API as a serverless function
6. The frontend at `yourdomain.vercel.app` will call `/api/...` which routes to the serverless function
