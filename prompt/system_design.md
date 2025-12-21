# System Design (High-Level Architecture)

## Goal
تصميم نظام قابل للتوسع يدعم:
- عدد زيارات كبير
- real-time chat
- دفعات إشعارات للمستخدمين
- تشغيل على بيئة production مع مراقبة وسجلات

---

## Components
1. **Client (Frontend)** — React app (Vite) served on CDN
2. **API Gateway / Load Balancer** — nginx or cloud LB
3. **App Servers** — Node.js instances (Express) stateless
4. **Database** — MongoDB Replica Set
5. **Cache / Session / PubSub** — Redis
6. **Socket Servers** — Socket.IO instances with Redis adapter
7. **Worker Fleet** — Bull queue workers (background jobs)
8. **Storage** — S3 or Cloudinary for images
9. **CDN** — Fastly/Cloudflare for static assets
10. **Monitoring** — Prometheus + Grafana / Sentry

---

## Data Flow (Example: Place Order)
1. User calls `POST /orders`
2. LB → App server validates, creates Order in MongoDB (transaction), decrement stock
3. App server enqueues job to send email & notify admin via socket
4. Worker sends email, and notifies via Redis pubsub to socket servers
5. Socket servers push real-time notification to connected admin clients

---

## Real-time (Chat & Notifications)
- Use Socket.IO with Redis adapter to handle multiple app instances
- Token validation on socket connection
- Rooms architecture: per-user & per-order rooms
- Persist messages in MongoDB for history

---

## Scaling Strategy
- **Vertical → Horizontal**: scale app servers horizontally behind load balancer
- **DB**: use sharding for very large datasets, replica sets for HA
- **Cache**: Redis for frequent queries and sessions
- **Workers**: scale workers based on queue length

---

## Resilience & Fault Tolerance
- Health checks + auto-restart (Kubernetes / systemd)
- Circuit breakers for external services (email provider)
- Retries with exponential backoff on worker jobs

---

## Security Considerations
- WAF in front (Cloudflare)
- TLS everywhere
- Secrets in Vault or environment manager
- Least privilege for service accounts

---

## Diagram (textual)
```
[Client] -> [CDN] -> [LoadBalancer]
                 -> [App Server #1] -> [MongoDB]
                 -> [App Server #2] -> [Redis]
                 -> [Socket Server] -> [Redis adapter]
[Workers] -> [Redis queues] -> [Email/S3]
```

---

## Observability
- Traces for requests (OpenTelemetry)
- Metrics & dashboards
- Log aggregation & alerting

---

End of System Design.

