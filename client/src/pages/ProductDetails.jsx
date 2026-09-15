import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { api, API_URL } from "../services/api";
import { useShop } from "../context/ShopContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const { add, lang } = useShop();

  const ar = lang === "ar";

  const colorMap = {
    Navy: "#000080",
    Black: "#000000",
    White: "#FFFFFF",
    "Royal Blue": "#4169E1",
    Burgundy: "#800020",
    Olive: "#808000",
    Grey: "#808080",
    "Ceil Blue": "#92B4D7",
  };

  useEffect(() => {
    api
      .product(id)
      .then((x) => {
        setP(x);
        setSize(x.sizes?.[0] || "");
        setColor(x.colors?.[0] || "");
        setQty(1);
        setActiveImage(0);
      })
      .catch(() => {
        setP(null);
      });
  }, [id]);

  if (!p) {
    return (
      <div className="p-20 text-center">
        {ar ? "جاري تحميل المنتج..." : "Loading product..."}
      </div>
    );
  }

  const title = ar ? p.nameAr : p.nameEn;
  const description = ar ? p.descriptionAr : p.descriptionEn;

  const handleAddToCart = () => {
    add(p, {
      qty,
      size,
      color,
    });

    navigate("/cart");
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

        {/* =========================
            PRODUCT IMAGES
        ========================== */}

        <div>
          <div
            className="
              rounded-[28px]
              border
              border-neutral-200
              dark:border-neutral-800
              bg-neutral-100
              dark:bg-neutral-900
              overflow-hidden
              flex
              items-center
              justify-center
              min-h-[450px]
              md:min-h-[620px]
            "
          >
            {p.images?.[activeImage] ? (
              <img
                src={`${API_URL}${p.images[activeImage]}`}
                alt={title}
                className="
                  w-full
                  h-full
                  max-h-[700px]
                  object-contain
                  p-3
                "
              />
            ) : (
              <div className="text-9xl">🥼</div>
            )}
          </div>

          {/* SMALL IMAGES */}

          {p.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
              {p.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`
                    aspect-square
                    rounded-xl
                    overflow-hidden
                    border
                    bg-neutral-100
                    dark:bg-neutral-900
                    ${
                      activeImage === index
                        ? "border-black dark:border-white"
                        : "border-neutral-200 dark:border-neutral-800"
                    }
                  `}
                >
                  <img
                    src={`${API_URL}${image}`}
                    alt={`${title} ${index + 1}`}
                    className="
                      w-full
                      h-full
                      object-contain
                      p-1
                    "
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =========================
            PRODUCT DETAILS
        ========================== */}

        <div>
          <span
            className="
              text-[10px]
              tracking-[.3em]
              opacity-50
            "
          >
            BURDA MEDICAL
          </span>

          <h1
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-black
              mt-3
              tracking-tight
            "
          >
            {title}
          </h1>

          <p
            className="
              opacity-60
              mt-5
              leading-8
              max-w-xl
            "
          >
            {description}
          </p>

          {/* PRICE */}

          <div className="text-3xl font-black mt-7">
            {p.price} JOD
          </div>

          {/* EXTRA PRODUCT INFO */}

          <div
            className="
              grid
              grid-cols-2
              gap-5
              mt-8
              py-6
              border-y
              border-neutral-200
              dark:border-neutral-800
            "
          >
            <div>
              <span className="text-xs opacity-50">
                {ar ? "التصنيف" : "Category"}
              </span>

              <p className="font-bold mt-1">
                {ar ? "ملابس طبية" : "Medical Apparel"}
              </p>
            </div>

            <div>
              <span className="text-xs opacity-50">
                {ar ? "المتوفر" : "Available Stock"}
              </span>

              <p className="font-bold mt-1">
                {p.stock}
              </p>
            </div>
          </div>

          {/* =========================
              SIZE
          ========================== */}

          <div className="mt-8">
            <label className="block font-bold mb-3">
              {ar ? "اختر المقاس" : "Select Size"}
            </label>

            <div className="flex flex-wrap gap-2">
              {p.sizes?.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`
                    min-w-[55px]
                    border
                    rounded-full
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    transition
                    ${
                      size === s
                        ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                        : "border-neutral-300 dark:border-neutral-600"
                    }
                  `}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* =========================
              COLOR
          ========================== */}

          <div className="mt-8">
            <label className="block font-bold mb-3">
              {ar ? "اختر اللون" : "Select Color"}
            </label>

            <div className="flex flex-wrap gap-3">
              {p.colors?.map((c) => {
                const actualColor = colorMap[c] || "#CCCCCC";

                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`
                      flex
                      items-center
                      gap-2
                      border
                      rounded-full
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      transition
                      ${
                        color === c
                          ? "border-black ring-2 ring-black dark:border-white dark:ring-white"
                          : "border-neutral-300 dark:border-neutral-600"
                      }
                    `}
                  >
                    <span
                      className="
                        w-5
                        h-5
                        rounded-full
                        border
                        border-neutral-300
                        shrink-0
                      "
                      style={{
                        backgroundColor: actualColor,
                      }}
                    />

                    <span>{c}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================
              QUANTITY
          ========================== */}

          <div className="mt-8">
            <label className="block font-bold mb-3">
              {ar ? "الكمية" : "Quantity"}
            </label>

            <div
              className="
                inline-flex
                items-center
                gap-5
                border
                border-neutral-300
                dark:border-neutral-600
                rounded-full
                px-2
                py-2
              "
            >
              <button
                type="button"
                onClick={() =>
                  setQty((current) =>
                    Math.max(1, current - 1)
                  )
                }
                className="
                  w-10
                  h-10
                  rounded-full
                  border
                  border-neutral-200
                  dark:border-neutral-600
                  text-xl
                "
              >
                −
              </button>

              <strong className="min-w-[30px] text-center">
                {qty}
              </strong>

              <button
                type="button"
                onClick={() =>
                  setQty((current) =>
                    current < p.stock
                      ? current + 1
                      : current
                  )
                }
                className="
                  w-10
                  h-10
                  rounded-full
                  border
                  border-neutral-200
                  dark:border-neutral-600
                  text-xl
                "
              >
                +
              </button>
            </div>
          </div>

          {/* =========================
              SELECTED OPTIONS
          ========================== */}

          <div
            className="
              mt-8
              p-5
              rounded-2xl
              bg-neutral-100
              text-black
              dark:bg-neutral-900
              dark:text-white
              text-sm
              border
              border-transparent
              dark:border-neutral-800
            "
          >
            <div className="flex justify-between gap-4 mb-3">
              <span className="text-neutral-600 dark:text-neutral-400">
                {ar ? "المقاس المختار" : "Selected size"}
              </span>

              <strong className="text-black dark:text-white">
                {size || "-"}
              </strong>
            </div>

            <div className="flex justify-between gap-4 mb-3">
              <span className="text-neutral-600 dark:text-neutral-400">
                {ar ? "اللون المختار" : "Selected color"}
              </span>

              <div className="flex items-center gap-2">
                {color && (
                  <span
                    className="
                      w-4
                      h-4
                      rounded-full
                      border
                      border-neutral-300
                      dark:border-neutral-600
                    "
                    style={{
                      backgroundColor:
                        colorMap[color] || "#CCCCCC",
                    }}
                  />
                )}

                <strong className="text-black dark:text-white">
                  {color || "-"}
                </strong>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-neutral-600 dark:text-neutral-400">
                {ar ? "الكمية" : "Quantity"}
              </span>

              <strong className="text-black dark:text-white">
                {qty}
              </strong>
            </div>
          </div>

          {/* =========================
              ADD TO CART
          ========================== */}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={p.stock <= 0}
            className="
              mt-8
              w-full
              py-4
              px-6
              rounded-full
              bg-black
              text-white
              dark:bg-white
              dark:text-black
              text-sm
              font-black
              transition
              hover:opacity-80
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            {p.stock <= 0
              ? ar
                ? "غير متوفر حاليًا"
                : "Out of stock"
              : ar
                ? `أضف إلى السلة — ${p.price * qty} JOD`
                : `Add to Cart — ${p.price * qty} JOD`}
          </button>

          {/* =========================
              SHIPPING INFO
          ========================== */}

          <div
            className="
              mt-8
              border-t
              border-neutral-200
              dark:border-neutral-800
              pt-6
              text-sm
              leading-7
            "
          >
            <strong>
              {ar
                ? "الشحن والتوصيل"
                : "Shipping & Delivery"}
            </strong>

            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              {ar
                ? "متوفر توصيل داخل الأردن، ويوجد لدينا شحن خارجي."
                : "Delivery is available across Jordan, with international shipping available."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}