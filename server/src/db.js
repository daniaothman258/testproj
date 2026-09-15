import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* =========================================================
   ADMIN
========================================================= */

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password_hash: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

export const Admin = mongoose.model("Admin", adminSchema);


/* =========================================================
   PRODUCT
========================================================= */

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },

    name_ar: {
      type: String,
      required: true
    },

    name_en: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true,
      default: "medical-clothing"
    },

    description_ar: {
      type: String,
      default: ""
    },

    description_en: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      default: 0
    },

    old_price: {
      type: Number,
      default: 0
    },

    stock: {
      type: Number,
      default: 0
    },

    colors: {
      type: [String],
      default: []
    },

    sizes: {
      type: [String],
      default: []
    },

    fragrances: {
      type: [String],
      default: []
    },

    images: {
      type: [String],
      default: []
    },

    is_new: {
      type: Boolean,
      default: false
    },

    is_best_seller: {
      type: Boolean,
      default: false
    },

    is_active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

export const Product = mongoose.model("Product", productSchema);


/* =========================================================
   ORDER
========================================================= */

const orderSchema = new mongoose.Schema(
  {
    order_number: {
      type: String,
      required: true,
      unique: true
    },

    customer_name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    notes: {
      type: String,
      default: ""
    },

    items: {
      type: Array,
      default: []
    },

    subtotal: {
      type: Number,
      required: true,
      default: 0
    },

    delivery_fee: {
      type: Number,
      required: true,
      default: 0
    },

    total: {
      type: Number,
      required: true,
      default: 0
    },

    status: {
      type: String,
      default: "new"
    },

    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

export const Order = mongoose.model("Order", orderSchema);


/* =========================================================
   VISITOR
========================================================= */

const visitorSchema = new mongoose.Schema(
  {
    visit_date: {
      type: String,
      required: true
    },

    session_key: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false
    }
  }
);

export const Visitor = mongoose.model("Visitor", visitorSchema);


/* =========================================================
   NEWSLETTER
========================================================= */

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false
    }
  }
);

export const Newsletter = mongoose.model(
  "Newsletter",
  newsletterSchema
);


/* =========================================================
   INITIAL DATABASE CONNECTION + SEED
========================================================= */

export async function initDb() {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is missing from server/.env"
    );
  }

  await mongoose.connect(process.env.MONGODB_URI);

  console.log("MongoDB Atlas connected successfully");

  /* ===================== ADMIN ===================== */

  const adminUsername =
    process.env.ADMIN_USERNAME || "OSAMA25";

  const adminPassword =
    process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error(
      "ADMIN_PASSWORD is missing from server/.env"
    );
  }

  const existingAdmin = await Admin.findOne({
    username: adminUsername
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(
      adminPassword,
      12
    );

    await Admin.create({
      username: adminUsername,
      password_hash: passwordHash
    });

    console.log("Admin account created");
  }

  /* ===================== PRODUCTS ===================== */

  const productCount = await Product.countDocuments();

  if (productCount === 0) {
    await Product.insertMany([
      {
        id: "medical-001",

        name_ar: "لاب كوت",

        name_en: "Lab Coat",

        category: "medical-clothing",

        description_ar:
          "لاب كوت طبي أنيق بقصة عملية وخامة مرنة ومريحة للاستخدام اليومي.",

        description_en:
          "Elegant medical lab coat with a practical cut and flexible, comfortable fabric.",

        price: 10,

        old_price: 0,

        stock: 50,

        colors: [
          "White"
        ],

        sizes: [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],

        fragrances: [],

        images: [
          "/products/Lab Coat.jpeg",
          "/products/Lab Coat detilas.jpeg"
        ],

        is_new: true,

        is_best_seller: true,

        is_active: true
      },

      {
        id: "medical-002",

        name_ar: "طقم سكراب",

        name_en: "Scrub Set",

        category: "medical-clothing",

        description_ar:
          "طقم سكراب طبي مريح بمظهر احترافي، مناسب للمناوبات الطويلة والعمل السريري.",

        description_en:
          "Comfortable professional scrub set designed for long shifts and clinical work.",

        price: 25,

        old_price: 0,

        stock: 75,

        colors: [
          "Navy",
          "Black",
          "White",
          "Royal Blue",
          "Burgundy",
          "Olive",
          "Grey",
          "Ceil Blue"
        ],

        sizes: [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "3XL"
        ],

        fragrances: [],

        images: [
          "/products/Scrub Set.jpeg"
        ],

        is_new: true,

        is_best_seller: false,

        is_active: true
      }
    ]);

    console.log("Initial BURDA products added");
  }

  return mongoose.connection;
}


/* =========================================================
   PRODUCT NORMALIZER

   Keeps the SAME field names used by the React frontend.
========================================================= */

export function normalizeProduct(product) {
  if (!product) return product;

  const row =
    typeof product.toObject === "function"
      ? product.toObject()
      : product;

  return {
    id: row.id,

    name_ar: row.name_ar,
    name_en: row.name_en,

    nameAr: row.name_ar,
    nameEn: row.name_en,

    category: row.category,

    description_ar: row.description_ar,
    description_en: row.description_en,

    descriptionAr: row.description_ar,
    descriptionEn: row.description_en,

    price: row.price,

    old_price: row.old_price,
    oldPrice: row.old_price,

    stock: row.stock,

    colors: row.colors || [],
    sizes: row.sizes || [],
    fragrances: row.fragrances || [],
    images: row.images || [],

    is_new: row.is_new,
    is_best_seller: row.is_best_seller,
    is_active: row.is_active,

    isNew: !!row.is_new,
    isBestSeller: !!row.is_best_seller,
    isActive: !!row.is_active,

    created_at: row.created_at,
    updated_at: row.updated_at
  };
}


/* =========================================================
   ORDER NORMALIZER
========================================================= */

export function normalizeOrder(order) {
  if (!order) return order;

  const row =
    typeof order.toObject === "function"
      ? order.toObject()
      : order;

  return {
    id: row._id?.toString(),

    order_number: row.order_number,
    orderNumber: row.order_number,

    customer_name: row.customer_name,
    customerName: row.customer_name,

    phone: row.phone,

    city: row.city,

    address: row.address,

    notes: row.notes || "",

    items: row.items || [],

    subtotal: row.subtotal,

    delivery_fee: row.delivery_fee,
    deliveryFee: row.delivery_fee,

    total: row.total,

    status: row.status,

    completed: !!row.completed,

    created_at: row.created_at,

    updated_at: row.updated_at
  };
}