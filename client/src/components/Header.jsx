import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  FaSearch,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaInstagram,
  FaWhatsapp,
  FaUserShield,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useShop } from "../context/ShopContext";

export default function Header() {
  const {
    cart = [],
    lang,
    setLang,
    dark,
    setDark,
  } = useShop();

  const [open, setOpen] = useState(false);

  const count = cart.reduce(
    (total, item) => total + (item.qty || 1),
    0
  );

  const nav =
    lang === "ar"
      ? [
          ["/", "الرئيسية"],
          ["/products", "المنتجات"],
          ["/medical", "التصنيفات"],
          ["/about", "من نحن"],
          ["/contact", "تواصل معنا"],
        ]
      : [
          ["/", "Home"],
          ["/products", "Products"],
          ["/medical", "Categories"],
          ["/about", "About"],
          ["/contact", "Contact"],
        ];

  return (
    <header className="site-header">

      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          h-[74px]
          flex
          items-center
          gap-6
        "
      >

        {/* =========================
            LOGO
        ========================== */}

        <Link
          to="/"
          className="mini-brand"
          aria-label="BURDA FASHION Home"
        >
          <b>
            BURDA
          </b>

          <span>
            FASHION
          </span>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}

        <nav
          className="
            hidden
            lg:flex
            items-center
            justify-center
            gap-7
            text-[13px]
            flex-1
          "
        >
          {nav.map(([to, title]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              {title}
            </NavLink>
          ))}
        </nav>

        {/* =========================
            RIGHT SIDE ACTIONS
        ========================== */}

        <div
          className="
            flex
            items-center
            gap-1
            sm:gap-2
            text-sm
          "
        >

          {/* SEARCH */}

          <Link
            to="/products"
            className="icon-btn hidden sm:grid"
            aria-label="Search products"
          >
            <FaSearch />
          </Link>

          {/* CART */}

          <Link
            to="/cart"
            className="icon-btn relative"
            aria-label="Shopping cart"
          >
            <FaShoppingBag />

            {count > 0 && (
              <span className="cart-badge">
                {count}
              </span>
            )}
          </Link>

          {/* INSTAGRAM */}

          <a
            href="https://www.instagram.com/burdafashion.jo"
            target="_blank"
            rel="noreferrer"
            className="icon-btn hidden md:grid"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          {/* WHATSAPP */}

          <a
            href="https://wa.me/962781564086"
            target="_blank"
            rel="noreferrer"
            className="icon-btn hidden md:grid"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          {/* ADMIN */}

          <Link
            to="/admin/login"
            className="icon-btn hidden md:grid"
            aria-label="Admin"
          >
            <FaUserShield />
          </Link>

          {/* DARK MODE */}

          <button
            type="button"
            className="icon-btn"
            onClick={() => setDark(!dark)}
            aria-label="Toggle dark mode"
          >
            {dark ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}
          </button>

          {/* LANGUAGE */}

          <button
            type="button"
            className="lang-pill"
            onClick={() =>
              setLang(
                lang === "ar"
                  ? "en"
                  : "ar"
              )
            }
          >
            {lang === "ar"
              ? "EN"
              : "AR"}
          </button>

          {/* MOBILE MENU */}

          <button
            type="button"
            className="icon-btn lg:hidden"
            onClick={() =>
              setOpen((current) => !current)
            }
            aria-label="Menu"
          >
            {open ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </div>

      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================== */}

      {open && (
        <div className="mobile-nav lg:hidden">

          {nav.map(([to, title]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() =>
                setOpen(false)
              }
            >
              {title}
            </NavLink>
          ))}

          <div className="flex gap-2 pt-3">

            {/* INSTAGRAM */}

            <a
              className="icon-btn"
              href="https://www.instagram.com/burdafashion.jo"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            {/* WHATSAPP */}

            <a
              className="icon-btn"
              href="https://wa.me/962781564086"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            {/* ADMIN */}

            <Link
              className="icon-btn"
              to="/admin/login"
              onClick={() =>
                setOpen(false)
              }
              aria-label="Admin"
            >
              <FaUserShield />
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}