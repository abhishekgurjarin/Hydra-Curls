# Full Stack AI Developer Assessment: Hydra Curls

This repository contains the complete implementation for the Full Stack AI Developer Assessment. The project is split into three main parts:
1. **Assignment 1:** Figma to Responsive React Page
2. **Assignment 2 (Frontend):** React + Tailwind E-Commerce UI
3. **Assignment 2 (Backend):** FastAPI + SQLite E-Commerce API with AI Agent

## Live Links

- **Frontend Application (Vercel):** [https://hydra-curls-gscw.vercel.app](https://hydra-curls-gscw.vercel.app)
- **Backend API (Render):** [https://hydra-curls.onrender.com](https://hydra-curls.onrender.com)
- **Interactive API Documentation:** [https://hydra-curls.onrender.com/docs](https://hydra-curls.onrender.com/docs)

---

## 🏗️ System Design & Architecture

The application follows a decoupled client-server architecture:

### 1. Frontend Architecture
- **Tech Stack:** React, Vite, TypeScript, Tailwind CSS, React Router.
- **State Management:** React Context (`AuthContext`, `CartContext`) for lightweight, global state management without the boilerplate of Redux.
- **Design System:** Utility-first CSS via Tailwind. Fully responsive grid layouts ranging from mobile to ultra-wide desktop.
- **Security:** JWT Tokens are stored securely in `localStorage` and automatically attached to API requests using an Axios interceptor (`lib/api.ts`).
- **Routing:** Client-side routing with protected routes. Non-authenticated users are redirected from checkout/admin pages.

### 2. Backend Architecture
- **Tech Stack:** FastAPI, Python, SQLAlchemy (async), SQLite (ephemeral on Render).
- **Database Schema:** 
  - `User`: Handles authentication (hashed passwords) and roles (`is_admin`).
  - `Product`: Stores product catalog.
  - `CartItem`: Stores persistent user carts.
  - `Order` & `OrderItem`: Tracks completed checkouts.
- **Authentication:** OAuth2 with Password Flow (Bearer JWT tokens). Passwords are cryptographically hashed using `passlib` and `bcrypt`.
- **AI Agent Integration:** Uses OpenRouter API connected to an LLM to provide smart product recommendations. Prompts are heavily structured using LangChain-style template injection to ensure the agent outputs parsable JSON matching the frontend types.

### 3. API Integrations
- **Stripe (Mocked):** The `/api/v1/orders/checkout` endpoint handles calculating totals and is designed to create a Stripe Checkout Session. Due to mock keys, it bypasses actual payment and redirects to the success page.
- **OpenRouter (AI):** The `/api/v1/agent/suggest` POST endpoint acts as a proxy for the LLM. It injects the user's hair query into a strict prompt template, calls the model, parses the output, and returns it to the React Chat Widget.

---

## 🚀 Running the Project Locally

To test this project on your local machine, follow these steps:

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd assignment-2-backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure Environment Variables:
   Create a `.env` file in the backend directory based on the `.env.example` (ensure you have an OpenRouter API key).
5. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
   *The API will be available at `http://localhost:8000`.*

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd assignment-2-frontend
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file and set the API URL to your local backend:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173` (or `5174`).*

---

## 🔑 Test Credentials
To test the admin dashboard and full checkout flow, use the following pre-seeded credentials:

**Admin User:**
- Email: `admin@hydracurls.com`
- Password: `admin123`

*(Login as admin to see the "Admin" button in the navigation bar, allowing you to add, edit, and delete products).*
