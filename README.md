# BURDA FASHION — Full Stack E‑Commerce

مشروع كامل: React 19 + Vite + Tailwind CSS + Express + SQLite.

## التشغيل السريع

### 1) شغّل السيرفر
```bash
cd server
npm install
npm run dev
```

السيرفر يعمل افتراضياً على:
`http://localhost:5000`

### 2) شغّل الواجهة
افتح Terminal جديد:
```bash
cd client
npm install
npm run dev
```

ثم افتح:
`http://localhost:5173`

## دخول الإدارة
- Username: `OSAMA25`
- Password: `dania!!`

> يتم تخزين كلمة المرور في SQLite بشكل Hash باستخدام bcrypt عند أول تشغيل.
> عدّل JWT_SECRET و ADMIN_PASSWORD في ملف `.env` قبل النشر الحقيقي.

## قاعدة البيانات
يتم إنشاء ملف SQLite تلقائياً عند أول تشغيل:
`server/burda.db`

## المجلدات
- `client` واجهة React
- `server` API + قاعدة البيانات + رفع الصور
- `server/uploads` صور المنتجات المرفوعة من لوحة الإدارة

## ملاحظات
- تم ربط المتجر ولوحة الإدارة بنفس Product/Order API.
- يوجد Local Storage للسلة والمفضلة واللغة والثيم.
- قسم Fashion Placeholder وجاهز لإضافة منتجات لاحقاً.
- طلب WhatsApp موجّه إلى الرقم الأردني 0781564086 بصيغة دولية.
