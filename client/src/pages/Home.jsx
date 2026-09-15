import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaShieldAlt,
  FaTruck,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";

import { useShop } from "../context/ShopContext";
import { api } from "../services/api";

import { useState } from "react";

const reviews = [
  {
    name: "Rania",
    text: "خامة مرتبة جدًا وقصّة اللاب كوت فخمة. التغليف كان أنيق.",
  },
  {
    name: "Ahmad",
    text: "سكراب مريح وشكله احترافي، والمقاس كان مضبوط.",
  },
  {
    name: "Lina",
    text: "التجربة من الطلب إلى الاستلام ممتازة، والهوية جميلة جدًا.",
  },
];

export default function Home() {
  const { products, lang } = useShop();

  const [email, setEmail] = useState("");

  const ar = lang === "ar";

  const Arrow = ar
    ? FaArrowLeft
    : FaArrowRight;

  return (
    <main className="overflow-hidden">

      {/* =========================
          NEW HERO SECTION
      ========================== */}

      <HeroSection />

      {/* =========================
          TRUST STRIP
      ========================== */}

      <section className="trust-strip">

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            grid
            sm:grid-cols-3
          "
        >

          {/* QUALITY */}

          <div>

            <FaShieldAlt />

            <span>

              <b>
                {ar
                  ? "جودة مختارة"
                  : "Curated quality"}
              </b>

              <small>
                {ar
                  ? "خامات مناسبة للعمل اليومي"
                  : "Made for everyday clinical work"}
              </small>

            </span>

          </div>

          {/* FAST ORDER + INTERNATIONAL SHIPPING */}

          <div>

            <FaTruck />

            <span>

              <b>
                {ar
                  ? "طلب سريع / شحن خارجي"
                  : "Fast Order / International Shipping"}
              </b>

              <small>
                {ar
                  ? "نوصل طلبك داخل الأردن ويتوفر لدينا شحن خارجي"
                  : "Delivery across Jordan with international shipping available"}
              </small>

            </span>

          </div>

          {/* DIRECT SUPPORT */}

          <div>

            <FaWhatsapp />

            <span>

              <b>
                {ar
                  ? "دعم مباشر"
                  : "Direct support"}
              </b>

              <small>

                <a
                  href="https://wa.me/962781564086"
                  target="_blank"
                  rel="noreferrer"
                >
                  0781564086
                </a>

              </small>

              <small
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "4px",
                }}
              >

                <FaEnvelope size={11} />

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=awawdh111@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  awawdh111@gmail.com
                </a>

              </small>

            </span>

          </div>

        </div>

      </section>

      {/* =========================
          CATEGORIES
      ========================== */}

      <section
        className="
          lux-section
          max-w-7xl
          mx-auto
          px-4
        "
      >

        <div className="section-head">

          <div>

            <span>
              01 / CATEGORIES
            </span>

            <h2>
              {ar
                ? "اختاري أسلوبك"
                : "Choose your world"}
            </h2>

          </div>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          {/* MEDICAL CATEGORY */}

          <Link
            to="/medical"
            className="
              category-card
              category-medical
              group
            "
          >

            <div className="category-number">
              01
            </div>

            <div className="category-orb" />

            <div className="category-coat">
              +
            </div>

            <div className="category-content">

              <span>
                BURDA MEDICAL
              </span>

              <h3>
                {ar
                  ? "ملابس طبية"
                  : "Medical Clothing"}
              </h3>

              <p>
                {ar
                  ? "لاب كوت وسكرابات بتفاصيل عملية ومظهر أنيق."
                  : "Lab coats and scrubs with an elevated professional finish."}
              </p>

              <div className="category-link">

                {ar
                  ? "اكتشف المجموعة"
                  : "Explore collection"}

                <Arrow />

              </div>

            </div>

          </Link>

          {/* FASHION */}

          <div
            className="
              category-card
              category-fashion
            "
          >

            <div className="category-number">
              02
            </div>

            <div className="category-lines" />

            <div className="category-content">

              <span>
                BURDA FASHION
              </span>

              <h3>
                Fashion
              </h3>

              <p>
                {ar
                  ? "المجموعة القادمة قيد التحضير."
                  : "The next collection is being prepared."}
              </p>

              <div className="coming-pill">
                COMING SOON
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          BURDA EDIT / PRODUCTS
      ========================== */}

      <section
        className="
          lux-section
          max-w-7xl
          mx-auto
          px-4
        "
      >

        <div className="section-head">

          <div>

            <span>
              02 / EDIT
            </span>

            <h2>
              {ar
                ? "مختارات BURDA"
                : "BURDA Edit"}
            </h2>

          </div>

          <Link
            to="/products"
            className="
              text-sm
              font-bold
              inline-flex
              items-center
              gap-2
            "
          >

            {ar
              ? "كل المنتجات"
              : "View all"}

            <Arrow />

          </Link>

        </div>

        {products.length ? (

          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >

            {products
              .slice(0, 3)
              .map((p) => (

                <ProductCard
                  key={p.id}
                  p={p}
                />

              ))}

          </div>

        ) : (

          <div className="product-skeleton-grid">

            {[1, 2, 3].map((x) => (

              <div
                key={x}
                className="product-skeleton"
              />

            ))}

          </div>

        )}

      </section>

      {/* =========================
          BRAND STORY
      ========================== */}

      <section className="statement-section">

        <div
          className="
            max-w-6xl
            mx-auto
            px-6
            py-16
            md:py-20
          "
        >

          <div className="max-w-5xl mx-auto">

            <span className="statement-kicker">
              OUR STORY
            </span>

            <h2 className="mt-4">

              {ar
                ? "نحن لا نصنع الأزياء فحسب…"
                : "We don't simply create fashion…"}

            </h2>

            <div
              className="
                mt-7
                text-base
                md:text-lg
                leading-9
                md:leading-10
              "
            >

              {ar ? (

                <>

                  <p>
                    نحن نحافظ على إرثٍ بدأه آباؤنا، ونمنحه اليوم لغةً جديدة تليق بالمستقبل.
                  </p>

                  <p className="mt-6 font-bold text-xl md:text-2xl">

                    من خيطٍ بدأ الحكاية…

                    <br />

                    إلى تصميمٍ يصنع الفرق.

                  </p>

                  <p className="mt-6">

                    وتأتي هذه الخطوة بإشراف وتصميم{" "}

                    <strong>
                      م. أُسامة عواودة
                    </strong>

                    ، امتدادًا لمسيرة بدأت من الحرفة، واستمرت بالشغف، وتتطلع اليوم إلى آفاق جديدة.

                  </p>

                </>

              ) : (

                <>

                  <p>
                    We preserve a legacy that began with our fathers, giving it
                    today a new language worthy of the future.
                  </p>

                  <p className="mt-6 font-bold text-xl md:text-2xl">

                    From a thread that started the story…

                    <br />

                    to a design that makes a difference.

                  </p>

                  <p className="mt-6">

                    This step comes under the supervision and design of{" "}

                    <strong>
                      DF. Osama Awawdeh
                    </strong>

                    , continuing a journey that began with craftsmanship, grew
                    through passion, and now looks toward new horizons.

                  </p>

                </>

              )}

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          REVIEWS
      ========================== */}

      <section
        className="
          lux-section
          max-w-7xl
          mx-auto
          px-4
        "
      >

        <div className="section-head">

          <div>

            <span>
              03 / REVIEWS
            </span>

            <h2>

              {ar
                ? "قالوا عن BURDA"
                : "What clients say"}

            </h2>

          </div>

        </div>

        <div
          className="
            grid
            md:grid-cols-3
            gap-4
          "
        >

          {reviews.map((r, i) => (

            <motion.article
              key={r.name}
              className="review-card"
              whileHover={{
                y: -6,
              }}
            >

              <div className="review-stars">
                ★★★★★
              </div>

              <p>
                “{r.text}”
              </p>

              <div>

                <b>
                  {r.name}
                </b>

                <span>
                  Verified customer
                </span>

              </div>

              <em>
                0{i + 1}
              </em>

            </motion.article>

          ))}

        </div>

      </section>

      {/* =========================
          NEWSLETTER
      ========================== */}

      <section className="newsletter-wrap">

        <div
          className="
            max-w-5xl
            mx-auto
            px-4
          "
        >

          <div className="newsletter-card">

            <span>
              BURDA LETTER
            </span>

            <h2>

              {ar
                ? "خليك أول من يعرف."
                : "Be the first to know."}

            </h2>

            <p>

              {ar
                ? "إطلاقات جديدة، ألوان جديدة، وعروض خاصة بدون إزعاج."
                : "New drops, new colours and private offers — no noise."}

            </p>

            <form
              onSubmit={async (e) => {

                e.preventDefault();

                try {

                  await api.newsletter(email);

                  alert(
                    ar
                      ? "تم الاشتراك بنجاح"
                      : "Subscribed successfully"
                  );

                  setEmail("");

                } catch (e) {

                  alert(e.message);

                }

              }}
            >

              <input
                required
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="email@example.com"
              />

              <button>

                {ar
                  ? "اشتراك"
                  : "Subscribe"}

              </button>

            </form>

            {/* CONTACT EMAIL */}

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=awawdh111@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                mt-5
                text-sm
                opacity-70
                hover:opacity-100
                transition
              "
            >

              <FaEnvelope />

              awawdh111@gmail.com

            </a>

          </div>

        </div>

      </section>

    </main>
  );
}