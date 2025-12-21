# Database Schema Documentation (MongoDB)

## مقدمة
مخطط قاعدة البيانات يصف الـ collections الأساسية، الحقول، والعلاقات (references). التصميم موجه للأداء: index-ات على الحقول التي تُستخدم في الفلترة والبحث.

---

## Collections

### 1. users
```js
{
  _id: ObjectId,
  name: String,
  email: String, // unique
  passwordHash: String,
  role: String, // 'admin' | 'user'
  isActive: Boolean,
  verified: Boolean,
  phone: String,
  address: {
    street, city, state, country, zip
  },
  createdAt: Date,
  updatedAt: Date
}
```
**Indexes**: `{ email: 1 }`

---

### 2. brands
```js
{ _id, name, slug, logoUrl, description, createdAt }
```
**Indexes**: `{ slug: 1 }`

---

### 3. categories
```js
{ _id, name, slug, imageUrl, description, createdAt }
```
**Indexes**: `{ slug: 1 }`

---

### 4. products
```js
{
  _id,
  name,
  slug,
  sku,
  description,
  price: Number,
  currency: String,
  stock: Number,
  brand: ObjectId (brands),
  category: ObjectId (categories),
  images: [String],
  attributes: { watt, voltage, color },
  tags: [String],
  isPublished: Boolean,
  createdAt,
  updatedAt
}
```
**Indexes**: `text index on { name, description }`, `{ sku: 1 }`, `{ category: 1 }`, `{ brand: 1 }`

---

### 5. orders
```js
{
  _id,
  user: ObjectId,
  items: [ { product: ObjectId, qty: Number, price: Number } ],
  total: Number,
  shipping: { address, cost },
  paymentMethod: String,
  status: String, // Pending, Processing, Shipped, Delivered, Cancelled
  createdAt, updatedAt
}
```
**Indexes**: `{ user: 1 }`, `{ status: 1 }`, `{ createdAt: -1 }`

---

### 6. cart
```js
{ user: ObjectId, items: [ { product: ObjectId, qty } ], updatedAt }
```

---

### 7. wishlist
```js
{ user: ObjectId, products: [ObjectId] }
```

---

### 8. messages
```js
{ _id, from: ObjectId, to: ObjectId, roomId: String, text: String, read: Boolean, createdAt }
```
**Indexes**: `{ roomId: 1, createdAt: -1 }`

---

### 9. notifications
```js
{ user: ObjectId, type: String, title: String, body: String, meta: Object, read: Boolean, createdAt }
```
**Indexes**: `{ user: 1, read: 1 }`

---

### 10. reviews
```js
{ product: ObjectId, user: ObjectId, rating: Number, comment: String, createdAt }
```
**Indexes**: `{ product: 1 }`

---

## Transactions & Concurrency
- Use MongooseTransactions for critical flows (order creation + stock decrement)
- Optimistic concurrency control via `versionKey` if needed

---

## Archival & Cleanup
- Old notifications and messages can be archived to a separate collection or TTL index

---

## Backups & Indexing
- Daily backup snapshots
- Monitor index usage with `explain()` and adjust

---

End of Database Schema Documentation.

