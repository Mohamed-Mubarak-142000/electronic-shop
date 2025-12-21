# Backend API Documentation

## مقدمة
هذا الملف يوثق كل الـ APIs الأساسية للـ Backend الخاص بـ مشروع متجر الأدوات الكهربائية. التوثيق يشمل: Endpoints، Request/Response Schema، Authentication، Status Codes، وأمثلة.

> Base URL: `https://api.example.com` أو محليًا `http://localhost:5000`

---

## Authentication
### تسجيل مستخدم
**POST /api/auth/register**

**Body** (application/json)
```json
{
  "name": "Mohamed",
  "email": "m@example.com",
  "password": "P@ssw0rd"
}
```

**Responses**
- `201 Created` — { userId, message: "OTP sent" }
- `400 Bad Request` — validation errors

---

### تحقق OTP
**POST /api/auth/verify-otp**

**Body**
```json
{ "email": "m@example.com", "otp": "123456" }
```

**Responses**
- `200 OK` — { token, refreshToken, user }
- `400` — invalid/expired otp

---

### تسجيل دخول
**POST /api/auth/login**

**Body**
```json
{ "email": "m@example.com", "password": "P@ssw0rd" }
```

**Responses**
- `200 OK` — { accessToken, refreshToken, user }
- `401 Unauthorized` — invalid credentials

---

## Users (Admin)
> Authorization: Bearer `<accessToken>` (admin role)

### جلب قائمة المستخدمين
**GET /api/admin/users?page=&limit=&search=&status=**

**Responses**
- `200` — { data: [users], total, page, limit }

---

### تحديث حالة مستخدم
**PATCH /api/admin/users/:id**

**Body**
```json
{ "isActive": false }
```

**Responses**
- `200` — updated user

---

## Products
### جلب المنتجات (عمومي)
**GET /api/products?page=&limit=&category=&brand=&search=&sort=**

**Response**
- `200` — { data: [products], meta: { total, page, limit } }

---

### جلب منتج واحد
**GET /api/products/:id**

**Response**
- `200` — product object
- `404` — not found

---

### إنشاء منتج (Admin)
**POST /api/admin/products** (multipart/form-data)
- Fields: name, sku, description, price, stock, brandId, categoryId, attributes (json), isPublished
- Files: images[]

**Response**
- `201` — created product
- After success: triggers Notification job to all users

---

### تعديل منتج
**PUT /api/admin/products/:id**

**Body** (multipart/json)
- Same fields as create

**Response**
- `200` — updated product

---

### حذف منتج
**DELETE /api/admin/products/:id**

**Response**
- `204 No Content`

---

## Brands & Categories
- CRUD مشابه للـ products under `/api/admin/brands` و `/api/admin/categories`.

---

## Cart & Wishlist (User)
> Authorization: Bearer `<accessToken>`

### جلب الـ Cart
**GET /api/user/cart**

### تحديث/إضافة إلى Cart
**POST /api/user/cart**
Body: `{ productId, qty }` -> returns cart

### Wishlist
**GET /api/user/wishlist**
**POST /api/user/wishlist** `{ productId }`
**DELETE /api/user/wishlist/:id**

---

## Orders
### إنشاء أوردر
**POST /api/orders**
Body example:
```json
{
  "items": [{ "productId": "..", "qty": 2 }],
  "shipping": { "address": "..." },
  "paymentMethod": "cash"
}
```

**Response**
- `201` — { orderId, status: "Pending" }
- Triggers: notification to admin + email to user

---

### جلب أوردرات المستخدم
**GET /api/user/orders?page=&limit=**

### تحديث حالة الأوردر (Admin)
**PATCH /api/admin/orders/:id/status**
Body: `{ "status": "Shipped" }`

**Response**
- `200` — updated order
- Triggers: notification + email to user

---

## Chat
### REST
- `GET /api/chat/rooms` — جلب الغرف او المحادثات مع المستخدم
- `GET /api/chat/rooms/:roomId/messages?page=&limit=` — جلب الرسائل paginated

### Socket Events
- `join` `{ userId, roomId }`
- `message` `{ roomId, text }` -> broadcast to room
- `typing` `{ roomId, isTyping }`


---

## Notifications
- `GET /api/user/notifications` — paginated
- `PATCH /api/user/notifications/:id/read`

---

## Analytics (Admin)
- `GET /api/admin/analytics/sales?from=YYYY-MM-DD&to=YYYY-MM-DD` — returns timeseries & aggregates

---

## Error Handling
- Standard JSON error format:
```json
{ "status": "error", "message": "...", "errors": [...] }
```

---

## Rate Limits & Security
- Rate limit on auth endpoints
- CORS allowed origins from frontend
- Size limit for uploads

---

## Notes
- All POST/PUT/PATCH endpoints validate body with Zod/Joi
- Files uploaded to S3/Cloudinary; local storage for dev
- Background jobs (Bull + Redis) for sending bulk notifications

---

End of API Documentation.

