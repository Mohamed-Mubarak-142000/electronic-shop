# Frontend Documentation (English Version)

This file contains the full frontend documentation for the electrical tools e-commerce project.

---

## 1. Overview
The frontend is built with **React, Vite, Shadcn UI, Radix UI, React Router DOM, React Query, Zustand**, and other modern libraries.

It provides:
- Admin dashboard (analytics, CRUD)
- Customer shop
- Wishlist & cart management
- Real-time chat
- Notifications
- Multi-language support (i18n)
- Dark/Light mode
- Mapbox store location
- EmailJS contact forms
- Reusable components & clean architecture

---

## 2. Folder Structure
```
frontend/
├── src/
│   ├── api/          # API calls & axios config
│   ├── components/   # Reusable UI components
│   ├── features/     # Domain-specific features
│   ├── hooks/        # Custom React hooks
│   ├── layouts/      # Layout components (AdminLayout, MainLayout)
│   ├── pages/        # React pages
│   ├── store/        # Zustand/Jotai state management
│   ├── utils/        # Helpers & utils
│   ├── routers/      # React Router config
│   ├── styles/       # Tailwind + custom styles
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

---

## 3. Key Features
### Home Page
- Carousel with latest products (Swiper.js)
- Category sliders (6 products, auto-play)
- Latest 3 products per category (paginated)
- Map showing store location (Mapbox)
- Brands section
- Footer with links and contact form (EmailJS)

### Product Details
- Full-width image carousel
- Product information panel
- Reviews with pagination
- Related products (based on brand & category)
- Chat button (Messenger-style popup)

### User Functionality
- Login, register, OTP verification
- Wishlist & cart management (login required)
- Order tracking & cancellation

### Admin Dashboard
- Product, category, brand CRUD pages
- Users list (activate/deactivate, edit, delete)
- Orders list (change status)
- Charts & analytics
- Chat with users
- Settings (language, dark/light mode)
- Notifications (new product/order/messages)

---

## 4. State Management
- **Zustand** for global state
- **React Query** for async data fetching & caching
- **React Hook Form + Zod** for validation

---

## 5. Routing
- Public pages: Home, All Products, Product Details, Portfolio, Contact Us
- Private pages: Cart, Wishlist, Order History, Admin Dashboard
- Route protection using authentication context

---

## 6. Styling
- **Shadcn UI** + **Radix UI** for components
- **Tailwind CSS** for responsive design
- Dark/Light mode support with toggle in settings

---

## 7. Testing
- React Testing Library for component tests
- Jest for unit testing
- End-to-end testing can be added with Cypress

---

## 8. Summary
The frontend is a modern, responsive, and maintainable React application supporting both admin and customer functionality, with reusable components and a focus on performance and UX.

