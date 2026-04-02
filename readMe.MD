# 🛍️ MyShop – Full Stack E-Commerce Platform

MyShop is a production-ready full-stack e-commerce platform built with a modern MERN-inspired stack. It demonstrates real-world architecture, secure stock handling, and role-based admin management.

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js (App Router) |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT Authentication |

## 🌐 Live Demo

- **Frontend:** https://e-commerce-assignment-tau.vercel.app
- **Backend API:** https://my-shop-e-commerce.vercel.app

---

## Admin Info

- **Admin Email:** admin@example.com
- **Admin Password:** 12345678

## 🚀 Features

### 👤 User System
- Register & Login with JWT Authentication
- Protected routes and role-based access (User / Admin)

### 🛒 Products
- Browse all products with dynamic routing (Next.js App Router)
- View product details with real-time stock info

### 📦 Orders
- Place orders with quantity and phone number
- Atomic stock reduction to prevent overselling
- View personal order history

### 🧑‍💼 Admin Dashboard
- Add, update, and delete products
- Manage stock levels
- View and monitor all orders
- Secure admin-only API endpoints

---

## 📊 Application Flow

- User registers or logs in.
- User browses products.
- User places order.
- Backend validates stock and reduces it atomically.
- Order is stored.
- User views order history.
- Admin manages products and orders.




This guarantees:
- ✅ No negative stock
- ✅ No double selling
- ✅ Safe concurrent ordering

---

## 🏗️ Architecture

```
Client (Next.js)
      ↓
Axios API Calls (JWT Header)
      ↓
Express Server (Auth Middleware)
      ↓
Controllers
      ↓
MongoDB (Mongoose Models)
```




---

## 🔗 API Reference


### login 

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/login` | Login User |
| POST | `/api/user/register` | Register a new user |
| POST | `/api/admin/login` | Admin: login admin |


### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/products/add` | Place an order |
| GET | `/api/products/all` | Get all Product orders |
| GET | `/api/products/latest-product` | get latest products |
| GET | `/api/products/:id` | get single products |
| POST | `/api/products/update/:id` | Admin : update products |
| POST | `/api/poducts/delete/:id` | Admin : delete products |



###  Admin Manage Product

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/products` | Admin : get all products |
| PUT | `/api/admin/products/:id` | Admin : Update Products |
| DELETE | `/api/admin/products/:id` | Admin : delete Products |



### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/add/:id` | delee an order |
| GET | `/api/orders/myorders` | get all order by users |

###  Admin Manage Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/orders` | Admin : get all Orders |
| GET | `/api/admin/dashboard` | Admin : get dashboard Data |

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
https://github.com/MdAjharulIslam/E-commerce-Assignment.git
```


### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=a port number like 3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="12345678"
IMAGEKIT_PUBLIC_KEY='your imagekit public key'
IMAGEKIT_PRIVATE_KEY='your imagekit private key'
IMAGEKIT_URI_ENDPOINT='your imagekitendpoint'
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=https://e-commerce-assignment-1-v323.onrender.com
```

Start the frontend:

```bash
npm run dev
```

---

## 🌍 Deployment

### Backend → [Render](https://render.com)
1. Push backend to GitHub and connect to Render
2. Deploy — your API will be live at `https://e-commerce-assignment-1-v323.onrender.com`



### Frontend → [Vercel](https://vercel.com)
1. Push frontend to GitHub and import on Vercel
2. Add environment variable: `NEXT_PUBLIC_BACKEND_URL=https://e-commerce-assignment-1-v323.onrender.com`
3. Deploy — your app will be live at `https://e-commerce-assignment-tau.vercel.app`

---

## 🛡️ Security

- JWT-based authentication on all protected routes
- Role-based authorization (user vs. admin)
- Middleware validation on all API inputs
- Atomic stock updates to prevent race conditions
- Secrets managed via environment variables

---


<!-- ##  AI tools used 

- ChatGpt
- Cloude
- PerPlexity


## AI prompt log
- In most of  Prompts i provide the my won write code

## Backend Development Prompts


- with provide code : Optimize this Express controller for better readability and performance.
- with probide code : Reduce duplicate logic and improve maintainability.
- Optimize and make secqure  JWT authentication middleware.
- Improve stock update logic for concurrency safety.
- why the mongodb connection request are faild but i provide the connection string 
- Implement atomic stock update logic in this product controllers.
- Add stock validation before placing order
- why the password is not hashed but i use bcrypt
- Improve security headers and CORS configuration

## Frontend Development Prompts

- Improve this Next component to avoid unnecessary re-renders
- Optimize this  axios request handling
- make the design more simple and actractive and professional and looking good
- why the token is undefined here but backend send token
- make a footer fot my myshop app with proper functionality
- why globle axios backend link declearation is not work in my next.js app , what can be possible causes for this error
- make the user login page with admin login page accessable
- why Prevent unauthorized access in my  Next.js app
- Design an admin dashboard structure in Next.js for an E-commerce app
- Add loading states and toast notifications
- Make the booking page clean and minimal.
- make a proper newsLetter box for myShop App
- Improve form validation and error feedback handling -->





