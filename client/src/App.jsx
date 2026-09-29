import { lazy, Suspense } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

/*
  الصفحة الرئيسية نحمّلها مباشرة
  لأنها أول صفحة يراها معظم الزوار.
*/
import Home from "./pages/Home";

/*
  بقية الصفحات يتم تحميلها فقط عند الحاجة.
  هذا يقلل حجم JavaScript المطلوب عند أول دخول للموقع.
*/
const Products = lazy(() =>
  import("./pages/Products")
);

const ProductDetails = lazy(() =>
  import("./pages/ProductDetails")
);

const MedicalCategories = lazy(() =>
  import("./pages/MedicalCategories")
);

const Cart = lazy(() =>
  import("./pages/Cart")
);

const Checkout = lazy(() =>
  import("./pages/Checkout")
);

const AdminLogin = lazy(() =>
  import("./pages/AdminLogin")
);

const Admin = lazy(() =>
  import("./pages/Admin")
);

/*
  Static.jsx يحتوي About و Contact كـ named exports،
  لذلك نحولهما إلى default عند lazy loading.
*/
const About = lazy(() =>
  import("./pages/Static").then((module) => ({
    default: module.About,
  }))
);

const Contact = lazy(() =>
  import("./pages/Static").then((module) => ({
    default: module.Contact,
  }))
);

function PageLoader() {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <span>BURDA</span>
    </div>
  );
}

export default function App() {
  const loc = useLocation();

  const admin =
    loc.pathname.startsWith("/admin");

  const home = loc.pathname === "/";

  return (
    <>
      {/*
        لا نظهر Header القديم في الصفحة الرئيسية
        لأن HeroSection يحتوي Header داخله
      */}
      {!admin && !home && <Header />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/medical"
            element={<MedicalCategories />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="/admin/dashboard"
            element={<Admin />}
          />
        </Routes>
      </Suspense>

      {!admin && <Footer />}
    </>
  );
}