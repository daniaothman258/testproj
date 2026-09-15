import {Link} from "react-router-dom";
import {useShop} from "../context/ShopContext";
export default function Cart(){
 const {cart,setCart,lang}=useShop(); const sub=cart.reduce((s,i)=>s+i.product.price*i.qty,0),delivery=cart.length?3:0;
 const change=(key,d)=>setCart(c=>c.map(i=>i.key===key?{...i,qty:Math.max(1,i.qty+d)}:i));
 return <main className="max-w-5xl mx-auto px-4 py-12"><h1 className="text-4xl font-black mb-8">{lang==="ar"?"سلة التسوق":"Shopping Cart"}</h1>
  <div className="grid md:grid-cols-[1fr_340px] gap-8">
   <div className="space-y-3">{cart.map(i=><div className="card p-4 flex items-center gap-4" key={i.key}><div className="text-4xl">🥼</div><div className="flex-1"><b>{lang==="ar"?i.product.nameAr:i.product.nameEn}</b><div className="text-xs opacity-50">{i.size} • {i.color}</div></div><button onClick={()=>change(i.key,-1)}>−</button><b>{i.qty}</b><button onClick={()=>change(i.key,1)}>+</button><strong>{i.product.price*i.qty} JOD</strong><button onClick={()=>setCart(c=>c.filter(x=>x.key!==i.key))}>✕</button></div>)}</div>
   <aside className="card p-6 h-fit"><h2 className="font-black text-xl">Order Summary</h2><div className="flex justify-between mt-5"><span>Subtotal</span><span>{sub} JOD</span></div><div className="flex justify-between mt-2"><span>Delivery</span><span>{delivery} JOD</span></div><div className="flex justify-between mt-4 pt-4 border-t font-black text-lg"><span>Total</span><span>{sub+delivery} JOD</span></div><Link to="/checkout" className="btn block text-center mt-6">Checkout</Link><button className="w-full mt-3 text-sm opacity-60" onClick={()=>setCart([])}>Empty Cart</button></aside>
  </div></main>
}
