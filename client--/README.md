
# BANSAL STORE 🛍️
### Full-Stack MERN E-Commerce Application

BANSAL STORE is a full-stack e-commerce web application built using the MERN stack. It provides users with a simple and responsive online shopping experience, including product browsing, user authentication, shopping cart management, checkout, and order tracking.

## 🚀 Features

### User Features
- User Registration and Login
- Secure Password Hashing
- JWT-Based Authentication
- Browse Available Products
- Search Products
- Filter Products by Category
- Add Products to Shopping Cart
- Increase or Decrease Product Quantity
- Remove Products from Cart
- Calculate Cart Total
- Checkout with Delivery Information
- Place Orders
- View Order History
- Track Order Status

### Admin / Backend Features
- RESTful API Architecture
- MongoDB Database Integration
- User, Product and Order Models
- Protected Order Routes
- Stock Availability Validation
- Order Persistence
- Error Handling

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| Vite | Frontend Development |
| Node.js | Backend Runtime |
| Express.js | Backend Framework |
| MongoDB Atlas | Database |
| Mongoose | Database Modeling |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Axios | API Requests |
| CSS | Styling |

## 📁 Project Structure

```text
my-ecommerce/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── checkout.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd my-ecommerce
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Never upload your actual `.env` file or database credentials to GitHub.

### 4. Start Backend Server

```bash
npm run dev
```

Backend runs at:

http://localhost:5000

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

### 6. Start Frontend

```bash
npm run dev
```

Frontend runs at:

http://localhost:5173

## 🔗 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login a user |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Add a product |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders/myorders` | Get logged-in user's orders |

## 🔐 Security

- Passwords are hashed using bcryptjs.
- JWT tokens are used for authentication.
- Protected routes verify user identity.
- Environment variables store sensitive configuration.
- Order creation checks product availability and stock.

## 🎯 Project Objective

The objective of BANSAL STORE is to develop a functional full-stack e-commerce platform while applying practical concepts of frontend development, backend programming, database management, REST APIs, and authentication.

## 👨‍💻 Author

**Paras Bansal**

B.Tech Computer Science and Engineering

## 📌 Project Information

- Project Name: BANSAL STORE
- Project Type: Full-Stack Web Development
- Stack: MERN
- Program: DevCamp 2.0

---

⭐ If you find this project interesting, feel free to explore the repository!
