import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import MedicalCategories from "./pages/MedicalCategories";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

import { About, Contact } from "./pages/Static";

export default function App() {
  const loc = useLocation();

  const admin = loc.pathname.startsWith("/admin");

  const home = loc.pathname === "/";

  return (
    <>
      {/* 
        لا نظهر Header القديم في الصفحة الرئيسية
        لأن HeroSection يحتوي Header داخله
      */}

      {!admin && !home && <Header />}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        {/* MEDICAL PRODUCTS PAGE */}

        <Route
          path="/medical"
          element={<MedicalCategories />}
        />

        {/* PRODUCT DETAILS */}

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

      {!admin && <Footer />}
    </>
  );
}