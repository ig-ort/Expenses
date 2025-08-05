# Expenses
A fullstack expense tracker built with Next.js, Laravel, and MySQL. Features authentication, filtering, and monthly summaries. Created for portfolio and learning purposes.

# 💸 Personal Expense Tracker

A fullstack web application that allows users to record, categorize, and view their personal expenses. This project was built as part of my professional portfolio using modern technologies such as Next.js, Laravel, and MySQL.

---

## 🧑‍💻 Technologies Used

- **Frontend:** Next.js + TypeScript
- **Backend:** Laravel 11 + Sanctum (REST API)
- **Database:** MySQL
- **Authentication:** Token-based using Laravel Sanctum
- **Local deployment:** Docker Compose (optional)

---

## 🚀 Key Features

- User registration and login
- Expense management with:
  - Amount
  - Category
  - Payment method
  - Date
  - Optional description
- Expense filtering by date, category, and payment method
- Monthly summary dashboard
- Secured REST API

---

## 🛠️ Getting Started

### Requirements

- Node.js >= 18
- PHP >= 8.2
- Composer
- MySQL or Docker
- Laravel CLI and pnpm (optional)

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

### Step 2: Backend setup (Laravel)

cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve


``` Make sure to update .env with your local database credentials. ```

Step 3: Frontend setup (Next.js)

cd frontend
cp .env.local.example .env.local
pnpm install
pnpm dev

``` Set NEXT_PUBLIC_API_URL in .env.local to your Laravel API base URL (e.g. http://localhost:8000). ```

📁 Project Structure

/expense-tracker
│
├── /frontend      → Next.js frontend
├── /backend       → Laravel API
└── /docs          → Additional documentation (if any)

📜 License
MIT License. You are free to use this project for learning or as part of your own portfolio.



