import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { api } from "../services/api";

const C = createContext();

const read = (k, f) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? f;
  } catch {
    return f;
  }
};

export function ShopProvider({ children }) {
  /*
    نعرض آخر نسخة محفوظة من المنتجات فورًا.
    ثم نطلب النسخة الأحدث من السيرفر في الخلفية.
  */
  const [products, setProducts] = useState(() =>
    read("burda_products_cache", [])
  );

  const [cart, setCart] = useState(() =>
    read("burda_cart", [])
  );

  const [wishlist, setWishlist] = useState(() =>
    read("burda_wishlist", [])
  );

  const [lang, setLang] = useState(
    () => localStorage.getItem("burda_lang") || "ar"
  );

  const [dark, setDark] = useState(() =>
    read("burda_dark", false)
  );

  /*
    PRODUCTS

    لا نمسح المنتجات المحفوظة إذا كان Render بطيئًا.
    عندما تصل البيانات الجديدة نحفظها ونحدّث الصفحة.
  */
  useEffect(() => {
    let active = true;

    api
      .products()
      .then((data) => {
        if (!active) return;

        const freshProducts = Array.isArray(data)
          ? data
          : [];

        setProducts(freshProducts);

        localStorage.setItem(
          "burda_products_cache",
          JSON.stringify(freshProducts)
        );
      })
      .catch(() => {
        /*
          إذا كان السيرفر بطيئًا أو غير متاح مؤقتًا،
          نبقي المنتجات المحفوظة بدل تحويلها إلى [].
        */
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "burda_cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "burda_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("burda_lang", lang);

    document.documentElement.dir =
      lang === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(
      "burda_dark",
      JSON.stringify(dark)
    );

    document.documentElement.classList.toggle(
      "dark",
      dark
    );
  }, [dark]);

  useEffect(() => {
    let key =
      sessionStorage.getItem("burda_session");

    if (!key) {
      key = crypto.randomUUID();

      sessionStorage.setItem(
        "burda_session",
        key
      );

      api.visit(key).catch(() => {});
    }
  }, []);

  const add = (p, options = {}) => {
    setCart((c) => {
      const key = `${p.id}-${options.size || ""}-${
        options.color || ""
      }`;

      const found = c.find(
        (x) => x.key === key
      );

      if (found) {
        return c.map((x) =>
          x.key === key
            ? {
                ...x,
                qty:
                  x.qty +
                  (options.qty || 1),
              }
            : x
        );
      }

      return [
        ...c,
        {
          key,
          product: p,
          qty: options.qty || 1,
          size:
            options.size ||
            p.sizes?.[0],
          color:
            options.color ||
            p.colors?.[0],
        },
      ];
    });
  };

  const value = useMemo(
    () => ({
      products,
      setProducts,
      cart,
      setCart,
      wishlist,
      setWishlist,
      lang,
      setLang,
      dark,
      setDark,
      add,
    }),
    [
      products,
      cart,
      wishlist,
      lang,
      dark,
    ]
  );

  return (
    <C.Provider value={value}>
      {children}
    </C.Provider>
  );
}

export const useShop = () =>
  useContext(C);