import {useState} from "react";
import {useShop} from "../context/ShopContext";
import {api} from "../services/api";
import Receipt from "../components/Receipt";
export default function Checkout(){
 const {cart,setCart,lang}=useShop(); const [form,setForm]=useState({customerName:"",phone:"",city:"",address:"",notes:""}),[done,setDone]=useState(false);
 const sub=cart.reduce((s,i)=>s+i.product.price*i.qty,0),delivery=cart.length?3:0,total=sub+delivery;
 const submit=async e=>{
  e.preventDefault(); if(!cart.length)return alert("Cart is empty");
  const payload={...form,items:cart.map(i=>({productId:i.product.id,name:i.product.nameEn,qty:i.qty,size:i.size,color:i.color,price:i.product.price})),subtotal:sub,deliveryFee:delivery,total,status:"new"};
  const order=await api.createOrder(payload);
  const products=cart.map(i=>`- ${i.product.nameAr} ×${i.qty} = ${i.product.price*i.qty} JOD`).join("\n");
  const msg=`السلام عليكم\n\nطلب جديد من متجر BURDA FASHION\nرقم الطلب: ${order.orderNumber}\nالاسم: ${form.customerName}\nرقم الهاتف: ${form.phone}\nالمدينة: ${form.city}\nالعنوان: ${form.address}\n\nالمنتجات:\n${products}\n\nإجمالي المنتجات: ${sub} JOD\nرسوم التوصيل: ${delivery} JOD\nالإجمالي النهائي: ${total} JOD\nالملاحظات: ${form.notes||"-"}\n\nشكرًا لكم.`;
  setDone(true); setTimeout(()=>window.open(`https://wa.me/962781564086?text=${encodeURIComponent(msg)}`,"_blank"),700);
 };
 return <main className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10">
  <form onSubmit={submit} className="card p-6"><h1 className="text-3xl font-black mb-6">{lang==="ar"?"إتمام الطلب":"Checkout"}</h1>
   {[["customerName","الاسم الكامل"],["phone","رقم الهاتف"],["city","المدينة"],["address","العنوان"]].map(([k,l])=><input key={k} required className="input mb-3" placeholder={l} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>)}
   <textarea className="input min-h-28" placeholder="ملاحظات إضافية" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
   <button className="btn w-full mt-5">تأكيد الطلب عبر WhatsApp</button>
  </form>
  <div>{done?<Receipt items={cart} subtotal={sub} delivery={delivery} total={total}/>:<div className="card p-6"><h2 className="font-black text-xl">ملخص الطلب</h2>{cart.map(i=><div key={i.key} className="flex justify-between py-3 border-b"><span>{i.product.nameAr} ×{i.qty}</span><span>{i.product.price*i.qty} JOD</span></div>)}<div className="flex justify-between pt-5 text-xl font-black"><span>Total</span><span>{total} JOD</span></div></div>}</div>
 </main>
}
