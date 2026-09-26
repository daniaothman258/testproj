import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import { useShop } from "../context/ShopContext";

export default function MedicalCategories() {
  const { products, lang } = useShop();

  const ar = lang === "ar";

  const Arrow = ar
    ? FaArrowLeft
    : FaArrowRight;

  /*
    Show every active product that belongs to
    the Medical Clothing category.

    This means any new medical product added
    from the Admin Dashboard will automatically
    appear on this page.
  */

  const medicalProducts = products.filter(
    (product) =>
      product.category === "medical-clothing" &&
      product.is_active !== false
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">

      {/* PAGE TITLE */}

      <div className="mb-12">
        <span className="text-[10px] tracking-[.3em] opacity-50">
          BURDA MEDICAL
        </span>

        <h1 className="text-4xl md:text-6xl font-black mt-3">
          {ar
            ? "الملابس الطبية"
            : "Medical Apparel"}
        </h1>

        <p className="mt-4 opacity-60">
          {ar
            ? "اختر المنتج للاطلاع على التفاصيل والمقاسات والألوان المتاحة."
            : "Choose a product to view details, available sizes and colours."}
        </p>
      </div>

      {/* PRODUCT CARDS */}

      <div className="grid md:grid-cols-2 gap-7">

        {medicalProducts.map((product) => {
          const image =
            product.images?.[0];

          const price =
            product.price;

          const name =
            ar
              ? product.name_ar || product.nameAr
              : product.name_en || product.nameEn;

          const description =
            ar
              ? product.description_ar ||
                product.descriptionAr
              : product.description_en ||
                product.descriptionEn;

          return (
            <motion.article
              key={product.id}
              whileHover={{ y: -7 }}
              transition={{
                duration: 0.25,
              }}
              className="
                overflow-hidden
                rounded-[30px]
                border
                border-neutral-200
                dark:border-neutral-800
                bg-white
                dark:bg-neutral-950
              "
            >

              <Link
                to={`/product/${product.id}`}
                className="block"
              >

                {/* IMAGE */}

                <div
                  className="
                    h-[460px]
                    md:h-[560px]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    bg-neutral-100
                    dark:bg-neutral-900
                  "
                >

                  {image ? (
                    <img
                      src={image}
                      alt={name || "BURDA Medical"}
                      className="
                        w-full
                        h-full
                        object-contain
                        p-3
                        transition
                        duration-700
                        hover:scale-[1.02]
                      "
                    />
                  ) : (
                    <div className="text-8xl">
                      🥼
                    </div>
                  )}

                </div>

                {/* PRODUCT INFORMATION */}

                <div className="p-7">

                  <span className="text-[10px] tracking-[.28em] opacity-45">
                    BURDA MEDICAL
                  </span>

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                      mt-3
                    "
                  >

                    <h2 className="text-3xl font-black">
                      {name || "BURDA Medical"}
                    </h2>

                    {price !== undefined &&
                      price !== null && (
                        <strong className="whitespace-nowrap">
                          {price} JOD
                        </strong>
                      )}

                  </div>

                  {description && (
                    <p className="mt-4 text-sm leading-7 opacity-60">
                      {description}
                    </p>
                  )}

                  <div
                    className="
                      mt-7
                      pt-5
                      border-t
                      border-neutral-200
                      dark:border-neutral-800
                      flex
                      items-center
                      justify-between
                      text-sm
                      font-black
                    "
                  >

                    <span>
                      {ar
                        ? "عرض التفاصيل"
                        : "View Details"}
                    </span>

                    <Arrow />

                  </div>

                </div>

              </Link>

            </motion.article>
          );
        })}

      </div>

    </main>
  );
}