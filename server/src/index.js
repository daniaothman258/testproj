import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import {
  initDb,
  Admin,
  Product,
  Order,
  Visitor,
  Newsletter,
  normalizeProduct,
  normalizeOrder
} from "./db.js";


/* =========================================================
   APP INITIALIZATION
========================================================= */

const app = express();

await initDb();

const __dirname = path.dirname(
  fileURLToPath(import.meta.url)
);

const uploadsDir = path.resolve(
  __dirname,
  "../uploads"
);

fs.mkdirSync(uploadsDir, {
  recursive: true
});


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin:
      process.env.CLIENT_ORIGIN ||
      "http://localhost:5173"
  })
);

app.use(
  express.json({
    limit: "10mb"
  })
);

app.use(
  "/uploads",
  express.static(uploadsDir)
);


/* =========================================================
   JWT
========================================================= */

const secret =
  process.env.JWT_SECRET ||
  "dev-secret-change-me";


function auth(req, res, next) {
  const token =
    req.headers.authorization?.replace(
      "Bearer ",
      ""
    );

  if (!token) {
    return res
      .status(401)
      .json({
        message: "Unauthorized"
      });
  }

  try {
    req.admin = jwt.verify(
      token,
      secret
    );

    next();
  } catch {
    return res
      .status(401)
      .json({
        message: "Invalid session"
      });
  }
}


/* =========================================================
   FILE UPLOAD
========================================================= */

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(
      null,
      uploadsDir
    );
  },

  filename: (_, file, cb) => {
    const safe =
      file.originalname.replace(
        /[^\w.\-]+/g,
        "-"
      );

    cb(
      null,
      `${Date.now()}-${safe}`
    );
  }
});


const upload = multer({
  storage,

  limits: {
    fileSize:
      6 * 1024 * 1024
  }
});


/* =========================================================
   HEALTH
========================================================= */

app.get(
  "/api/health",
  (_, res) => {
    res.json({
      ok: true,
      database: "mongodb"
    });
  }
);


/* =========================================================
   ADMIN LOGIN
========================================================= */

app.post(
  "/api/auth/login",
  async (req, res) => {
    try {
      const {
        username,
        password
      } = req.body;

      const admin =
        await Admin.findOne({
          username
        });

      if (
        !admin ||
        !(await bcrypt.compare(
          password,
          admin.password_hash
        ))
      ) {
        return res
          .status(401)
          .json({
            message:
              "بيانات الدخول غير صحيحة"
          });
      }

      const token =
        jwt.sign(
          {
            id:
              admin._id.toString(),

            username:
              admin.username
          },

          secret,

          {
            expiresIn: "8h"
          }
        );

      res.json({
        token,

        user: {
          username:
            admin.username
        }
      });
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "حدث خطأ أثناء تسجيل الدخول"
        });
    }
  }
);


/* =========================================================
   PRODUCT HELPERS
========================================================= */

function productValues(body) {
  return {
    id:
      body.id ||
      `product-${Date.now()}`,

    name_ar:
      body.nameAr ||
      body.name_ar ||
      "",

    name_en:
      body.nameEn ||
      body.name_en ||
      "",

    category:
      body.category ||
      "medical-clothing",

    description_ar:
      body.descriptionAr ||
      body.description_ar ||
      "",

    description_en:
      body.descriptionEn ||
      body.description_en ||
      "",

    price:
      Number(
        body.price || 0
      ),

    old_price:
      Number(
        body.oldPrice ??
        body.old_price ??
        0
      ),

    stock:
      Number(
        body.stock || 0
      ),

    colors:
      Array.isArray(
        body.colors
      )
        ? body.colors
        : [],

    sizes:
      Array.isArray(
        body.sizes
      )
        ? body.sizes
        : [],

    fragrances:
      Array.isArray(
        body.fragrances
      )
        ? body.fragrances
        : [],

    images:
      Array.isArray(
        body.images
      )
        ? body.images
        : [],

    is_new:
      body.isNew ??
      body.is_new ??
      false,

    is_best_seller:
      body.isBestSeller ??
      body.is_best_seller ??
      false,

    is_active:
      body.isActive === false ||
      body.is_active === false
        ? false
        : true
  };
}


/* =========================================================
   PUBLIC PRODUCTS
========================================================= */

app.get(
  "/api/products",
  async (_, res) => {
    try {
      const rows =
        await Product.find({
          is_active: true
        }).sort({
          created_at: -1
        });

      res.json(
        rows.map(
          normalizeProduct
        )
      );
    } catch (error) {
      console.error(
        "Products error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to load products"
        });
    }
  }
);


app.get(
  "/api/products/:id",
  async (req, res) => {
    try {
      const row =
        await Product.findOne({
          id: req.params.id
        });

      if (!row) {
        return res
          .status(404)
          .json({
            message:
              "Not found"
          });
      }

      res.json(
        normalizeProduct(
          row
        )
      );
    } catch (error) {
      console.error(
        "Product details error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to load product"
        });
    }
  }
);


/* =========================================================
   ADMIN PRODUCTS
========================================================= */

app.get(
  "/api/admin/products",
  auth,
  async (_, res) => {
    try {
      const rows =
        await Product.find()
          .sort({
            created_at: -1
          });

      res.json(
        rows.map(
          normalizeProduct
        )
      );
    } catch (error) {
      console.error(
        "Admin products error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to load products"
        });
    }
  }
);


app.post(
  "/api/admin/products",
  auth,
  async (req, res) => {
    try {
      const values =
        productValues(
          req.body
        );

      const product =
        await Product.create(
          values
        );

      res
        .status(201)
        .json(
          normalizeProduct(
            product
          )
        );
    } catch (error) {
      console.error(
        "Create product error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to create product"
        });
    }
  }
);


app.put(
  "/api/admin/products/:id",
  auth,
  async (req, res) => {
    try {
      const values =
        productValues({
          ...req.body,
          id: req.params.id
        });

      delete values.id;

      const product =
        await Product.findOneAndUpdate(
          {
            id: req.params.id
          },

          {
            $set: values
          },

          {
            new: true,
            runValidators: true
          }
        );

      if (!product) {
        return res
          .status(404)
          .json({
            message:
              "Product not found"
          });
      }

      res.json(
        normalizeProduct(
          product
        )
      );
    } catch (error) {
      console.error(
        "Update product error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to update product"
        });
    }
  }
);


app.delete(
  "/api/admin/products/:id",
  auth,
  async (req, res) => {
    try {
      const product =
        await Product.findOneAndDelete({
          id:
            req.params.id
        });

      if (!product) {
        return res
          .status(404)
          .json({
            message:
              "Product not found"
          });
      }

      res.json({
        ok: true
      });
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to delete product"
        });
    }
  }
);


/* =========================================================
   ADMIN IMAGE UPLOAD
========================================================= */

app.post(
  "/api/admin/upload",
  auth,
  upload.array(
    "images",
    8
  ),

  (req, res) => {
    const urls =
      (req.files || []).map(
        (file) =>
          `/uploads/${file.filename}`
      );

    res.json({
      urls
    });
  }
);


/* =========================================================
   ORDERS
========================================================= */

app.post(
  "/api/orders",
  async (req, res) => {
    try {
      const {
        customerName,
        phone,
        city,
        address,
        notes = "",
        items = [],
        subtotal = 0,
        deliveryFee = 0,
        total = 0,
        status = "new",
        completed = false
      } = req.body;

      const orderNumber =
        `BURDA-${Date.now()
          .toString()
          .slice(-8)}`;

      const order =
        await Order.create({
          order_number:
            orderNumber,

          customer_name:
            customerName,

          phone,

          city,

          address,

          notes,

          items,

          subtotal:
            Number(subtotal),

          delivery_fee:
            Number(deliveryFee),

          total:
            Number(total),

          status,

          completed:
            Boolean(
              completed
            )
        });

      res
        .status(201)
        .json({
          id:
            order._id.toString(),

          orderNumber
        });
    } catch (error) {
      console.error(
        "Create order error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to create order"
        });
    }
  }
);


app.get(
  "/api/admin/orders",
  auth,
  async (_, res) => {
    try {
      const rows =
        await Order.find()
          .sort({
            created_at: -1
          });

      res.json(
        rows.map(
          normalizeOrder
        )
      );
    } catch (error) {
      console.error(
        "Orders error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to load orders"
        });
    }
  }
);


app.put(
  "/api/admin/orders/:id/status",
  auth,
  async (req, res) => {
    try {
      const {
        status
      } = req.body;

      const order =
        await Order.findByIdAndUpdate(
          req.params.id,

          {
            $set: {
              status,

              completed:
                status ===
                "completed"
            }
          },

          {
            new: true
          }
        );

      if (!order) {
        return res
          .status(404)
          .json({
            message:
              "Order not found"
          });
      }

      res.json({
        ok: true
      });
    } catch (error) {
      console.error(
        "Update order error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to update order"
        });
    }
  }
);


/* =========================================================
   VISITORS
========================================================= */

app.post(
  "/api/visit",
  async (req, res) => {
    try {
      const date =
        new Date()
          .toISOString()
          .slice(
            0,
            10
          );

      await Visitor.create({
        visit_date:
          date,

        session_key:
          req.body
            .sessionKey ||
          ""
      });

      res.json({
        ok: true
      });
    } catch (error) {
      console.error(
        "Visit error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to record visit"
        });
    }
  }
);


/* =========================================================
   ADMIN STATS
========================================================= */

app.get(
  "/api/admin/stats",
  auth,
  async (_, res) => {
    try {
      const today =
        new Date()
          .toISOString()
          .slice(
            0,
            10
          );

      const [
        visits,
        visitsToday,
        totalProducts,
        totalOrders,
        incompleteOrders
      ] =
        await Promise.all([
          Visitor.countDocuments(),

          Visitor.countDocuments({
            visit_date:
              today
          }),

          Product.countDocuments(),

          Order.countDocuments(),

          Order.countDocuments({
            completed:
              false
          })
        ]);

      const daily =
        await Visitor.aggregate([
          {
            $group: {
              _id:
                "$visit_date",

              count: {
                $sum: 1
              }
            }
          },

          {
            $sort: {
              _id: -1
            }
          },

          {
            $limit: 7
          }
        ]);

      const formattedDaily =
        daily
          .reverse()
          .map(
            (item) => ({
              date:
                item._id,

              count:
                item.count
            })
          );

      res.json({
        visits,

        visitsToday,

        totalProducts,

        totalOrders,

        incompleteOrders,

        daily:
          formattedDaily
      });
    } catch (error) {
      console.error(
        "Stats error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to load statistics"
        });
    }
  }
);


/* =========================================================
   NEWSLETTER
========================================================= */

app.post(
  "/api/newsletter",
  async (req, res) => {
    try {
      const email =
        String(
          req.body.email ||
          ""
        )
          .trim()
          .toLowerCase();

      if (!email) {
        return res
          .status(400)
          .json({
            message:
              "Email is required"
          });
      }

      await Newsletter.create({
        email
      });

      res.json({
        ok: true
      });
    } catch (error) {
      if (
        error?.code ===
        11000
      ) {
        return res
          .status(409)
          .json({
            message:
              "Email already subscribed"
          });
      }

      console.error(
        "Newsletter error:",
        error
      );

      res
        .status(500)
        .json({
          message:
            "Unable to subscribe"
        });
    }
  }
);


/* =========================================================
   START SERVER
========================================================= */

const port =
  process.env.PORT ||
  5000;

app.listen(
  port,
  () => {
    console.log(
      `BURDA server running on http://localhost:${port}`
    );
  }
);