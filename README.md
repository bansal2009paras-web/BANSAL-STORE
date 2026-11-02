BANSAL STORE — MERN E-Commerce Website

A modern, responsive, full-stack e-commerce web application built using the MERN stack.

Live Website: https://bansal-store.vercel.app/

Backend API: https://bansal-store.onrender.com/

GitHub Repository: https://github.com/bansal2009paras-web/BANSAL-STORE

---

About the Project

BANSAL STORE is a full-stack online shopping platform where users can browse products, create accounts, log in securely, manage their shopping carts, place orders and view their order history.

The project demonstrates the integration of frontend development, REST API development, database management and authentication.

Features

User Features

- User registration and login
- JWT-based authentication
- Browse available products
- Search products
- Filter products by category
- Add products to shopping cart
- Increase or decrease product quantities
- Automatic cart total calculation
- Checkout with delivery information
- Place orders
- View order history

Backend Features

- RESTful API architecture
- MongoDB database integration
- Password hashing using bcrypt
- JWT authentication middleware
- Product and order management
- Protected order routes
- Stock management

Technology Stack

Technology| Purpose
React.js| Frontend
CSS| Styling and responsive design
Node.js| Backend runtime
Express.js| REST API
MongoDB Atlas| Database
Mongoose| Database modelling
JWT| Authentication
bcryptjs| Password hashing
Axios| API requests
Git & GitHub| Version control
Vercel| Frontend deployment
Render| Backend deployment

Project Structure

BANSAL-STORE/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── .gitignore
└── README.md

Installation and Setup

1. Clone the repository

git clone https://github.com/bansal2009paras-web/BANSAL-STORE.git

2. Install backend dependencies

cd BANSAL-STORE/server
npm install

3. Configure environment variables

Create a ".env" file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Start the backend

npm run dev

5. Install frontend dependencies

Open another terminal:

cd BANSAL-STORE/client
npm install

6. Start the frontend

npm run dev

Open the local Vite URL shown in your terminal.

Database Models

The application uses MongoDB with Mongoose models:

- User: Stores user account information and hashed passwords.
- Product: Stores product details, prices, categories and stock.
- Order: Stores customer orders, purchased items, delivery information and order status.

Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

Learning Outcomes

Through this project, I gained practical experience in:

- Full-stack web development using MERN.
- Building REST APIs with Express.js.
- Connecting React with a backend.
- Implementing JWT authentication.
- Managing data using MongoDB.
- Handling shopping cart and checkout workflows.
- Deploying a full-stack application.

Author

Paras Bansal

B.Tech CSE Student

GitHub: https://github.com/bansal2009paras-web

---

Developed as part of the DevCamp 2.0 project assignment.
