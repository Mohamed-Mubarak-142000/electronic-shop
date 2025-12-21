# Backend Workflow Documentation

## مقدمة
هذا المستند يشرح سير الطلبات داخل الـ backend: من لحظة وصول الطلب HTTP حتى تخزينه في DB، إضافة إلى سير عمل Socket.IO، Notifications، و Background jobs.

---

## 1. Request Lifecycle
1. **Client → Server**: приходит HTTP request
2. **Express Middleware**:
   - Rate limiter (خصوصاً auth)
   - Helmet
   - CORS
   - Body parser
   - Uploads (multer)
   - Auth middleware (تحقق JWT)
3. **Validation**: Zod/Joi schema validation
4. **Controller**: يتحقق من صلاحيات المستخدم ويدعو الـ Service
5. **Service**: تحتوي منطق العمل التجاري، تجمع عمليات DB عبر الـ Repositories
6. **Repository/Model**: تتعامل مع Mongoose
7. **Response**: ترجع JSON standardized
8. **Post actions**: dispatch events to job queue (Bull)

---

## 2. Order Lifecycle
- **CREATE**: POST /api/orders
  - Validate cart items (stock, price) → create Order (status: Pending)
  - Charge payment (if any) or reserve
  - Emit: socket notify `admin:orders` and push job to send email

- **PROCESSING**: Admin confirms → PATCH status
  - Update status
  - Emit socket to user
  - If shipped, trigger shipment workflow (tracking)

- **DELIVERED/CANCELLED**
  - Finalize order; release reserved stock on cancel

---

## 3. Socket.IO Workflow (Chat & Notifications)
- **Connection**: client connects with token -> server validates token and joins rooms
- **Rooms**: `user:<userId>`, `admin` or `order:<orderId>`
- **Events**:
  - `message` —> server persists message DB then emits to room
  - `typing` —> broadcast to room
  - `notification` —> push to user sockets
- **Scaling**: use Redis adapter for multi-instance (socket.io-redis)

---

## 4. Notifications System
- **Immediate notifications** (real-time): emit through socket
- **Email notifications**: push job to Bull queue -> worker sends via Nodemailer/SendGrid
- **Bulk** (New product broadcast): create job that paginates users and sends batched emails

---

## 5. Background Jobs
- **Bull + Redis** recommended
- Jobs:
  - send-email
  - broadcast-product
  - cleanup-temp-files
  - reindex-search

---

## 6. Error Handling & Retries
- Workers implement retries with exponential backoff
- HTTP errors use centralized error middleware
- Log errors to external logging service (Sentry / LogDNA)

---

## 7. Database Interaction
- Use Mongoose transactions for multi-collection updates (orders + stock)
- Indexes: text index on product name/description; index on sku, createdAt

---

## 8. Security Considerations
- Validate tokens on socket connection
- Sanitize inputs
- Limit file upload types and sizes
- CSRF protection if serving SSR

---

## 9. Scaling
- Stateless API servers behind load balancer
- MongoDB cluster (replica set)
- Redis for cache + session + socket adapter
- Worker fleet for background jobs

---

## 10. Observability
- Metrics: request count, latency, error rate
- Logs (structured) with request id
- Health endpoints `/healthz`
- Alerts on high error rate / low DB connections

---

End of Backend Workflow Documentation.

