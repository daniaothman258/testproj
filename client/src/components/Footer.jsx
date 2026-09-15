import {Link} from 'react-router-dom';
import {FaWhatsapp,FaInstagram,FaArrowUp} from 'react-icons/fa';
import {useShop} from '../context/ShopContext';
export default function Footer(){
 const {lang}=useShop(), ar=lang==='ar';
 return <footer className="bg-[#050505] text-white">
  <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 grid sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 text-sm">
    <div><div className="text-3xl font-black tracking-[.08em]">BURDA</div><div className="text-[10px] tracking-[.48em] opacity-60 mt-1">FASHION</div><p className="opacity-50 mt-5 max-w-xs leading-7">{ar?'ملابس طبية وهوية أنيقة بتفاصيل بسيطة ومدروسة.':'Premium medical wear with a refined, minimal identity.'}</p></div>
    <div><h4 className="font-bold mb-4 text-xs tracking-wider">{ar?'روابط سريعة':'QUICK LINKS'}</h4><div className="grid gap-3 opacity-55"><Link to="/">{ar?'الرئيسية':'Home'}</Link><Link to="/products">{ar?'المنتجات':'Products'}</Link><Link to="/about">{ar?'من نحن':'About'}</Link><Link to="/contact">{ar?'تواصل معنا':'Contact'}</Link></div></div>
    <div><h4 className="font-bold mb-4 text-xs tracking-wider">{ar?'خدمة العملاء':'CUSTOMER CARE'}</h4><div className="grid gap-3 opacity-55"><span>{ar?'سياسة الشحن':'Shipping policy'}</span><span>{ar?'الخصوصية':'Privacy'}</span><span>{ar?'الشروط والأحكام':'Terms & Conditions'}</span></div></div>
    <div><h4 className="font-bold mb-4 text-xs tracking-wider">{ar?'تواصل':'CONTACT'}</h4><p className="opacity-55">078 156 4086</p><div className="flex gap-2 mt-5"><a className="w-10 h-10 rounded-full border border-neutral-800 grid place-items-center" href="https://wa.me/962781564086" target="_blank" rel="noreferrer"><FaWhatsapp/></a><a className="w-10 h-10 rounded-full border border-neutral-800 grid place-items-center" href="https://www.instagram.com/burdafashion.jo" target="_blank" rel="noreferrer"><FaInstagram/></a></div></div>
  </div>
  <div className="max-w-7xl mx-auto px-4 border-t border-neutral-900 py-6 text-[10px] opacity-40 flex justify-between gap-4"><span>© {new Date().getFullYear()} BURDA FASHION</span><span>AMMAN · JORDAN</span></div>
  <a className="fixed bottom-5 end-5 z-40 bg-white text-black rounded-full w-11 h-11 grid place-items-center shadow-xl border border-black/10" href="#" aria-label="Back to top"><FaArrowUp size={13}/></a>
 </footer>
}
