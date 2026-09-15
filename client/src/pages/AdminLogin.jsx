import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {api} from "../services/api";
export default function AdminLogin(){
 const [username,setU]=useState(""),[password,setP]=useState(""),[err,setErr]=useState(""); const nav=useNavigate();
 const submit=async e=>{e.preventDefault();try{const r=await api.login({username,password});localStorage.setItem("burda_admin_token",r.token);nav("/admin")}catch(e){setErr(e.message)}};
 return <main className="min-h-screen bg-black text-white flex items-center justify-center p-4"><form onSubmit={submit} className="w-full max-w-md border border-neutral-800 rounded-[32px] p-8 bg-neutral-950 shadow-2xl"><div className="text-center font-black text-3xl tracking-widest">BURDA</div><div className="text-center text-xs tracking-[.5em] opacity-50">ADMIN</div><input className="input mt-8" placeholder="Username" value={username} onChange={e=>setU(e.target.value)}/><input type="password" className="input mt-3" placeholder="Password" value={password} onChange={e=>setP(e.target.value)}/>{err&&<p className="text-red-400 text-sm mt-3">{err}</p>}<button className="bg-white text-black rounded-full py-3 w-full mt-6 font-bold">Login</button></form></main>
}
