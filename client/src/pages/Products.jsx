import {useMemo,useState} from "react";
import {useShop} from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
export default function Products(){
 const {products,lang}=useShop(); const [q,setQ]=useState(""),[sort,setSort]=useState("newest"),[color,setColor]=useState("");
 const shown=useMemo(()=>{
   let a=products.filter(p=>(`${p.nameAr} ${p.nameEn} ${p.descriptionAr} ${p.descriptionEn}`).toLowerCase().includes(q.toLowerCase()));
   if(color) a=a.filter(p=>p.colors?.includes(color));
   if(sort==="low") a=[...a].sort((x,y)=>x.price-y.price); if(sort==="high") a=[...a].sort((x,y)=>y.price-x.price); if(sort==="best") a=[...a].sort((x,y)=>(y.isBestSeller?1:0)-(x.isBestSeller?1:0));
   return a;
 },[products,q,sort,color]);
 const colors=[...new Set(products.flatMap(p=>p.colors||[]))];
 return <main className="max-w-7xl mx-auto px-4 py-12">
  <h1 className="text-4xl font-black mb-8">{lang==="ar"?"المنتجات":"Products"}</h1>
  <div className="card p-4 grid md:grid-cols-3 gap-3 mb-8">
    <input className="input" placeholder={lang==="ar"?"بحث مباشر...":"Live search..."} value={q} onChange={e=>setQ(e.target.value)}/>
    <select className="input" value={color} onChange={e=>setColor(e.target.value)}><option value="">{lang==="ar"?"كل الألوان":"All colors"}</option>{colors.map(c=><option key={c}>{c}</option>)}</select>
    <select className="input" value={sort} onChange={e=>setSort(e.target.value)}><option value="newest">Newest</option><option value="low">Lowest Price</option><option value="high">Highest Price</option><option value="best">Best Selling</option></select>
  </div>
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{shown.map(p=><ProductCard key={p.id} p={p}/>)}</div>
 </main>
}
