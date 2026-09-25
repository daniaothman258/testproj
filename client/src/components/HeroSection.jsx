import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaSearch,
  FaShoppingBag,
  FaBars,
  FaTimes,
  FaInstagram,
  FaUserShield,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import BurdaLogo from "../assets/logo/burda-logo-original.png";
import { useShop } from "../context/ShopContext";

export default function HeroSection() {
  const {
    cart = [],
    lang,
    setLang,
    dark,
    setDark,
  } = useShop();

  const [menuOpen, setMenuOpen] = useState(false);

  const ar = lang === "ar";

  const cartCount = cart.reduce(
    (total, item) => total + (item.qty || 1),
    0
  );

  const navItems = ar
    ? [
        { label: "الرئيسية", to: "/" },
        { label: "المنتجات", to: "/products" },
        { label: "التصنيفات", to: "/medical" },
        { label: "من نحن", to: "/about" },
        { label: "تواصل معنا", to: "/contact" },
      ]
    : [
        { label: "Home", to: "/" },
        { label: "Products", to: "/products" },
        { label: "Categories", to: "/medical" },
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
      ];

  return (
    <section
      dir="ltr"
      className={`
        relative
        overflow-hidden
        transition-colors
        duration-500
        ${dark ? "bg-black text-white" : "bg-white text-black"}
      `}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`
            absolute
            right-[5%]
            top-[10%]
            h-[45vw]
            w-[45vw]
            max-h-[700px]
            max-w-[700px]
            rounded-full
            blur-[120px]
            ${
              dark
                ? "bg-white/[0.04]"
                : "bg-black/[0.025]"
            }
          `}
        />
      </div>

      {/* HEADER */}
      <header dir="ltr" className="relative z-50">
        <div
          dir="ltr"
          className="
            mx-auto
            flex
            h-[clamp(64px,6vw,92px)]
            w-full
            max-w-[1500px]
            items-center
            justify-between
            gap-3
            px-[clamp(16px,3.2vw,48px)]
          "
        >
          {/* LOGO */}
          <Link
            to="/"
            className="flex shrink-0 items-center"
            aria-label="BURDA Home"
          >
            <img
              src={BurdaLogo}
              alt="BURDA FASHION"
              className={`
                h-[clamp(48px,5.5vw,76px)]
                w-[clamp(38px,4.5vw,64px)]
                object-contain
                object-center
                transition
                ${dark ? "" : "invert"}
              `}
            />
          </Link>

          {/* NAVIGATION */}
          <nav
            dir="ltr"
            className="
              hidden
              min-w-0
              flex-1
              items-center
              justify-center
              gap-[clamp(14px,2.7vw,46px)]
              min-[760px]:flex
            "
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                dir={ar ? "rtl" : "ltr"}
                className={({ isActive }) =>
                  `
                    relative
                    whitespace-nowrap
                    py-3
                    text-[clamp(10px,1vw,14px)]
                    font-medium
                    transition-colors
                    duration-300
                    ${
                      isActive
                        ? dark
                          ? "text-white"
                          : "text-black"
                        : dark
                        ? "text-neutral-400 hover:text-white"
                        : "text-neutral-500 hover:text-black"
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}

                    {isActive && (
                      <motion.span
                        layoutId="burda-navigation-line"
                        className={`
                          absolute
                          bottom-0
                          left-0
                          h-[2px]
                          w-full
                          ${dark ? "bg-white" : "bg-black"}
                        `}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* HEADER ACTIONS */}
          <div
            dir="ltr"
            className="
              flex
              shrink-0
              items-center
              gap-[clamp(1px,0.5vw,8px)]
            "
          >
            {/* SEARCH */}
            <Link
              to="/products"
              aria-label="Search"
              className={`
                grid
                h-[clamp(34px,3.4vw,42px)]
                w-[clamp(34px,3.4vw,42px)]
                place-items-center
                rounded-full
                text-[clamp(14px,1.4vw,19px)]
                transition
                ${
                  dark
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/10"
                }
              `}
            >
              <FaSearch />
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              aria-label="Shopping cart"
              className={`
                relative
                grid
                h-[clamp(34px,3.4vw,42px)]
                w-[clamp(34px,3.4vw,42px)]
                place-items-center
                rounded-full
                text-[clamp(14px,1.4vw,19px)]
                transition
                ${
                  dark
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/10"
                }
              `}
            >
              <FaShoppingBag />

              <span
                className={`
                  absolute
                  -right-1
                  -top-1
                  grid
                  min-h-[17px]
                  min-w-[17px]
                  place-items-center
                  rounded-full
                  px-1
                  text-[8px]
                  font-black
                  ${
                    dark
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }
                `}
              >
                {cartCount}
              </span>
            </Link>

            {/* ADMIN */}
            <Link
              to="/admin/login"
              aria-label="Admin Dashboard"
              title="Admin Dashboard"
              className={`
                hidden
                h-[clamp(34px,3.4vw,42px)]
                w-[clamp(34px,3.4vw,42px)]
                place-items-center
                rounded-full
                text-[clamp(14px,1.4vw,19px)]
                transition
                min-[620px]:grid
                ${
                  dark
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/10"
                }
              `}
            >
              <FaUserShield />
            </Link>

            {/* LIGHT / DARK */}
            <button
              type="button"
              onClick={() => setDark(!dark)}
              aria-label="Change brightness"
              title={dark ? "Light mode" : "Dark mode"}
              className={`
                grid
                h-[clamp(34px,3.4vw,42px)]
                w-[clamp(34px,3.4vw,42px)]
                place-items-center
                rounded-full
                text-[clamp(14px,1.4vw,19px)]
                transition
                ${
                  dark
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/10"
                }
              `}
            >
              {dark ? <FaSun /> : <FaMoon />}
            </button>

            {/* LANGUAGE */}
            <button
              type="button"
              onClick={() => setLang(ar ? "en" : "ar")}
              aria-label="Change language"
              title="Arabic / English"
              className={`
                flex
                h-[clamp(30px,3vw,38px)]
                min-w-[clamp(34px,3.3vw,44px)]
                items-center
                justify-center
                rounded-full
                border
                px-2
                text-[clamp(8px,0.8vw,11px)]
                font-black
                tracking-wider
                transition
                ${
                  dark
                    ? "border-white/30 text-white hover:bg-white hover:text-black"
                    : "border-black/25 text-black hover:bg-black hover:text-white"
                }
              `}
            >
              {ar ? "EN" : "AR"}
            </button>

            {/* MENU */}
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Menu"
              className={`
                grid
                h-[clamp(34px,3.4vw,42px)]
                w-[clamp(34px,3.4vw,42px)]
                place-items-center
                rounded-full
                text-[clamp(16px,1.5vw,21px)]
                transition
                ${
                  dark
                    ? "text-white hover:bg-white/10"
                    : "text-black hover:bg-black/10"
                }
              `}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* DROPDOWN MENU */}
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className={`
              absolute
              right-4
              top-[calc(100%-4px)]
              z-50
              w-[min(80vw,260px)]
              rounded-2xl
              border
              p-5
              shadow-2xl
              backdrop-blur-xl
              ${
                dark
                  ? "border-white/10 bg-neutral-950/95"
                  : "border-black/10 bg-white/95"
              }
            `}
            dir={ar ? "rtl" : "ltr"}
          >
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    border-b
                    py-3
                    text-sm
                    last:border-0
                    ${
                      dark
                        ? "border-white/10 text-neutral-300 hover:text-white"
                        : "border-black/10 text-neutral-700 hover:text-black"
                    }
                  `}
                >
                  {item.label}
                </NavLink>
              ))}

              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className={`
                  mt-3
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-bold
                  ${
                    dark
                      ? "bg-white/10 text-white"
                      : "bg-black/5 text-black"
                  }
                `}
              >
                <FaUserShield />
                {ar ? "لوحة تحكم الأدمن" : "Admin Dashboard"}
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      {/* HERO MAIN */}
      <div
        dir="ltr"
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1500px]
          px-[clamp(14px,3.2vw,48px)]
          pt-5
          pb-4

          md:pt-0
          md:pb-0
        "
      >
        {/* LEFT / MAIN CONTENT */}
        <motion.div
          initial={{
            opacity: 0,
            x: -35,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          dir="ltr"
          className="
            relative
            z-30
            flex
            min-w-0
            flex-col
            justify-center
            py-4

            md:min-h-[calc(100vh-clamp(64px,6vw,92px))]
            md:w-[46%]
            md:py-[clamp(30px,5vw,75px)]
          "
        >
          {/* SMALL TITLE */}
          <span
            dir="ltr"
            className={`
              mb-[clamp(10px,1.5vw,24px)]
              whitespace-nowrap
              text-[clamp(9px,0.75vw,12px)]
              font-semibold
              uppercase
              tracking-[0.30em]
              ${
                dark
                  ? "text-neutral-400"
                  : "text-neutral-500"
              }
            `}
          >
            PREMIUM MEDICAL FASHION
          </span>

          {/* MAIN TITLE */}
          <h1
            dir="ltr"
            className="
              w-full
              max-w-[760px]
              uppercase
              font-black
              text-[clamp(2rem,11vw,6.7rem)]
              leading-[0.86]
              tracking-[-0.03em]

              sm:text-[clamp(2.6rem,9vw,6.7rem)]
              sm:leading-[0.82]
              sm:tracking-[-0.055em]
              sm:w-[105%]
              md:w-[112%]
            "
            style={{
              fontFamily:
                "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
            }}
          >
            <span
              className={`
                block
                ${
                  dark
                    ? "text-[#f7f7f7]"
                    : "text-[#111111]"
                }
              `}
              style={{
                textShadow: dark
                  ? "0 2px 8px rgba(255,255,255,0.08), 0 4px 18px rgba(0,0,0,0.55)"
                  : "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              STYLE
            </span>

            <span
              className={`
                mt-[0.04em]
                block
                ${
                  dark
                    ? "text-[#9a9a9a]"
                    : "text-[#555555]"
                }
              `}
              style={{
                textShadow: dark
                  ? "0 2px 6px rgba(255,255,255,0.025), 0 4px 16px rgba(0,0,0,0.65)"
                  : "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              FOR A
            </span>

            <span
              className={`
                block
                whitespace-normal
                sm:whitespace-nowrap
                ${
                  dark
                    ? "text-[#9a9a9a]"
                    : "text-[#555555]"
                }
              `}
              style={{
                textShadow: dark
                  ? "0 2px 6px rgba(255,255,255,0.025), 0 4px 16px rgba(0,0,0,0.65)"
                  : "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              HEALTHIER YOU
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            dir={ar ? "rtl" : "ltr"}
            className={`
              mt-[clamp(14px,2vw,30px)]
              max-w-[460px]
              pr-2
              text-[clamp(13px,1.05vw,17px)]
              leading-[1.55]
              ${ar ? "text-right" : "text-left"}
              ${
                dark
                  ? "text-neutral-300"
                  : "text-neutral-600"
              }
            `}
          >
            {ar
              ? "ملابس طبية عصرية صُممت للمحترفين الذين يهتمون بالجودة والراحة والأناقة — فقط لدى BURDA."
              : "Modern medical wear designed for professionals who care. Quality, comfort and elegance — only at BURDA."}
          </p>

          {/* BUTTONS */}
          <div
            dir="ltr"
            className="
              mt-[clamp(15px,2vw,30px)]
              flex
              flex-row
              flex-wrap
              items-center
              gap-[clamp(10px,1vw,16px)]

              sm:flex-nowrap
              sm:whitespace-nowrap
            "
          >
            <Link
              to="/products"
              className={`
                group
                inline-flex
                min-h-[clamp(38px,4vw,60px)]
                items-center
                justify-center
                gap-[clamp(10px,2vw,30px)]
                rounded-full
                px-[clamp(16px,2vw,30px)]
                text-[clamp(11px,0.9vw,14px)]
                font-bold
                shadow-lg
                transition
                duration-300
                hover:-translate-y-1
                ${
                  dark
                    ? "bg-white text-black"
                    : "bg-black text-white"
                }
              `}
            >
              <span dir={ar ? "rtl" : "ltr"}>
                {ar ? "تسوق الآن" : "Shop Now"}
              </span>

              <span
                dir="ltr"
                className="text-[clamp(14px,1.5vw,20px)]"
              >
                {ar ? "←" : "→"}
              </span>
            </Link>

            <a
              href="https://www.instagram.com/burdafashion.jo"
              target="_blank"
              rel="noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-[clamp(8px,0.8vw,12px)]
                text-[clamp(11px,0.85vw,14px)]
                font-semibold
              "
            >
              <span
                className={`
                  grid
                  h-[clamp(34px,3.8vw,56px)]
                  w-[clamp(34px,3.8vw,56px)]
                  shrink-0
                  place-items-center
                  rounded-full
                  border
                  text-[clamp(12px,1.15vw,18px)]
                  transition
                  ${
                    dark
                      ? "border-white/70"
                      : "border-black/60"
                  }
                `}
              >
                <FaInstagram />
              </span>

              <span dir={ar ? "rtl" : "ltr"}>
                {ar
                  ? "زوروا موقعنا في انستا"
                  : "Visit us on Instagram"}
              </span>
            </a>
          </div>

          {/* STATS */}
          <div
            dir="ltr"
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-x-[clamp(14px,1.2vw,20px)]
              gap-y-4

              sm:flex-nowrap
              sm:whitespace-nowrap
              md:mt-[clamp(24px,5vw,75px)]
            "
          >
            <div className="min-w-[clamp(70px,8vw,120px)]">
              <strong
                dir="ltr"
                className="
                  block
                  text-[clamp(13px,1.25vw,19px)]
                  font-black
                "
              >
                10K+
              </strong>

              <span
                dir={ar ? "rtl" : "ltr"}
                className={`
                  mt-1
                  block
                  text-[clamp(9px,0.7vw,11px)]
                  ${
                    dark
                      ? "text-neutral-300"
                      : "text-neutral-600"
                  }
                `}
              >
                {ar ? "عملاء سعداء" : "Happy Customers"}
              </span>
            </div>

            <span
              className={`
                h-[clamp(24px,3vw,42px)]
                w-px
                ${
                  dark
                    ? "bg-white/25"
                    : "bg-black/25"
                }
              `}
            />

            <div className="min-w-[clamp(70px,8vw,120px)]">
              <strong
                dir="ltr"
                className="
                  block
                  text-[clamp(13px,1.25vw,19px)]
                  font-black
                "
              >
                500+
              </strong>

              <span
                dir={ar ? "rtl" : "ltr"}
                className={`
                  mt-1
                  block
                  text-[clamp(9px,0.7vw,11px)]
                  ${
                    dark
                      ? "text-neutral-300"
                      : "text-neutral-600"
                  }
                `}
              >
                {ar ? "منتجات طبية" : "Medical Products"}
              </span>
            </div>

            <span
              className={`
                h-[clamp(24px,3vw,42px)]
                w-px
                ${
                  dark
                    ? "bg-white/25"
                    : "bg-black/25"
                }
              `}
            />

            <div className="min-w-[clamp(70px,8vw,120px)]">
              <strong
                dir="ltr"
                className="
                  block
                  text-[clamp(13px,1.25vw,19px)]
                  font-black
                "
              >
                4.9★
              </strong>

              <span
                dir={ar ? "rtl" : "ltr"}
                className={`
                  mt-1
                  block
                  text-[clamp(9px,0.7vw,11px)]
                  ${
                    dark
                      ? "text-neutral-300"
                      : "text-neutral-600"
                  }
                `}
              >
                {ar ? "تقييم العملاء" : "Customer Rating"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}