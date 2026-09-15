import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, API_URL } from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const empty = {
  nameAr: "",
  nameEn: "",
  category: "medical-clothing",
  descriptionAr: "",
  descriptionEn: "",
  price: 0,
  oldPrice: 0,
  stock: 0,
  colors: ["White"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  images: [],
  isNew: false,
  isBestSeller: false,
  isActive: true,
};

export default function Admin() {
  const nav = useNavigate();

  const [tab, setTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState("");

  const load = async () => {
    try {
      const [p, o, s] = await Promise.all([
        api.adminProducts(),
        api.orders(),
        api.stats(),
      ]);

      setProducts(p);
      setOrders(o);
      setStats(s);
    } catch {
      localStorage.removeItem("burda_admin_token");
      nav("/admin/login");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("burda_admin_token")) {
      nav("/admin/login");
    } else {
      load();
    }
  }, []);

  const save = async (e) => {
    e.preventDefault();

    if (editing) {
      await api.updateProduct(editing, form);
    } else {
      await api.addProduct(form);
    }

    setForm(empty);
    setEditing(null);

    await load();

    alert("تم حفظ المنتج بنجاح ✓");
  };

  const edit = (p) => {
    setEditing(p.id);
    setForm({ ...p });
    setTab("products");
  };

  const del = async (id) => {
    if (confirm("حذف المنتج؟")) {
      await api.deleteProduct(id);
      await load();
    }
  };

  const upload = async (files) => {
    const r = await api.upload(files);

    setForm((f) => ({
      ...f,
      images: [...(f.images || []), ...r.urls],
    }));
  };

  const filtered = orders.filter((o) =>
    `${o.customer_name} ${o.phone} ${o.order_number}`
      .toLowerCase()
      .includes(q.toLowerCase())
  );

  return (
    <main
      className="
        admin-dashboard
        min-h-screen
        bg-neutral-100
        dark:bg-neutral-950
      "
    >
      <div className="flex">

        {/* ======================================================
            SIDEBAR
        ====================================================== */}

        <aside
          className="
            hidden
            md:block
            w-64
            min-h-screen
            bg-black
            text-white
            p-5
            sticky
            top-0
            h-screen
          "
        >
          <div
            className="
              font-black
              text-2xl
              tracking-widest
              mb-8
            "
          >
            BURDA
          </div>

          {[
            ["dashboard", "Dashboard"],
            ["products", "Products"],
            ["medical", "Medical Clothing"],
            ["fashion", "Fashion"],
            ["orders", "Orders"],
            ["visitors", "Visitors"],
          ].map(([k, t]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`
                block
                w-full
                text-start
                px-4
                py-3
                rounded-xl
                mb-1
                transition
                ${
                  tab === k
                    ? "bg-white !text-black"
                    : "!text-white hover:bg-neutral-900"
                }
              `}
            >
              {t}
            </button>
          ))}

          <button
            onClick={() => {
              localStorage.removeItem("burda_admin_token");
              nav("/admin/login");
            }}
            className="
              block
              w-full
              text-start
              px-4
              py-3
              mt-8
              !text-neutral-400
              hover:!text-white
            "
          >
            Logout
          </button>
        </aside>

        {/* ======================================================
            MAIN ADMIN CONTENT
        ====================================================== */}

        <section
          className="
            flex-1
            p-4
            md:p-8
          "
        >

          {/* MOBILE SELECT */}

          <div className="md:hidden mb-4">
            <select
              className="
                input
                !bg-white
                !text-black
              "
              value={tab}
              onChange={(e) => setTab(e.target.value)}
            >
              {[
                "dashboard",
                "products",
                "medical",
                "fashion",
                "orders",
                "visitors",
              ].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          {/* ======================================================
              DASHBOARD
          ====================================================== */}

          {tab === "dashboard" && (
            <>
              <h1
                className="
                  text-3xl
                  font-black
                  mb-6
                  text-black
                  dark:text-white
                "
              >
                Dashboard
              </h1>

              <div
                className="
                  grid
                  sm:grid-cols-2
                  lg:grid-cols-4
                  gap-4
                "
              >
                {[
                  ["إجمالي الزيارات", stats?.visits || 0],
                  [
                    "الطلبات غير المكتملة",
                    stats?.incompleteOrders || 0,
                  ],
                  [
                    "إجمالي المنتجات",
                    stats?.totalProducts || 0,
                  ],
                  [
                    "إجمالي الطلبات",
                    stats?.totalOrders || 0,
                  ],
                ].map(([t, n]) => (
                  <div
                    className="
                      card
                      !bg-white
                      !text-black
                      p-6
                    "
                    key={t}
                  >
                    <div
                      className="
                        text-sm
                        font-medium
                        !text-neutral-600
                        !opacity-100
                      "
                    >
                      {t}
                    </div>

                    <div
                      className="
                        text-4xl
                        font-black
                        mt-2
                        !text-black
                        !opacity-100
                      "
                    >
                      {n}
                    </div>
                  </div>
                ))}
              </div>

              {/* CHART */}

              <div
                className="
                  card
                  !bg-white
                  !text-black
                  p-6
                  mt-6
                  h-80
                "
              >
                <h2
                  className="
                    font-black
                    mb-4
                    !text-black
                  "
                >
                  زيارات آخر الأيام
                </h2>

                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={stats?.daily || []}>
                    <XAxis
                      dataKey="date"
                      stroke="#555555"
                      tick={{
                        fill: "#555555",
                      }}
                    />

                    <YAxis
                      stroke="#555555"
                      tick={{
                        fill: "#555555",
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        color: "#111111",
                        border: "1px solid #dddddd",
                        borderRadius: "10px",
                      }}
                      labelStyle={{
                        color: "#111111",
                      }}
                      itemStyle={{
                        color: "#111111",
                      }}
                    />

                    <Bar
                      dataKey="count"
                      fill="#111111"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* ======================================================
              PRODUCTS / MEDICAL
          ====================================================== */}

          {(tab === "products" || tab === "medical") && (
            <div
              className="
                grid
                xl:grid-cols-[430px_1fr]
                gap-6
              "
            >

              {/* ==================================================
                  PRODUCT FORM
              ================================================== */}

              <form
                onSubmit={save}
                className="
                  card
                  !bg-white
                  !text-black
                  p-6
                  h-fit
                "
              >
                <h2
                  className="
                    text-2xl
                    font-black
                    !text-black
                  "
                >
                  {editing ? "تعديل منتج" : "+ إضافة منتج"}
                </h2>

                {/* PRODUCT NAME AR */}

                <label className="block mt-5">
                  <span
                    className="
                      block
                      mb-2
                      text-xs
                      font-bold
                      !text-neutral-700
                    "
                  >
                    اسم المنتج بالعربي
                  </span>

                  <input
                    className="
                      input
                      !bg-white
                      !text-black
                    "
                    placeholder="مثال: لاب كوت"
                    value={form.nameAr}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nameAr: e.target.value,
                      })
                    }
                  />
                </label>

                {/* PRODUCT NAME EN */}

                <label className="block mt-3">
                  <span
                    className="
                      block
                      mb-2
                      text-xs
                      font-bold
                      !text-neutral-700
                    "
                  >
                    Product Name
                  </span>

                  <input
                    className="
                      input
                      !bg-white
                      !text-black
                    "
                    placeholder="Example: Lab Coat"
                    value={form.nameEn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nameEn: e.target.value,
                      })
                    }
                  />
                </label>

                {/* DESCRIPTION AR */}

                <label className="block mt-3">
                  <span
                    className="
                      block
                      mb-2
                      text-xs
                      font-bold
                      !text-neutral-700
                    "
                  >
                    الوصف بالعربي
                  </span>

                  <textarea
                    className="
                      input
                      !bg-white
                      !text-black
                    "
                    placeholder="اكتب وصف المنتج بالعربي"
                    value={form.descriptionAr}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        descriptionAr: e.target.value,
                      })
                    }
                  />
                </label>

                {/* DESCRIPTION EN */}

                <label className="block mt-3">
                  <span
                    className="
                      block
                      mb-2
                      text-xs
                      font-bold
                      !text-neutral-700
                    "
                  >
                    Description
                  </span>

                  <textarea
                    className="
                      input
                      !bg-white
                      !text-black
                    "
                    placeholder="Write product description"
                    value={form.descriptionEn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        descriptionEn: e.target.value,
                      })
                    }
                  />
                </label>

                {/* ==================================================
                    PRICE / OLD PRICE / STOCK
                ================================================== */}

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-3
                    gap-3
                    mt-4
                  "
                >

                  {/* PRICE */}

                  <label className="block">
                    <span
                      className="
                        block
                        mb-2
                        text-xs
                        font-bold
                        !text-neutral-700
                      "
                    >
                      Price (JOD)
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="
                        input
                        !bg-white
                        !text-black
                      "
                      value={form.price}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          price: +e.target.value,
                        })
                      }
                    />
                  </label>

                  {/* OLD PRICE */}

                  <label className="block">
                    <span
                      className="
                        block
                        mb-2
                        text-xs
                        font-bold
                        !text-neutral-700
                      "
                    >
                      Old Price (JOD)
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="
                        input
                        !bg-white
                        !text-black
                      "
                      value={form.oldPrice}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          oldPrice: +e.target.value,
                        })
                      }
                    />
                  </label>

                  {/* STOCK */}

                  <label className="block">
                    <span
                      className="
                        block
                        mb-2
                        text-xs
                        font-bold
                        !text-neutral-700
                      "
                    >
                      Stock Quantity
                    </span>

                    <input
                      type="number"
                      min="0"
                      step="1"
                      className="
                        input
                        !bg-white
                        !text-black
                      "
                      value={form.stock}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          stock: +e.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                {/* COLORS */}

                <label className="block mt-4">
                  <span
                    className="
                      block
                      mb-2
                      text-xs
                      font-bold
                      !text-neutral-700
                    "
                  >
                    Colors
                  </span>

                  <input
                    className="
                      input
                      !bg-white
                      !text-black
                    "
                    placeholder="White, Black, Navy..."
                    value={form.colors.join(",")}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        colors: e.target.value
                          .split(",")
                          .map((x) => x.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </label>

                {/* SIZES */}

                <label className="block mt-3">
                  <span
                    className="
                      block
                      mb-2
                      text-xs
                      font-bold
                      !text-neutral-700
                    "
                  >
                    Sizes
                  </span>

                  <input
                    className="
                      input
                      !bg-white
                      !text-black
                    "
                    placeholder="XS, S, M, L, XL..."
                    value={form.sizes.join(",")}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sizes: e.target.value
                          .split(",")
                          .map((x) => x.trim())
                          .filter(Boolean),
                      })
                    }
                  />
                </label>

                {/* PRODUCT IMAGES */}

                <label className="block mt-4">
                  <span
                    className="
                      block
                      mb-2
                      text-xs
                      font-bold
                      !text-neutral-700
                    "
                  >
                    Product Images
                  </span>

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="!text-black"
                    onChange={(e) => upload(e.target.files)}
                  />
                </label>

                {/* IMAGE PREVIEW */}

                <div
                  className="
                    grid
                    grid-cols-3
                    gap-2
                    mt-3
                  "
                >
                  {form.images?.map((im, i) => (
                    <div className="relative" key={im}>
                      <img
                        src={`${API_URL}${im}`}
                        alt=""
                        className="
                          w-full
                          aspect-square
                          object-cover
                          rounded-xl
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            images: form.images.filter(
                              (_, j) => j !== i
                            ),
                          })
                        }
                        className="
                          absolute
                          top-1
                          end-1
                          bg-black
                          !text-white
                          rounded-full
                          px-2
                        "
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* PRODUCT OPTIONS */}

                <div
                  className="
                    flex
                    flex-wrap
                    gap-4
                    text-sm
                    mt-5
                    !text-black
                  "
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={form.isNew}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          isNew: e.target.checked,
                        })
                      }
                    />{" "}
                    New
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={form.isBestSeller}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          isBestSeller: e.target.checked,
                        })
                      }
                    />{" "}
                    Best Seller
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          isActive: e.target.checked,
                        })
                      }
                    />{" "}
                    Active
                  </label>
                </div>

                {/* SAVE */}

                <button
                  type="submit"
                  className="
                    btn
                    w-full
                    mt-5
                  "
                >
                  حفظ المنتج
                </button>

                {editing && (
                  <button
                    type="button"
                    className="
                      w-full
                      mt-3
                      text-sm
                      !text-black
                    "
                    onClick={() => {
                      setEditing(null);
                      setForm(empty);
                    }}
                  >
                    إلغاء التعديل
                  </button>
                )}
              </form>

              {/* ==================================================
                  PRODUCT LIST
              ================================================== */}

              <div>
                <h2
                  className="
                    text-2xl
                    font-black
                    mb-4
                    text-black
                    dark:text-white
                  "
                >
                  المنتجات
                </h2>

                <div className="space-y-3">
                  {products
                    .filter(
                      (p) =>
                        tab !== "medical" ||
                        p.category === "medical-clothing"
                    )
                    .map((p) => (
                      <div
                        className="
                          card
                          !bg-white
                          !text-black
                          p-4
                          flex
                          items-center
                          gap-4
                        "
                        key={p.id}
                      >
                        <div className="text-4xl">
                          🥼
                        </div>

                        <div className="flex-1">
                          <b className="!text-black">
                            {p.nameAr} / {p.nameEn}
                          </b>

                          <div
                            className="
                              text-sm
                              !text-neutral-600
                              !opacity-100
                            "
                          >
                            {p.price} JOD • Stock {p.stock}
                          </div>
                        </div>

                        <button
                          className="
                            !text-black
                            font-semibold
                          "
                          onClick={() => edit(p)}
                        >
                          Edit
                        </button>

                        <button
                          className="
                            !text-red-600
                            font-semibold
                          "
                          onClick={() => del(p.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================
              FASHION
          ====================================================== */}

          {tab === "fashion" && (
            <div
              className="
                card
                !bg-black
                !text-white
                p-16
                text-center
              "
            >
              <div
                className="
                  text-5xl
                  font-black
                  !text-white
                "
              >
                FASHION
              </div>

              <div
                className="
                  mt-3
                  !text-neutral-400
                "
              >
                Coming Soon — سيتم تجهيز القسم لاحقًا
              </div>
            </div>
          )}

          {/* ======================================================
              ORDERS
          ====================================================== */}

          {tab === "orders" && (
            <>
              <h1
                className="
                  text-3xl
                  font-black
                  mb-5
                  text-black
                  dark:text-white
                "
              >
                Orders
              </h1>

              <input
                className="
                  input
                  max-w-md
                  mb-5
                  !bg-white
                  !text-black
                "
                placeholder="Search name / phone / order"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />

              <div
                className="
                  overflow-x-auto
                  card
                  !bg-white
                  !text-black
                "
              >
                <table
                  className="
                    w-full
                    text-sm
                    !text-black
                  "
                >
                  <thead>
                    <tr className="border-b">
                      <th className="p-3">
                        Order
                      </th>

                      <th>Name</th>
                      <th>Phone</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Products</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map((o) => (
                      <tr
                        key={o.id}
                        className="border-b"
                      >
                        <td className="p-3">
                          {o.order_number}
                        </td>

                        <td>
                          {o.customer_name}
                        </td>

                        <td>
                          {o.phone}
                        </td>

                        <td>
                          {o.total} JOD
                        </td>

                        <td>
                          <select
                            className="
                              border
                              rounded-lg
                              bg-white
                              text-black
                              p-2
                            "
                            value={o.status}
                            onChange={async (e) => {
                              await api.status(
                                o.id,
                                e.target.value
                              );

                              load();
                            }}
                          >
                            {[
                              "incomplete",
                              "new",
                              "preparing",
                              "shipped",
                              "completed",
                              "cancelled",
                            ].map((s) => (
                              <option
                                key={s}
                                value={s}
                              >
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td>
                          {o.items
                            .map(
                              (i) =>
                                `${i.name} ×${i.qty}`
                            )
                            .join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ======================================================
              VISITORS
          ====================================================== */}

          {tab === "visitors" && (
            <>
              <h1
                className="
                  text-3xl
                  font-black
                  mb-6
                  text-black
                  dark:text-white
                "
              >
                Visitors
              </h1>

              <div
                className="
                  grid
                  sm:grid-cols-2
                  gap-4
                "
              >
                <div
                  className="
                    card
                    !bg-white
                    !text-black
                    p-6
                  "
                >
                  <div
                    className="
                      !text-neutral-600
                      !opacity-100
                    "
                  >
                    Total Visits
                  </div>

                  <div
                    className="
                      text-5xl
                      font-black
                      !text-black
                    "
                  >
                    {stats?.visits || 0}
                  </div>
                </div>

                <div
                  className="
                    card
                    !bg-white
                    !text-black
                    p-6
                  "
                >
                  <div
                    className="
                      !text-neutral-600
                      !opacity-100
                    "
                  >
                    Today
                  </div>

                  <div
                    className="
                      text-5xl
                      font-black
                      !text-black
                    "
                  >
                    {stats?.visitsToday || 0}
                  </div>
                </div>
              </div>
            </>
          )}

        </section>
      </div>
    </main>
  );
}