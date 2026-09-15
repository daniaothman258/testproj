import {motion,AnimatePresence} from "framer-motion";
import {useState} from "react";
export default function Receipt({items,subtotal,delivery,total}){
  const [key,setKey]=useState(1),[torn,setTorn]=useState(false);
  const text=`BURDA FASHION\nSubtotal: ${subtotal} JOD\nDelivery: ${delivery} JOD\nTotal: ${total} JOD`;
  return <div className="max-w-sm mx-auto">
    <div className="h-10 rounded-full bg-black shadow-xl relative z-10"></div>
    <AnimatePresence>
      {!torn&&<motion.div key={key} initial={{y:-260,opacity:0}} animate={{y:0,opacity:1}} exit={{y:160,rotate:8,opacity:0}} transition={{duration:.75}} className="receipt-edge -mt-4 bg-white text-black p-6 pt-10 shadow-xl">
        <div className="text-center font-black tracking-widest">BURDA FASHION</div>
        <div className="border-y my-4 py-3 text-sm space-y-2">{items.map(i=><div key={i.key} className="flex justify-between"><span>{i.product.nameEn} × {i.qty}</span><span>{i.product.price*i.qty} JOD</span></div>)}</div>
        <div className="text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{subtotal} JOD</span></div><div className="flex justify-between"><span>Delivery</span><span>{delivery} JOD</span></div><div className="flex justify-between font-black text-lg mt-2"><span>Total</span><span>{total} JOD</span></div></div>
        <div className="text-center mt-6"><span className="border-4 border-red-600 text-red-600 font-black px-3 py-1 rotate-[-8deg] inline-block">UNPAID</span><div className="tracking-[.2em] text-xl mt-4">||| |||| ||| | ||||</div></div>
      </motion.div>}
    </AnimatePresence>
    <div className="flex justify-center gap-2 mt-4 text-xs">
      <button className="btn" onClick={()=>{setTorn(false);setKey(k=>k+1)}}>Re-print</button>
      <button className="btn" onClick={()=>setTorn(true)}>Tear</button>
      <button className="btn" onClick={()=>navigator.clipboard.writeText(text)}>Copy</button>
    </div>
  </div>
}
