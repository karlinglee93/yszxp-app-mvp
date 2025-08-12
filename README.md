# Personal Finance Management App

A **Personal Finance Management Application** built with **React**, **Next.js**, **TypeScript**, **PostgreSQL**, **Vercel**, and the **Gemini API**.  
This app allows users to record transactions, manage categories, and visualise spending through **real-time charts**. It supports **multi-currency bookkeeping**, **recurring entries**, and **AI-powered bill analysis**.

[Live Demo (Vercel Project)](https://yszxp-app-mvp.vercel.app)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Example Usage](#example-usage)
- [Roadmap](#roadmap)
- [License](#license)

## Features

- **Transaction Recording**: Add, edit, and delete financial transactions with ease.
- **Category Management**: Create and manage custom categories for better organisation.
- **Multi-Currency Support**: Record transactions in different currencies with automatic conversion.
- **Recurring Entries**: Automate recurring expenses or income tracking.
- **AI-Powered Bill Analysis**: Use Gemini API to automatically analyse and categorise bills.
- **Real-Time Charts**: Visualise spending patterns and trends instantly.

## Tech Stack

| Layer      | Technology |
|-----------|------------|
| Frontend  | React, Next.js, TypeScript |
| Backend   | Next.js API Routes, Node.js |
| Database  | PostgreSQL |
| AI/LLM    | Gemini API |
| Deploy    | Vercel |

## Demo

**Live Demo:** [Open Vercel project](https://yszxp-app-mvp.vercel.app)  
**Animated Preview:**

![Demo GIF](public/demo.gif)

## Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/karlinglee93/yszxp-app-mvp.git
cd yszxp-app-mvp
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# AI API
GEMINI_API_KEY=your_gemini_api_key
```

> ⚠ **Security Tip:** Never commit your actual API keys or database credentials to GitHub.

### 4) Run the development server

```bash
npm run dev
```

Open your browser at `http://localhost:3000`.

## Example Usage

1. Add a transaction:
   - Amount: `100`
   - Currency: `USD`
   - Category: `Groceries`
   - Recurring: `Monthly`
2. The app will:
   - Save the transaction in the database
   - Automatically convert currency if needed
   - Update charts in real time
   - Analyse bill content with Gemini API (if applicable)

## Roadmap

- [ ] Add authentication for multiple users
- [ ] Export reports to CSV/PDF
- [ ] Advanced budget planning tools
- [ ] Mobile-friendly optimisations

## License

This project is open source. See the [LICENSE](LICENSE) file for details.
