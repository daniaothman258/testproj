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

  const labCoat = products.find(
    (product) => product.id === "medical-001"
  );

  const scrub = products.find(
    (product) => product.id === "medical-002"
  );

  const medicalProducts = [
    {
      id: "medical-001",
      product: labCoat,
      nameAr: "لاب كوت",
      nameEn: "Lab Coat",
      descriptionAr:
        "لاب كوت طبي أنيق ومريح بتصميم عملي مناسب للعمل اليومي.",
      descriptionEn:
        "Elegant and comfortable medical lab coat designed for everyday professional use.",
    },

    {
      id: "medical-002",
      product: scrub,
      nameAr: "سكراب",
      nameEn: "Scrub Set",
      descriptionAr:
        "سكراب طبي عملي ومريح متوفر بعدة ألوان ومقاسات.",
      descriptionEn:
        "Comfortable professional scrub set available in multiple colours and sizes.",
    },
  ];

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

        {medicalProducts.map((item) => {
          const image =
            item.product?.images?.[0];

          const price =
            item.product?.price;

          return (
            <motion.article
              key={item.id}
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
                to={`/product/${item.id}`}
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
                      alt={
                        ar
                          ? item.nameAr
                          : item.nameEn
                      }
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
                      {item.id === "medical-001"
                        ? "🥼"
                        : "👕"}
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
                      {ar
                        ? item.nameAr
                        : item.nameEn}
                    </h2>

                    {price !== undefined &&
                      price !== null && (
                        <strong className="whitespace-nowrap">
                          {price} JOD
                        </strong>
                      )}

                  </div>

                  <p className="mt-4 text-sm leading-7 opacity-60">
                    {ar
                      ? item.descriptionAr
                      : item.descriptionEn}
                  </p>

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