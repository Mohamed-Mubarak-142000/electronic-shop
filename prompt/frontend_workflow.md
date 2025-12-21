# Frontend Workflow Documentation

## مقدمة
هذا الملف يوضح الـ User Flows، Data Flows، Component responsibilities، وIntegration points مع الـ Backend. يستهدف فريق التطوير لبناء واجهات ثابتة، قابلة لإعادة الاستخدام، وسهلة الاختبار.

---

## 1. High-Level User Flows

### 1.1 زائر (Guest)
- يزور الصفحة الرئيسية `/`
- يتصفح الكاروسيل ويفتح منتجات
- يمكنه البحث، فرز، استعراض المنتجات
- عند محاولة إضافة للعربة أو wishlist، يطلب تسجيل الدخول (redirect to /auth/login)

### 1.2 مستخدم مسجل
- تسجيل الدخول/تفعيل عبر OTP
- إضافة منتجات للسلة/wishlist
- إتمام الطلبات (Checkout)
- فتح المحادثة مع الادمن
- استقبال إشعارات داخل التطبيق

### 1.3 ادمن
- تسجيل الدخول للوحة الادمن
- إنشاء/تعديل المنتجات، إدارة المستخدمين والطلبات
- فتح الشات مع المستخدمين والرد
- مشاهدة التحليلات والرسوم البيانية

---

## 2. Routing & Pages
- `/` — Home
- `/products` — All products
- `/products/:slug` — Details
- `/cart`, `/wishlist`
- `/auth/login`, `/auth/register`, `/auth/otp`
- `/account`, `/account/orders`
- `/admin/*` — Admin routes (protected)

---

## 3. Component Architecture
- **Page components**: مسؤولية ترتيب الـ layout و استدعاء البيانات
- **UI components**: Button, Input, Modal, ProductCard (بدون منطق)، Reusable
- **Feature components**: CartDrawer, ProductFilterSidebar (تحتوي state محلي أو react-query cache hooks)
- **Hooks**: useProducts, useAuth, useCart, useChat — تستخدم react-query للـ fetching/mutations

---

## 4. Data Fetching Strategy
- **React Query** كـ مصدر للحقيقة (cache)
- Queries:
  - `useProducts({ page, filters })` — paginated
  - `useProduct(id)` — single product
  - `useCart()` — GET cart (staleTime short)
  - `useWishlist()`
- Mutations:
  - addToCart, removeFromCart (optimistic updates)
  - addToWishlist (optimistic)

---

## 5. Caching & Invalidation
- After adding product to cart: invalidate `cart` query + update cart cache
- After creating product (admin): invalidate `products` queries
- After order placed: invalidate `orders` and `cart`
- Use `onSuccess` to show toast

---

## 6. Auth Flow (Frontend)
- Login -> receive accessToken & refreshToken
- Store accessToken in memory and refresh in http interceptors (axios)
- Persist minimal auth state in secure cookie or localStorage (accessToken short-lived)
- Protect admin routes via `requireAdmin` HOC that checks user role

---

## 7. Chat Flow (Frontend)
- Open chat popup -> connect socket with token
- `socket.emit('join', { userId, roomId })`
- `socket.on('message', ...)` -> append message to local state + persist via REST
- Typing indicator -> debounce updates
- On disconnect -> retry with exponential backoff

---

## 8. Theming & Localization Flow
- Theme state stored in localStorage (`theme = dark | light`) and React Context
- i18n initialized on app load; user selection stored in localStorage
- All text via translation keys `t('home.heroTitle')`
- Mapbox styles toggled based on theme (satellite/dark style)

---

## 9. Forms & Validation
- Use React Hook Form + Zod resolver
- Reuse form fields components (Input, Select)
- Show server validation errors by mapping backend error format to form errors

---

## 10. Error Handling
- Global error boundary for UI
- React Query error handling: show toasts with friendly messages
- HTTP 401: attempt token refresh; if fails -> redirect to login

---

## 11. Performance & Optimizations
- Lazy load admin modules and heavy components
- Code splitting for product pages
- Image lazy loading + responsive srcset
- Use SWR for small ephemeral data (optional)

---

## 12. Developer Workflow (Recommended)
- Branching: feature/*, hotfix/*, release/*
- PR template: description, how to test, screenshots
- Pre-commit hooks: lint, type-check, tests

---

## 13. CI Suggestions
- Run unit tests + lint + build on PR
- Deploy to preview env on merge to staging

---

## 14. Example sequence (Add to cart -> Checkout)
1. User clicks Add to Cart -> call `POST /api/user/cart` (optimistic UI update)
2. User proceeds to checkout -> validate cart server-side -> `POST /api/orders`
3. On success -> invalidate `cart`, `orders`; show confirmation page
4. Admin gets notification via socket / email

---

End of Frontend Workflow Documentation.

