import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { api } from "../services/api";
import Receipt from "../components/Receipt";

export default function Checkout() {
  const { cart, lang } = useShop();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  const sub = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const delivery = cart.length ? 3 : 0;
  const total = sub + delivery;

  const submit = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      alert(lang === "ar" ? "السلة فارغة" : "Cart is empty");
      return;
    }

    if (sending) return;

    // نفتح نافذة مباشرة من نفس ضغطة المستخدم.
    // هذا مهم خصوصًا على Safari والموبايل حتى لا يمنع WhatsApp.
    const whatsappWindow = window.open("", "_blank");

    try {
      setSending(true);

      const payload = {
        ...form,

        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.nameEn,
          qty: item.qty,
          size: item.size,
          color: item.color,
          price: item.product.price,
        })),

        subtotal: sub,
        deliveryFee: delivery,
        total,
        status: "new",
      };

      // أولًا نحفظ الطلب ونحصل على رقم الطلب
      const order = await api.createOrder(payload);

      // تجهيز تفاصيل المنتجات لرسالة WhatsApp
      const products = cart
        .map((item) => {
          const size = item.size
            ? `\nالمقاس: ${item.size}`
            : "";

          const color = item.color
            ? `\nاللون: ${item.color}`
            : "";

          return `• ${item.product.nameAr} × ${item.qty}${size}${color}
السعر: ${item.product.price * item.qty} JOD`;
        })
        .join("\n\n");

      // رسالة WhatsApp
      const msg = `السلام عليكم

طلب جديد من متجر BURDA FASHION

رقم الطلب: ${order.orderNumber}

الاسم: ${form.customerName}
رقم الهاتف: ${form.phone}
المدينة: ${form.city}
العنوان: ${form.address}

المنتجات:

${products}

إجمالي المنتجات: ${sub} JOD
رسوم التوصيل: ${delivery} JOD
الإجمالي النهائي: ${total} JOD

الملاحظات: ${form.notes || "-"}

شكرًا لكم.`;

      const whatsappUrl =
        `https://wa.me/962781564086?text=${encodeURIComponent(msg)}`;

      setDone(true);

      // إذا سمح المتصفح بالنافذة الجديدة نرسلها إلى WhatsApp
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        // حل احتياطي إذا منع المتصفح النافذة الجديدة
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error("Order error:", error);

      // إغلاق النافذة الفارغة إذا فشل إنشاء الطلب
      if (whatsappWindow) {
        whatsappWindow.close();
      }

      alert(
        lang === "ar"
          ? "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى."
          : "Something went wrong. Please try again."
      );

      setSending(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10">
      <form onSubmit={submit} className="card p-6">
        <h1 className="text-3xl font-black mb-6">
          {lang === "ar" ? "إتمام الطلب" : "Checkout"}
        </h1>

        {[
          ["customerName", "الاسم الكامل"],
          ["phone", "رقم الهاتف"],
          ["city", "المدينة"],
          ["address", "العنوان"],
        ].map(([key, label]) => (
          <input
            key={key}
            required
            className="input mb-3"
            placeholder={label}
            value={form[key]}
            onChange={(e) =>
              setForm({
                ...form,
                [key]: e.target.value,
              })
            }
          />
        ))}

        <textarea
          className="input min-h-28"
          placeholder="ملاحظات إضافية"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
        />

        <button
          type="submit"
          disabled={sending}
          className="btn w-full mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sending
            ? lang === "ar"
              ? "جاري تأكيد الطلب..."
              : "Confirming order..."
            : lang === "ar"
            ? "تأكيد الطلب عبر WhatsApp"
            : "Confirm Order via WhatsApp"}
        </button>
      </form>

      <div>
        {done ? (
          <Receipt
            items={cart}
            subtotal={sub}
            delivery={delivery}
            total={total}
          />
        ) : (
          <div className="card p-6">
            <h2 className="font-black text-xl">
              {lang === "ar" ? "ملخص الطلب" : "Order Summary"}
            </h2>

            {cart.map((item) => (
              <div
                key={item.key}
                className="flex justify-between py-3 border-b"
              >
                <span>
                  {lang === "ar"
                    ? item.product.nameAr
                    : item.product.nameEn}{" "}
                  ×{item.qty}
                </span>

                <span>
                  {item.product.price * item.qty} JOD
                </span>
              </div>
            ))}

            <div className="flex justify-between pt-5 text-xl font-black">
              <span>
                {lang === "ar" ? "الإجمالي" : "Total"}
              </span>

              <span>{total} JOD</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}