# 🛒 ShopEase – Full-Stack E-Commerce Platform

A full-featured eCommerce web app built using the **MERN stack**, supporting secure authentication, product management, cart and order lifecycle, address storage, and PayPal-based online payments.

---

## 🚀 Live Preview & Walkthrough

🎥 **[Watch ShopEase Demo](https://drive.google.com/file/d/1BSjP5ELwWF6-dX93sF8uBy9KuFIVckM_/view?usp=sharing)**.
 
🔗 [Github Repo](https://github.com/Hardyx07/E-Commerce-_FollowAlong)  


---

## ⚙️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Redux Toolkit  
- **Backend**: Node.js, Express.js, JWT, Multer  
- **Database**: MongoDB, Mongoose  
- **Auth**: JWT via HTTP-only cookies + bcrypt  
- **Payment**: PayPal SDK (react-paypal-js)  
- **Deployment**: Render (Backend), Netlify (Frontend)

---

## ✨ Key Features

- 🔐 User Authentication with JWT (cookies + middleware)
- 📦 Product CRUD: Add, Edit, Delete, Fetch
- 🛍️ Smart Cart: Persistent (Redux + DB) with quantity control
- 📬 Address Management with user profile support
- 💳 Secure Checkout: PayPal and Cash on Delivery
- 📦 Full Order Flow: Place, Track, Cancel
- 🔐 Route Protection on both frontend & backend
- 📱 Responsive UI with global Redux state

---

## 📈 Milestone Progress

<details>
  <summary>Click to view 35 structured milestones</summary>

- ✅ Set up MERN stack + Tailwind + Redux + Vite  
- ✅ Built login/signup flow with validation, bcrypt, JWT  
- ✅ Created REST APIs for users, products, orders, cart  
- ✅ Integrated Multer for multi-image product uploads  
- ✅ Protected routes using middleware + cookie validation  
- ✅ Created cart schema and quantity adjustment logic  
- ✅ Developed address form + profile page integration  
- ✅ Built complete order placement, cancellation, and tracking  
- ✅ Integrated PayPal using react-paypal-js  
- ✅ Used Redux for global email state (store + actions)  
- ✅ Deployed frontend (Netlify) and backend (Render)

📦 Covers modular architecture, DB design, error handling, CI/CD deployment

</details>

---

## 📚 Getting Started

```bash
# Clone the repos
git clone https://github.com/Hardyx07/E-Commerce-_FollowAlong


# Install dependencies
cd frontend && npm install
cd backend && npm install

# Setup environment variables (.env)
# MONGO_URI, JWT_SECRET, PAYPAL_CLIENT_ID, etc.

# Run backend
npm run dev

# Run frontend
npm run dev
