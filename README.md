# Proventory - Inventory Management System

A web-based inventory management system built with React, Node.js, and MySQL.

## Features

### 1. User Authentication
- Secure login system with role-based access control
- Admin and staff user roles
- Input validation using formik and yup.
- Password hashing with bcrypt.
- JWT stored in an HTTP-only cookie for session.
- Logout clears the cookie.
- Prototype "forgot password" flow
  
![Login Page](./screenshots/login.png)

### 2. Dashboard
- Overview of key metrics
- Sales statistics and charts
- Top selling products leaderboard
  
![Dashboard](./screenshots/dashboard.png)

### 3. Product Management
- Add, edit, and delete products
- Input validation using formik and yup.
- Categorize products
- Track stock levels
- Price management (buying and selling prices)
- Pagination and filtering implemented
  
![Products Page](./screenshots/products.png)

### 4. Sales Management (Ongoing)
- Record sales transactions
- Track sales history
- Generate sales reports (daily, weekly, yearly)

<!-- ![Sales Page]() -->

### 5. User Management (Admin Only)
- Create and manage user accounts
- Input validation using formik and yup.
- Assign user roles
- Update user profiles
- Flagging users feature (ongoing)
  
![Users Page](./screenshots/users.png)

### 6. Profile Page
- Simple user profile view that displays the logged-in user's details (name, email, role).
- Includes a prominent "Logout" button which clears the HTTP-only JWT cookie and redirects to the login page.
  
![Profile Page](./screenshots/profile.png)

### 7. Categories Management
- Full CRUD for categories: create, read, update, delete.
- Validation on inputs (name required, max length).
- Categories list supports pagination and simple search/filtering.
- Used by Products to assign category IDs.
  
![Categories Page](./screenshots/categories.png)

### 8. Sales Entry & History
- Users can add a sale (select product, enter quantity, confirm sale).
- Backend reduces product stock automatically and records sale details.
- Sales history view with pagination, filters (by user, date range), and export-ready data.
- Sales reports (daily/weekly/monthly/yearly) available on Dashboard.
  
![Sales Page](./screenshots/sales.png)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/proventory.git
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up the database
```bash
# In the server directory
npx prisma generate
npx prisma db push
```

4. Create `.env` file in the server directory
```env
DATABASE_URL="mysql://username:password@localhost:3306/proventory"
```

5. Start the application
```bash
# Start backend (in server directory)
npm start

# Start frontend (in client directory)
npm run dev
```

## Technologies Used

- Frontend:
  - React
  - Zustand (State Management)
  - Chart.js
  - React Router

- Backend:
  - Node.js
  - Express
  - Prisma ORM
  - MySQL

## Project Structure

```
proventory/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── store/        # Zustand store
│   │   └── util/         # Utility functions
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── controllers/      # Route controllers
│   ├── services/        # Business logic
│   ├── prisma/         # Database schema and migrations
│   └── package.json
│
└── README.md
```