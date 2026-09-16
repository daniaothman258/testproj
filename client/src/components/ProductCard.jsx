import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaHeart,
  FaRegHeart,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";

import { useShop } from "../context/ShopContext";

export default function ProductCard({ p }) {
  const {
    wishlist,
    setWishlist,
    lang,
  } = useShop();

  const wish = wishlist.includes(p.id);

  const title =
    lang === "ar"
      ? p.nameAr
      : p.nameEn;

  const desc =
    lang === "ar"
      ? p.descriptionAr
      : p.descriptionEn;

  const Arrow =
    lang === "ar"
      ? FaArrowLeft
      : FaArrowRight;

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setWishlist((current) =>
      wish
        ? current.filter((id) => id !== p.id)
        : [...current, p.id]
    );
  };

  return (
    <motion.article
      whileHover={{ y: -7 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        group
        overflow-hidden
        rounded-[26px]
        border
        !border-neutral-200
        !bg-white
        !text-black
        !opacity-100
        shadow-sm
      "
    >
      {/* =========================
          PRODUCT IMAGE
      ========================== */}

      <Link
        to={`/product/${p.id}`}
        className="
          relative
          flex
          aspect-[4/5]
          items-center
          justify-center
          overflow-hidden
          !bg-neutral-100
        "
      >
        {p.images?.[0] ? (
          <img
            loading="lazy"
            src={p.images[0]}
            alt={title}
            className="
              h-full
              w-full
              object-contain
              p-2
              transition
              duration-700
              group-hover:scale-[1.025]
            "
          />
        ) : (
          <div className="text-center !text-black !opacity-100">
            <div
              className="
                mx-auto
                grid
                h-24
                w-24
                place-items-center
                rounded-full
                border
                !border-neutral-300
                text-4xl
                !text-black
                !opacity-100
              "
            >
              +
            </div>

            <div
              className="
                mt-5
                text-[9px]
                tracking-[.28em]
                !text-neutral-600
                !opacity-100
              "
            >
              BURDA MEDICAL
            </div>
          </div>
        )}
      </Link>

      {/* =========================
          WISHLIST
      ========================== */}

      <button
        type="button"
        onClick={toggleWishlist}
        aria-label="Wishlist"
        className="
          absolute
          end-4
          top-4
          z-20
          rounded-full
          !bg-white
          p-3
          !text-black
          !opacity-100
          shadow-sm
          backdrop-blur
          transition
          hover:!bg-black
          hover:!text-white
        "
      >
        {wish ? (
          <FaHeart />
        ) : (
          <FaRegHeart />
        )}
      </button>

      {/* =========================
          BADGES
      ========================== */}

      <div className="absolute start-4 top-4 z-10 flex flex-wrap gap-2">
        {p.isNew && (
          <span
            className="
              rounded-full
              !bg-black
              px-3
              py-1.5
              text-[9px]
              font-bold
              tracking-widest
              !text-white
              !opacity-100
            "
          >
            NEW
          </span>
        )}

        {p.isBestSeller && (
          <span
            className="
              rounded-full
              !bg-white
              px-3
              py-1.5
              text-[9px]
              font-bold
              tracking-widest
              !text-black
              !opacity-100
              shadow-sm
            "
          >
            BEST SELLER
          </span>
        )}
      </div>

      {/* =========================
          PRODUCT CONTENT
      ========================== */}

      <div
        className="
          !bg-white
          p-5
          !text-black
          !opacity-100
        "
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* TITLE + PRICE */}

        <div className="flex items-start justify-between gap-4">
          <Link
            to={`/product/${p.id}`}
            className="!text-black !opacity-100"
          >
            <h3
              className="
                text-xl
                font-black
                tracking-tight
                !text-black
                !opacity-100
              "
            >
              {title}
            </h3>
          </Link>

          <strong
            className="
              whitespace-nowrap
              text-sm
              font-black
              !text-black
              !opacity-100
            "
          >
            {p.price} JOD
          </strong>
        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-2
            min-h-12
            line-clamp-2
            text-xs
            font-medium
            leading-6
            !text-neutral-700
            !opacity-100
          "
        >
          {desc}
        </p>

        {/* DETAILS */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
            border-t
            !border-neutral-200
            pt-4
          "
        >
          <Link
            to={`/product/${p.id}`}
            className="
              text-xs
              font-black
              uppercase
              tracking-wide
              !text-black
              !opacity-100
              transition
              hover:!opacity-60
            "
          >
            {lang === "ar"
              ? "عرض التفاصيل"
              : "View details"}
          </Link>

          <Link
            to={`/product/${p.id}`}
            aria-label="View product details"
            className="
              grid
              h-9
              w-9
              place-items-center
              rounded-full
              border
              !border-neutral-300
              !bg-white
              !text-black
              !opacity-100
              transition
              group-hover:!bg-black
              group-hover:!text-white
            "
          >
            <Arrow size={11} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}