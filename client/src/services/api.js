const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const API_URL = BASE;

async function req(path, options = {}) {
  const token = localStorage.getItem('burda_admin_token');

  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { 'Content-Type': 'application/json' }),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let r;

  try {
    r = await fetch(`${BASE}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      'تعذر الاتصال بالسيرفر. يرجى المحاولة مرة أخرى.'
    );
  }

  const data = await r.json().catch(() => ({}));

  if (!r.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const api = {
  products: () =>
    req('/api/products'),

  product: (id) =>
    req(`/api/products/${id}`),

  adminProducts: () =>
    req('/api/admin/products'),

  addProduct: (p) =>
    req('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify(p),
    }),

  updateProduct: (id, p) =>
    req(`/api/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(p),
    }),

  deleteProduct: (id) =>
    req(`/api/admin/products/${id}`, {
      method: 'DELETE',
    }),

  login: (body) =>
    req('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  createOrder: (body) =>
    req('/api/orders', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  orders: () =>
    req('/api/admin/orders'),

  status: (id, status) =>
    req(`/api/admin/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),

  stats: () =>
    req('/api/admin/stats'),

  visit: (sessionKey) =>
    req('/api/visit', {
      method: 'POST',
      body: JSON.stringify({ sessionKey }),
    }),

  newsletter: (email) =>
    req('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  upload: async (files) => {
    const fd = new FormData();

    [...files].forEach((f) =>
      fd.append('images', f)
    );

    return req('/api/admin/upload', {
      method: 'POST',
      body: fd,
    });
  },
};