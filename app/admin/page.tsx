'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const GAS = 'https://script.google.com/macros/s/AKfycbzA-89t5g8RFrlqejtUTXvJ166OE2qz2JOLzxuzmJ3doRXpnV31mmD81Lfu1ftMtb6Y/exec';
const CRED = { u: 'nonghan', p: 'nonghan11018' };

const STATUSES = ['รอดำเนินการ','รับเรื่อง','ส่งเรื่อง','รอตอบกลับ','ปิดเรื่องได้','ปิดเรื่องไม่ได้','ทบทวนผู้บริหารรับทราบ'];
const DEPTS = ['','งานธุรการ','งาน CKD','งาน LAB','องค์กรแพทย์','งานกายภาพบำบัด','งานการพยาบาล','งานการพยาบาลป่วยผ่าตัดฯ','งานการพยาบาลผู้คลอด','งานการพยาบาลผู้ป่วยนอก','งานการพยาบาลผู้ป่วยหนัก','งานการพยาบาลผู้ป่วยอุบัติเหตุฯ','งานการพยาบาลผู้ป่วยใน (ชาย)','งานการพยาบาลผู้ป่วยใน (พิเศษ)','งานการพยาบาลผู้ป่วยใน (หญิง)','งานการพยาบาลผู้ป่วยใน (เด็ก)','งานการเงินและบัญชี','งานคลินิกพิเศษ','งานคุณภาพ QIC','งานซ่อมบำรุง','งานทรัพยากรบุคคล','งานทันตกรรม','งานบริหารทั่วไป','งานปฐมภูมิ','งานประกันสุขภาพ','งานประชาสัมพันธ์','งานพยาบาลควบคุมการติดเชื้อฯ','งานพัสดุ','งานยานพาหนะ','งานรักษาความปลอดภัย','งานรังสีวิทยา','งานสุขภาพจิต','งานสุขาภิบาล','งานสูติ-นรีเวช','งานเทคโนโลยีสารสนเทศฯ','งานเภสัชกรรมผู้ป่วยนอก','งานเภสัชกรรมผู้ป่วยใน','งานเวชระเบียนฯ','งานแผนงานและประเมินผล','งานแพทย์แผนไทย','งานโภชนศาสตร์','งานโสตทัศนศึกษา'];

type Row = string[];
const ns = (s:string) => ['ทบทวนแล้ว','ผู้บริหารรับทราบ'].includes(s)?'ทบทวนผู้บริหารรับทราบ':(s||'รอดำเนินการ');
const SC:Record<string,[string,string,string]> = {'รอดำเนินการ':['#fffbeb','#d97706','#fde68a'],'รับเรื่อง':['#eff6ff','#2563eb','#bfdbfe'],'ส่งเรื่อง':['#f0fdfa','#0d9488','#ccfbf1'],'รอตอบกลับ':['#fefce8','#ca8a04','#fef08a'],'ปิดเรื่องได้':['#f0fdf4','#16a34a','#bbf7d0'],'ปิดเรื่องไม่ได้':['#fef2f2','#dc2626','#fecaca'],'ทบทวนผู้บริหารรับทราบ':['#faf5ff','#9333ea','#e9d5ff']};
const sb = (s:string) => SC[s]??['#f8fafc','#475569','#e2e8f0'];
const ir = (d:string,s:string,e:string) => {const dt=new Date(d);dt.setHours(0,0,0,0);if(s){const x=new Date(s);x.setHours(0,0,0,0);if(dt<x)return false;}if(e){const x=new Date(e);x.setHours(0,0,0,0);if(dt>x)return false;}return true;};

export default function AdminPage() {
  const [view,sv]=useState<'login'|'app'>('login');
  const [nav,sn]=useState<'dash'|'list'>('dash');
  const [u,su]=useState('');const [p,sp]=useState('');const [le,sle]=useState('');
  const [data,sd]=useState<Row[]>([]);const [load,sl]=useState(false);const [ferr,sfe]=useState('');
  const [ds,sds]=useState('');const [de,sde]=useState('');
  const [q,sq]=useState('');const [ms,sms]=useState('');const [me,sme]=useState('');
  const [rpp,srpp]=useState(10);const [pg,spg]=useState(1);
  const [editR,seR]=useState<Row|null>(null);const [est,ses]=useState('');const [edp,sed]=useState('');const [en,sen]=useState('');const [ef,sef]=useState<File|null>(null);
  const [sav,ssav]=useState('');const [detR,sdR]=useState<Row|null>(null);
  const s1=useRef<HTMLCanvasElement>(null);const s2=useRef<HTMLCanvasElement>(null);const s3=useRef<HTMLCanvasElement>(null);const s4=useRef<HTMLCanvasElement>(null);
  const ci=useRef<Record<string,{destroy?:()=>void}>>({});

  const dashD=data.filter(r=>ir(r[0],ds,de));
  const listD=data.filter(r=>{if(!ir(r[0],ms,me))return false;if(q&&!r.join(' ').toLowerCase().includes(q.toLowerCase()))return false;return true;});
  const tp=Math.ceil(listD.length/rpp);
  const pd=listD.slice((pg-1)*rpp,pg*rpp);

  const fetchD=useCallback(async()=>{
    sl(true);sfe('');
    try{const r=await fetch(`${GAS}?action=getData`,{redirect:'follow'});if(!r.ok)throw new Error();const j=await r.json();const rows:Row[]=Array.isArray(j)?j:[];if(rows.length)rows.shift();rows.sort((a,b)=>new Date(b[0]).getTime()-new Date(a[0]).getTime());sd(rows.map(r=>{r[0]=r[0]?.toString()||'';return r;}));}
    catch{sfe('โหลดข้อมูลไม่สำเร็จ — กรุณาตรวจสอบ Apps Script');}finally{sl(false);}
  },[]);

  useEffect(()=>{if(view==='app')fetchD();},[view,fetchD]);

  useEffect(()=>{
    if(nav!=='dash'||!dashD.length)return;
    const build=()=>{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const C=(window as any).Chart;if(!C)return;
      const stC:Record<string,number>={};const isC:Record<string,number>={};const dpC:Record<string,number>={};
      const trMap = new Map<string,number>();
      const sorted = [...dashD].sort((a,b)=>new Date(a[0]).getTime()-new Date(b[0]).getTime());
      sorted.forEach(r=>{
        const d=new Date(r[0]);
        if(!isNaN(d.getTime())){
          const k=`${d.getDate()}/${d.getMonth()+1}`;
          trMap.set(k, (trMap.get(k)||0)+1);
        }
        const st=ns(r[8]);stC[st]=(stC[st]||0)+1;if(r[1])isC[r[1]]=(isC[r[1]||'']||0)+1;if(r[9])dpC[r[9]]=(dpC[r[9]]||0)+1;
      });
      const mk=(id:string,ref:React.RefObject<HTMLCanvasElement|null>,tp:string,labels:string[],vals:number[],colors:string[],axis='x', tensions=0)=>{
        ci.current[id]?.destroy?.();
        if(!ref.current)return;
        ci.current[id]=new C(ref.current,{type:tp,data:{labels,datasets:[{data:vals,backgroundColor:colors,borderColor:tp==='line'?colors[0]:(tp==='doughnut'?'#fff':'transparent'),tension:tensions,borderWidth:tp==='doughnut'||tp==='line'?2:0,fill:tp==='line'?{target:'origin',above:colors[0]+'33'}:false,borderRadius:tp==='bar'?6:0}]},
          options:{responsive:true,maintainAspectRatio:false,indexAxis:axis,plugins:{legend:{display:tp==='doughnut',position:'bottom',labels:{font:{family:'Sarabun',size:11},boxWidth:12,padding:10}},tooltip:{backgroundColor:'#0f172a',titleColor:'white',bodyColor:'white',bodyFont:{family:'Sarabun'},titleFont:{family:'Sarabun'},cornerRadius:12,padding:12}},
          scales:tp!=='doughnut'?{y:{beginAtZero:true,grid:{color:'#f1f5f9',drawBorder:false},ticks:{font:{family:'Sarabun',size:11},color:'#64748b',stepSize:1},border:{display:false}},x:{grid:{display:false},ticks:{font:{family:'Sarabun',size:11},color:'#64748b'},border:{display:false}}}:undefined}});
      };
      mk('s1',s1,'doughnut',Object.keys(stC),Object.values(stC),['#6366f1','#10b981','#f59e0b','#ef4444','#06b6d4','#8b5cf6','#64748b']);
      mk('s2',s2,'bar',Object.keys(isC),Object.values(isC),['#0ea5e9','#38bdf8','#7dd3fc','#bae6fd','#e0f2fe']);
      const top=Object.entries(dpC).sort((a,b)=>b[1]-a[1]).slice(0,7);
      mk('s3',s3,'bar',top.map(d=>d[0].replace(/^งาน/,'')),top.map(d=>d[1]),['#8b5cf6'],'y');
      mk('s4',s4,'line',Array.from(trMap.keys()),Array.from(trMap.values()),['#f43f5e'],'x',0.4);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if(!(window as any).Chart){const sc=document.createElement('script');sc.src='https://cdn.jsdelivr.net/npm/chart.js';sc.onload=build;document.head.appendChild(sc);}else build();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[nav,dashD.length,ds,de]);

  function login(e:React.FormEvent){e.preventDefault();if(u===CRED.u&&p===CRED.p){sv('app');sle('');}else sle('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');}
  async function save(){if(!editR)return;ssav('saving');const pl:Record<string,unknown>={action:'update',timestampISO:editR[0],status:est,department:edp,notes:en};if(ef){const b64=await new Promise<string>((rs,rj)=>{const fr=new FileReader();fr.onload=()=>rs((fr.result as string).split(',')[1]);fr.onerror=rj;fr.readAsDataURL(ef!);});pl.fileInfo={filename:ef.name,mimeType:ef.type,base64:b64};}
  try{await fetch(GAS,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(pl)});sd(prev=>prev.map(r=>r[0]===editR[0]?[...r.slice(0,8),est,edp,en,r[11]]:r));seR(null);ssav('ok');setTimeout(()=>{ssav('');fetchD();},1500);}catch{ssav('err');}}
  async function del(ts:string){if(!confirm('ลบรายการนี้?'))return;try{await fetch(GAS,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',timestampISO:ts})});sd(p=>p.filter(r=>r[0]!==ts));}catch{alert('ลบไม่สำเร็จ');}}

  const stC:Record<string,number>={};dashD.forEach(r=>{const s=ns(r[8]);stC[s]=(stC[s]||0)+1;});
  const deptSet=new Set(dashD.map(r=>r[9]).filter(Boolean));

  // ─── LOGIN ───
  if(view==='login') return (
    <div className="login-container">
      <div className="login-brand">
        <div className="login-bg-img"/>
        <div className="login-brand-blobs"/>
        <div className="login-content">
          <div className="login-logo-wrapper">
            <img src="https://img1.pic.in.th/images/nhh.png" alt="Logo" className="login-logo"/>
          </div>
          <h1>Admin Portal</h1>
          <p>ระบบจัดการข้อร้องเรียนและข้อเสนอแนะ โรงพยาบาลหนองหาน</p>
        </div>
      </div>
      <div className="login-form-side">
        <div className="login-box">
          <div className="login-box-header">
            <img src="https://img1.pic.in.th/images/nhh.png" alt="Mobile Logo" className="mobile-logo"/>
            <h2>ยินดีต้อนรับ</h2>
            <p>กรุณากรอกข้อมูลเพื่อเข้าสู่การจัดการระบบ</p>
          </div>
          <form onSubmit={login}>
            <div className="input-group">
              <label>ชื่อผู้ใช้</label>
              <input type="text" value={u} onChange={e=>su(e.target.value)} className="modern-inp" placeholder="Username" />
            </div>
            <div className="input-group" style={{marginTop: 20}}>
              <label>รหัสผ่าน</label>
              <input type="password" value={p} onChange={e=>sp(e.target.value)} className="modern-inp" placeholder="Password" />
            </div>
            {le && <div className="err-msg">⚠ {le}</div>}
            <button type="submit" className="btn-modern">เข้าสู่ระบบ</button>
          </form>
          <div className="login-footer">
            <a href="/nhh-request/">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              กลับสู่หน้าแจ้งเรื่อง
            </a>
            <p>© {new Date().getFullYear()} โรงพยาบาลหนองหาน</p>
          </div>
        </div>
      </div>
      <style>{`
        * { box-sizing: border-box; font-family: 'Sarabun', sans-serif; }
        .login-container { display: flex; min-height: 100vh; background: #ffffff; }
        .login-brand { width: 55%; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #0f172a; }
        .login-brand::before { content: ''; position: absolute; top: -20%; left: -10%; width: 60%; height: 60%; background: radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%); border-radius: 50%; filter: blur(60px); animation: pulse 8s infinite alternate;}
        .login-brand::after { content: ''; position: absolute; bottom: -20%; right: -10%; width: 70%; height: 70%; background: radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%); border-radius: 50%; filter: blur(80px); animation: pulse 12s infinite alternate-reverse;}
        @keyframes pulse { 0% {transform: scale(1);} 100% {transform: scale(1.15);} }
        .login-bg-img { position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2673&auto=format&fit=crop') center/cover; opacity: 0.15; mix-blend-mode: overlay; pointer-events: none; }
        .login-content { position: relative; z-index: 1; text-align: center; color: white; padding: 40px; }
        .login-logo-wrapper { width: 140px; height: 140px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 36px; display: flex; align-items: center; justify-content: center; margin: 0 auto 36px; backdrop-filter: blur(24px); box-shadow: 0 40px 80px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2); transition: transform 0.3s; }
        .login-logo-wrapper:hover { transform: translateY(-5px); }
        .login-logo { width: 90px; height: 90px; object-fit: contain; filter: drop-shadow(0 8px 12px rgba(0,0,0,0.3)); }
        .login-content h1 { font-size: 4rem; font-weight: 900; margin: 0 0 16px; letter-spacing: -2px; background: linear-gradient(to right, #ffffff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
        .login-content p { font-size: 1.2rem; color: #cbd5e1; margin: 0; font-weight: 500; letter-spacing: 0.5px; opacity: 0.9;}
        .login-form-side { width: 45%; background: white; display: flex; flex-direction: column; justify-content: center; padding: 60px; position: relative; z-index: 2; border-left: 1px solid #f1f5f9; }
        .login-box { max-width: 400px; width: 100%; margin: 0 auto; animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .mobile-logo { display: none; width: 64px; height: 64px; margin-bottom: 24px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.08)); margin-left: auto; margin-right: auto; }
        .login-box-header { margin-bottom: 48px; }
        .login-box-header h2 { font-size: 2.6rem; font-weight: 900; color: #0f172a; margin: 0 0 10px; letter-spacing: -0.5px; }
        .login-box-header p { color: #64748b; font-size: 1.1rem; margin: 0; font-weight: 500; }
        .input-group label { display: block; font-size: 0.85rem; font-weight: 800; color: #334155; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;}
        .modern-inp { width: 100%; padding: 18px 22px; border: 2px solid #e2e8f0; border-radius: 18px; font-size: 1.05rem; transition: all 0.25s cubic-bezier(0.4,0,0.2,1); background: #f8fafc; color: #0f172a; font-weight: 600;}
        .modern-inp::placeholder { color: #cbd5e1; font-weight: 500; }
        .modern-inp:focus { border-color: #0ea5e9; background: white; box-shadow: 0 0 0 5px rgba(14,165,233,0.15); outline: none; }
        .err-msg { background: #fef2f2; color: #dc2626; padding: 16px 20px; border-radius: 16px; font-size: 0.95rem; font-weight: 700; margin-top: 24px; display: flex; align-items: center; gap: 12px; border: 1px solid #fecaca; animation: fadeIn 0.3s; }
        .btn-modern { width: 100%; padding: 20px; background: linear-gradient(135deg, #0f172a, #020617); color: white; border: none; border-radius: 18px; font-size: 1.15rem; font-weight: 800; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 12px 24px rgba(2,6,23,0.15); margin-top: 32px; letter-spacing: 0.5px; }
        .btn-modern:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(2,6,23,0.25); background: linear-gradient(135deg, #1e293b, #0f172a); }
        .login-footer { margin-top: 56px; text-align: center; }
        .login-footer a { color: #64748b; text-decoration: none; font-weight: 700; font-size: 1rem; transition: color 0.2s; display: inline-flex; align-items: center; gap: 8px; justify-content: center; }
        .login-footer a:hover { color: #0ea5e9; }
        .login-footer p { font-size: 0.85rem; color: #94a3b8; margin-top: 32px; font-weight: 600; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 960px) {
          .login-container { flex-direction: column; background: #f8fafc; }
          .login-brand { width: 100%; height: 340px; border-radius: 0 0 32px 32px; flex-shrink: 0; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }
          .login-logo-wrapper { width: 80px; height: 80px; margin-bottom: 20px; border-radius: 20px; }
          .login-logo { width: 50px; height: 50px; }
          .login-content h1 { font-size: 2.2rem; }
          .login-content p { font-size: 1rem; max-width: 280px; margin: 0 auto; }
          .login-form-side { width: 100%; padding: 48px 24px; border-left: none; background: transparent; z-index: 5; margin-top: -40px; }
          .login-box { background: white; padding: 40px 24px; border-radius: 32px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); }
          .mobile-logo { display: none; }
          .login-box-header { text-align: center; margin-bottom: 40px; }
          .login-box-header h2 { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );

  // ─── APP SHELL ───
  return (
    <div className="admin-layout" style={{display:'flex',minHeight:'100vh',fontFamily:"'Sarabun',sans-serif",background:'#f1f5f9'}}>

      {/* SIDEBAR */}
      <aside className="admin-sidebar" style={{width:280,background:'#020617',display:'flex',flexDirection:'column',position:'fixed',top:0,left:0,bottom:0,zIndex:40,borderRight:'1px solid #1e293b'}}>
        {/* Logo */}
        <div style={{padding:'32px 24px 24px',display:'flex',alignItems:'center',gap:14}}>
          <div style={{width:46,height:46,borderRadius:12,background:'linear-gradient(135deg,#0ea5e9,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 4px 20px rgba(14,165,233,0.4)'}}>
            <img src="https://img1.pic.in.th/images/nhh.png" alt="" style={{width:28,height:28,objectFit:'contain',filter:'brightness(200%)'}}/>
          </div>
          <div>
            <div style={{color:'white',fontWeight:900,fontSize:'1.2rem',lineHeight:1.2,letterSpacing:-0.5}}>NHH Admin</div>
            <div style={{color:'#94a3b8',fontSize:'.75rem',fontWeight:600}}>รพ.หนองหาน</div>
          </div>
        </div>
        {/* Nav */}
        <nav style={{flex:1,padding:'24px 16px'}}>
          <div style={{fontSize:'.7rem',fontWeight:800,color:'#475569',letterSpacing:1.5,padding:'0 16px',marginBottom:12}}>MAIN MENU</div>
          {([['dash','📊','Dashboard Overview'],['list','📋','รายการรับแจ้งทั้งหมด']] as ['dash'|'list',string,string][]).map(([id,ic,lb])=>(
            <button key={id} onClick={()=>sn(id)} style={{width:'100%',display:'flex',alignItems:'center',gap:14,padding:'14px 16px',borderRadius:14,border:'none',cursor:'pointer',marginBottom:8,background:nav===id?'rgba(56,189,248,0.1)':'transparent',color:nav===id?'#38bdf8':'#94a3b8',fontWeight:nav===id?700:600,fontSize:'0.95rem',fontFamily:"'Sarabun',sans-serif",textAlign:'left',transition:'all .2s',position:'relative'}}>
              <span style={{fontSize:'1.2rem',filter:nav===id?'drop-shadow(0 2px 4px rgba(56,189,248,0.5))':'none'}}>{ic}</span>{lb}
              {nav===id&&<div style={{marginLeft:'auto',width:6,height:6,borderRadius:'50%',background:'#38bdf8',boxShadow:'0 0 10px #38bdf8'}}/>}
            </button>
          ))}
        </nav>
        {/* Bottom */}
        <div style={{padding:'24px',borderTop:'1px solid #1e293b'}}>
          <div style={{display:'flex',alignItems:'center',gap:12,padding:'14px',background:'rgba(255,255,255,0.03)',borderRadius:16,marginBottom:16}}>
            <div style={{width:38,height:38,borderRadius:'50%',background:'#3b82f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.9rem',color:'white',fontWeight:800,flexShrink:0}}>A</div>
            <div style={{flex:1,minWidth:0}}><div style={{color:'white',fontSize:'.9rem',fontWeight:700}}>Admin User</div><div style={{color:'#10b981',fontSize:'.75rem',fontWeight:600,display:'flex',alignItems:'center',gap:4}}><span style={{width:6,height:6,borderRadius:'50%',background:'#10b981',boxShadow:'0 0 8px #10b981'}}/> Online</div></div>
          </div>
          <button onClick={()=>{sv('login');su('');sp('');sd([]);}} style={{width:'100%',padding:'14px',background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:14,color:'#f87171',fontSize:'.9rem',fontWeight:700,cursor:'pointer',fontFamily:"'Sarabun',sans-serif",transition:'all 0.2s'}}>
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="admin-main" style={{marginLeft:280,flex:1,display:'flex',flexDirection:'column',minHeight:'100vh',background:'#f1f5f9'}}>
        {/* Topbar */}
        <header className="admin-topbar" style={{background:'rgba(255,255,255,0.9)',backdropFilter:'blur(16px)',padding:'0 40px',height:80,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:30,borderBottom:'1px solid #e2e8f0',boxShadow:'0 4px 20px rgba(0,0,0,0.02)'}}>
          <div>
            <h2 style={{margin:0,fontSize:'1.4rem',fontWeight:900,color:'#0f172a',letterSpacing:'-0.5px'}}>{nav==='dash'?'📊 Dashboard Overview':'📋 รายการรับแจ้งทั้งหมด'}</h2>
            <p style={{margin:'4px 0 0',fontSize:'0.85rem',color:'#64748b',fontWeight:500}}>ระบบรับเรื่องร้องเรียน โรงพยาบาลหนองหาน</p>
          </div>
          <div style={{display:'flex',gap:16,alignItems:'center'}}>
            {ferr&&<div style={{background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:12,padding:'8px 16px',color:'#dc2626',fontSize:'0.8rem',fontWeight:700,boxShadow:'0 4px 12px rgba(220,38,38,0.1)'}}>⚠ {ferr}</div>}
            {sav==='ok'&&<div style={{background:'#f0fdf4',border:'1px solid #86efac',borderRadius:12,padding:'8px 16px',color:'#16a34a',fontSize:'0.8rem',fontWeight:700,boxShadow:'0 4px 12px rgba(22,163,74,0.1)'}}>✅ บันทึกสำเร็จ</div>}
            <button onClick={fetchD} disabled={load} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 20px',background:load?'#e2e8f0':'white',border:load?'none':'1.5px solid #cbd5e1',borderRadius:12,color:load?'#64748b':'#0f172a',fontSize:'0.9rem',fontWeight:800,cursor:load?'not-allowed':'pointer',fontFamily:"'Sarabun',sans-serif",boxShadow:load?'none':'0 4px 10px rgba(0,0,0,0.05)',transition:'all 0.2s'}}>
              {load?'⏳ กำลังโหลด...':'🔄 รีเฟรชข้อมูล'}
            </button>
          </div>
        </header>

        <div className="admin-content-pad" style={{flex:1,padding:'32px 40px'}}>

          {/* ══ DASHBOARD ══ */}
          {/* ══ DASHBOARD ══ */}
          {nav==='dash'&&(<>
            {/* Date filter */}
            <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:24,flexWrap:'wrap',background:'white',padding:'12px 20px',borderRadius:16,boxShadow:'0 2px 10px rgba(0,0,0,0.02)',border:'1px solid #f1f5f9'}}>
              <div style={{fontSize:'.85rem',fontWeight:800,color:'#0f172a',marginRight:8}}>📅 ตัวกรองวันที่:</div>
              {[['จาก',ds,sds],['ถึง',de,sde]].map(([L,V,S])=>(
                <div key={L as string} style={{display:'flex',alignItems:'center',gap:8}}>
                  <label style={{fontSize:'.75rem',color:'#64748b',fontWeight:700,whiteSpace:'nowrap'}}>{L as string}</label>
                  <input type="date" value={V as string} onChange={e=>(S as (v:string)=>void)(e.target.value)} style={{padding:'8px 12px',border:'1.5px solid #e2e8f0',borderRadius:10,fontSize:'.85rem',background:'#f8fafc',color:'#0f172a',fontWeight:600}}/>
                </div>
              ))}
              <button onClick={()=>{sds('');sde('');}} style={{...ob,marginLeft:!ds&&!de?'auto':0,background:!ds&&!de?'#f8fafc':'#fef2f2',color:!ds&&!de?'#94a3b8':'#ef4444',borderColor:!ds&&!de?'#e2e8f0':'#fca5a5'}}>ล้างตัวกรอง</button>
            </div>

            {/* Stat cards */}
            <div className="grid-cols-mobile" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:16,marginBottom:28}}>
              {/* total */}
              <div style={{background:'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',borderRadius:20,padding:'24px',boxShadow:'0 10px 30px rgba(15,23,42,0.25)',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div style={{position:'absolute',right:-20,bottom:-20,fontSize:'6rem',opacity:0.1,lineHeight:1}}>📋</div>
                <div style={{fontSize:'.75rem',color:'#94a3b8',fontWeight:700,textTransform:'uppercase',letterSpacing:1}}>รวมทุกเรื่องร้องเรียน</div>
                <div style={{fontSize:'3.2rem',fontWeight:900,color:'white',lineHeight:1,marginTop:12}}>{dashD.length}</div>
              </div>
              {/* dept */}
              <div style={{background:'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',borderRadius:20,padding:'24px',boxShadow:'0 10px 30px rgba(14,165,233,0.3)',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div style={{position:'absolute',right:-20,bottom:-20,fontSize:'6rem',opacity:0.15,lineHeight:1}}>🏥</div>
                <div style={{fontSize:'.75rem',color:'#bae6fd',fontWeight:700,textTransform:'uppercase',letterSpacing:1}}>หน่วยงานที่เกี่ยวข้อง</div>
                <div style={{fontSize:'3.2rem',fontWeight:900,color:'white',lineHeight:1,marginTop:12}}>{deptSet.size}</div>
              </div>
              {/* per status */}
              {[['#f59e0b','#fff7ed'],['#3b82f6','#eff6ff'],['#10b981','#ecfdf5'],['#ef4444','#fef2f2'],['#8b5cf6','#f5f3ff'],['#06b6d4','#ecfeff']].map(([bg,lightBg],i)=>{
                const [st,cnt]=Object.entries(stC)[i]??['',''];
                if(!st)return null;
                return(
                  <div key={st} style={{background:'white',borderRadius:20,padding:'20px',border:'1px solid #f1f5f9',boxShadow:'0 4px 15px rgba(0,0,0,0.02)',position:'relative',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <div style={{fontSize:'.75rem',color:'#64748b',fontWeight:700,lineHeight:1.4,maxWidth:'70%'}}>{st}</div>
                      <div style={{background:lightBg as string,color:bg as string,padding:'4px 8px',borderRadius:8,fontSize:'.7rem',fontWeight:800}}>{dashD.length?Math.round((cnt as number)/dashD.length*100):0}%</div>
                    </div>
                    <div style={{fontSize:'2.4rem',fontWeight:900,color:bg as string,lineHeight:1,marginTop:16}}>{cnt}</div>
                  </div>
                );
              })}
            </div>

            {/* Charts */}
            <div className="grid-mobile-single" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
              <ChartCard title="สัดส่วนสถานะการดำเนินการ" color="#6366f1" ref_={s1} h={280}/>
              <ChartCard title="แนวโน้มปริมาณการร้องเรียน (รายวัน)" color="#f43f5e" ref_={s4} h={280}/>
            </div>
            <div className="grid-mobile-single" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
              <ChartCard title="สถิติแยกตามประเด็นหลัก" color="#0ea5e9" ref_={s2} h={260}/>
              <ChartCard title="🏆 หน่วยงานที่รับเรื่องมากที่สุด (Top 7)" color="#8b5cf6" ref_={s3} h={260}/>
            </div>
          </>)}

          {/* ══ LIST ══ */}
          {nav==='list'&&(
            <div style={{animation:'fadeIn 0.3s'}}>
              {/* Filter bar */}
              <div style={{background:'white',borderRadius:20,border:'1px solid #f1f5f9',padding:'16px 24px',marginBottom:20,display:'flex',gap:12,flexWrap:'wrap',alignItems:'center',boxShadow:'0 4px 15px rgba(0,0,0,0.02)'}}>
                <div style={{position:'relative',flex:1,minWidth:220}}>
                  <svg style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)'}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input value={q} onChange={e=>{sq(e.target.value);spg(1);}} placeholder="ค้นหารายการร้องเรียน..." style={{width:'100%',padding:'10px 14px 10px 38px',border:'1.5px solid #e2e8f0',borderRadius:12,fontSize:'.9rem',fontFamily:"'Sarabun',sans-serif",outline:'none',background:'#f8fafc',transition:'all 0.2s',color:'#0f172a'}} onFocus={e=>{e.target.style.borderColor='#0ea5e9';e.target.style.background='white'}} onBlur={e=>{e.target.style.borderColor='#e2e8f0';e.target.style.background='#f8fafc'}}/>
                </div>
                {[['จาก',ms,(v:string)=>{sms(v);spg(1);}],['ถึง',me,(v:string)=>{sme(v);spg(1);}]].map(([L,V,S])=>(
                  <div key={L as string} style={{display:'flex',alignItems:'center',gap:8}}>
                    <label style={{fontSize:'.75rem',color:'#64748b',fontWeight:700}}>{L as string}</label>
                    <input type="date" value={V as string} onChange={e=>(S as (v:string)=>void)(e.target.value)} style={{padding:'9px 12px',border:'1.5px solid #e2e8f0',borderRadius:10,fontSize:'.85rem',color:'#0f172a',background:'#f8fafc',outline:'none'}}/>
                  </div>
                ))}
                <button onClick={()=>{sq('');sms('');sme('');spg(1);}} style={{...ob,border:'none',background:'#f1f5f9',color:'#475569'}}>ล้างทั้งหมด</button>
                <div style={{marginLeft:'auto',background:'#f0fdf4',color:'#16a34a',padding:'6px 12px',borderRadius:10,fontSize:'.75rem',fontWeight:800}}>พบ {listD.length} รายการ</div>
              </div>

              {/* Table */}
              <div style={{background:'white',borderRadius:20,border:'1px solid #f1f5f9',overflow:'hidden',boxShadow:'0 4px 24px rgba(0,0,0,0.03)'}}>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse',minWidth:800}}>
                    <thead>
                      <tr style={{background:'#f8fafc',borderBottom:'1px solid #e2e8f0'}}>
                        {['ลำดับ','วันที่รับเรื่อง','เรื่องร้องเรียน / หมวดหมู่','ข้อมูลผู้แจ้งรับบริการ','สถานะดำเนินการ','จัดการ'].map((h,i)=>(
                          <th key={h} style={{padding:'16px 20px',textAlign:i>=4?'center':'left',fontSize:'.75rem',fontWeight:800,color:'#475569',textTransform:'uppercase',letterSpacing:0.5,whiteSpace:'nowrap'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {load&&<tr><td colSpan={6} style={{textAlign:'center',padding:60,color:'#94a3b8',fontSize:'.9rem',fontWeight:600}}>⏳ กำลังโหลดข้อมูล...</td></tr>}
                      {!load&&pd.length===0&&<tr><td colSpan={6} style={{textAlign:'center',padding:60,color:'#94a3b8',fontSize:'.9rem',fontWeight:600}}>ไม่พบข้อมูลที่ค้นหา</td></tr>}
                      {pd.map((row,i)=>{
                        const st=ns(row[8]);const[bg,tc,bc]=sb(st);
                        const d=new Date(row[0]);const isV=!isNaN(d.getTime());
                        const dt=isV?d.toLocaleDateString('th-TH',{day:'2-digit',month:'short',year:'2-digit'}):row[0];
                        const tm=isV?d.toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'}):'';
                        return(
                          <tr key={i} className="admin-table-row">
                            <td style={{padding:'16px 20px',fontSize:'.8rem',color:'#64748b',fontWeight:800,width:80}}>{(pg-1)*rpp+i+1}</td>
                            <td style={{padding:'16px 20px',whiteSpace:'nowrap',width:140}}>
                              <div style={{fontWeight:800,fontSize:'.85rem',color:'#0f172a'}}>{dt}</div>
                              <div style={{fontSize:'.75rem',color:'#94a3b8',marginTop:4}}>⏰ {tm} น.</div>
                            </td>
                            <td style={{padding:'16px 20px',maxWidth:320}}>
                              <div style={{fontWeight:800,fontSize:'.9rem',color:'#0f172a',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginBottom:6}}>{row[1]}</div>
                              <div style={{fontSize:'.75rem',color:'#64748b',display:'flex',gap:6,alignItems:'center'}}>
                                <span style={{background:'#f1f5f9',padding:'2px 8px',borderRadius:6,fontWeight:700,fontSize:'.65rem',color:'#475569'}}>{row[2]}</span>
                                <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:180}}>{row[3]||'-'}</span>
                              </div>
                            </td>
                            <td style={{padding:'16px 20px',whiteSpace:'nowrap',width:180}}>
                              <div style={{fontSize:'.85rem',fontWeight:700,color:'#1e293b',display:'flex',alignItems:'center',gap:6}}><span style={{fontSize:'1rem'}}>👤</span> {row[4]||(row[5]?'ไม่ระบุชื่อ':'-')}</div>
                              {row[5]&&<div style={{fontSize:'.75rem',color:'#64748b',marginTop:4,display:'flex',alignItems:'center',gap:6}}><span style={{fontSize:'1rem'}}>📞</span> {row[5]}</div>}
                            </td>
                            <td style={{padding:'16px 20px',textAlign:'center',width:150}}>
                              <span style={{background:bg,color:tc,border:`1px solid ${bc}`,padding:'6px 12px',borderRadius:12,fontSize:'.75rem',fontWeight:800,whiteSpace:'nowrap',display:'inline-block'}}>{st}</span>
                            </td>
                            <td style={{padding:'16px 20px',textAlign:'center',width:100}}>
                              <div style={{display:'flex',gap:6,justifyContent:'center'}}>
                                {([['👁','#2563eb','ดูรายละเอียด',()=>sdR(row)],['✏️','#d97706','แก้ไข',()=>{seR(row);ses(ns(row[8]));sed(row[9]||'');sen(row[10]||'');sef(null);}],['🗑','#ef4444','ลบ',()=>del(row[0])]] as [string,string,string,()=>void][]).map(([em,c,t,fn])=>(
                                  <button key={t} title={t} onClick={fn} style={{width:34,height:34,borderRadius:10,border:'none',background:'#f1f5f9',cursor:'pointer',fontSize:'.95rem',color:c,display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.2s'}} onMouseEnter={e=>{e.currentTarget.style.background='white';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'}} onMouseLeave={e=>{e.currentTarget.style.background='#f1f5f9';e.currentTarget.style.boxShadow='none'}}>{em}</button>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div style={{padding:'16px 24px',borderTop:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12,background:'white'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'.8rem',color:'#64748b',fontWeight:600}}>
                    แสดง <select value={rpp} onChange={e=>{srpp(Number(e.target.value));spg(1);}} style={{border:'1.5px solid #e2e8f0',borderRadius:8,padding:'4px 8px',fontSize:'.8rem',fontWeight:700,color:'#0f172a',outline:'none'}}>{[5,10,25,50].map(n=><option key={n} value={n}>{n}</option>)}</select> รายการ
                  </div>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    {[['«',1],['‹',pg-1]].map(([lbl,to])=><button key={lbl as string} disabled={pg<=1} onClick={()=>spg(to as number)} style={pb(pg<=1)}>{lbl}</button>)}
                    <span style={{fontSize:'.85rem',color:'#0f172a',padding:'0 12px',fontWeight:800}}>หน้า {pg} / {tp||1}</span>
                    {[['›',pg+1],['»',tp]].map(([lbl,to])=><button key={lbl as string} disabled={pg>=tp} onClick={()=>spg(to as number)} style={pb(pg>=tp)}>{lbl}</button>)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ EDIT MODAL ══ */}
      {editR&&(
        <div style={ov} onClick={()=>seR(null)}>
          <div style={mb} onClick={e=>e.stopPropagation()}>
            <div style={mh}><span style={{fontWeight:800,color:'#0f172a',fontSize:'.95rem'}}>✏️ อัปเดตสถานะ</span><button onClick={()=>seR(null)} style={xb}>✕</button></div>
            <div style={{padding:'18px 22px',display:'flex',flexDirection:'column',gap:13}}>
              {([['สถานะ *',est,ses,STATUSES],['หน่วยงาน',edp,sed,DEPTS]] as [string,string,(v:string)=>void,string[]][]).map(([L,V,S,opts])=>(
                <div key={L}><label style={ml}>{L}</label><select value={V} onChange={e=>S(e.target.value)} style={mi}>{opts.map(o=><option key={o} value={o}>{o||'-- เลือก --'}</option>)}</select></div>
              ))}
              <div><label style={ml}>หมายเหตุ / ผลดำเนินการ</label><textarea value={en} onChange={e=>sen(e.target.value)} rows={3} style={{...mi,resize:'vertical'}} placeholder="ระบุความคืบหน้า..."/></div>
              <div>
                <label style={ml}>แนบเอกสาร (ถ้ามี)</label>
                <label htmlFor="ef" style={{display:'flex',alignItems:'center',gap:8,padding:'9px 12px',border:'2px dashed #e5e7eb',borderRadius:9,background:'#f8fafc',cursor:'pointer'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
                  <span style={{fontSize:'.8rem',color:ef?'#059669':'#9ca3af'}}>{ef?ef.name:'เลือกไฟล์...'}</span>
                </label>
                <input id="ef" type="file" accept="image/*,.pdf" onChange={e=>sef(e.target.files?.[0]||null)} style={{display:'none'}}/>
              </div>
            </div>
            <div style={{padding:'12px 22px',borderTop:'1px solid #f1f5f9',display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button onClick={()=>seR(null)} style={ob}>ยกเลิก</button>
              <button onClick={save} disabled={sav==='saving'} style={{...ob,background:'#0f172a',color:'white',border:'none'}}>{sav==='saving'?'กำลังบันทึก...':'บันทึก'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ DETAIL MODAL ══ */}
      {detR&&(
        <div style={ov} onClick={()=>sdR(null)}>
          <div style={{...mb,maxWidth:560}} onClick={e=>e.stopPropagation()}>
            <div style={mh}><span style={{fontWeight:800,color:'#0f172a'}}>📄 รายละเอียด</span><button onClick={()=>sdR(null)} style={xb}>✕</button></div>
            <div style={{padding:'18px 22px',maxHeight:'68vh',overflowY:'auto'}}>
              {(()=>{const r=detR;const st=ns(r[8]);const[bg,tc]=sb(st);const d=new Date(r[0]);const dt=isNaN(d.getTime())?r[0]:d.toLocaleString('th-TH',{day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'});
              return(<>
                <div style={{display:'flex',gap:6,margin:'0 0 10px',flexWrap:'wrap'}}>
                  <span style={{background:bg,color:tc,padding:'3px 12px',borderRadius:20,fontSize:'.7rem',fontWeight:700}}>{st}</span>
                  <span style={{background:'#f1f5f9',color:'#475569',padding:'3px 12px',borderRadius:20,fontSize:'.7rem',fontWeight:700}}>{r[2]}</span>
                </div>
                <h3 style={{fontSize:'1rem',fontWeight:900,color:'#0f172a',margin:'0 0 14px'}}>{r[1]}</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,padding:'14px 0',borderTop:'1px solid #f1f5f9',borderBottom:'1px solid #f1f5f9',marginBottom:14}}>
                  {[['ผู้แจ้ง',r[4]||'-'],['วันเวลา',dt+' น.'],['เบอร์',r[5]||'-'],['Line / Email',[r[6]?'Line:'+r[6]:'',r[7]].filter(Boolean).join(', ')||'-']].map(([k,v])=>(
                    <div key={k}><p style={{fontSize:'.62rem',color:'#94a3b8',fontWeight:700,margin:'0 0 3px',textTransform:'uppercase',letterSpacing:1}}>{k}</p><p style={{fontSize:'.84rem',fontWeight:700,color:'#1e293b',margin:0}}>{v}</p></div>
                  ))}
                </div>
                <p style={{fontSize:'.62rem',color:'#94a3b8',fontWeight:700,margin:'0 0 6px',textTransform:'uppercase',letterSpacing:1}}>รายละเอียด</p>
                <div style={{background:'#f8fafc',border:'1px solid #e5e7eb',borderRadius:10,padding:'12px',fontSize:'.85rem',color:'#374151',whiteSpace:'pre-wrap',lineHeight:1.7,marginBottom:14}}>{r[3]}</div>
                <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:10,padding:'12px 14px'}}>
                  <p style={{fontSize:'.62rem',fontWeight:800,color:'#059669',margin:'0 0 8px',textTransform:'uppercase',letterSpacing:1}}>ผลดำเนินการ</p>
                  <p style={{margin:'0 0 4px',fontSize:'.82rem'}}><strong style={{color:'#64748b'}}>หน่วยงาน: </strong>{r[9]||'-'}</p>
                  <p style={{margin:'0 0 4px',fontSize:'.82rem'}}><strong style={{color:'#64748b'}}>หมายเหตุ: </strong>{r[10]||'-'}</p>
                  {r[11]&&<a href={r[11]} target="_blank" rel="noreferrer" style={{color:'#059669',fontWeight:600,fontSize:'.82rem'}}>📎 เปิดเอกสาร</a>}
                </div>
              </>);})()}
            </div>
            <div style={{padding:'12px 22px',borderTop:'1px solid #f1f5f9',textAlign:'right'}}><button onClick={()=>sdR(null)} style={ob}>ปิด</button></div>
          </div>
        </div>
      )}
      <style>{`
        *{box-sizing:border-box}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        input::placeholder,textarea::placeholder{font-family:'Sarabun',sans-serif}
        .admin-table-row { border-bottom: 1px solid #f1f5f9; background: white; transition: background 0.2s; }
        .admin-table-row:hover { background: #f0f9ff !important; }
      `}</style>
    </div>
  );
}

function ChartCard({title,color,ref_,h}:{title:string,color:string,ref_:React.RefObject<HTMLCanvasElement|null>,h:number}){
  return(
    <div style={{background:'white',borderRadius:20,padding:'24px',boxShadow:'0 4px 24px rgba(0,0,0,.02)',border:'1px solid rgba(226,232,240,0.8)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
        <div style={{width:12,height:12,borderRadius:'50%',background:color}}/>
        <span style={{fontSize:'.95rem',fontWeight:800,color:'#0f172a'}}>{title}</span>
      </div>
      <div style={{height:h}}><canvas ref={ref_}/></div>
    </div>
  );
}
const ob:React.CSSProperties={padding:'7px 14px',border:'1px solid #e5e7eb',borderRadius:8,background:'white',cursor:'pointer',fontSize:'.8rem',fontWeight:600,color:'#475569',fontFamily:"'Sarabun',sans-serif"};
const pb=(d:boolean):React.CSSProperties=>({width:30,height:30,borderRadius:7,border:'1px solid #e5e7eb',background:d?'#f9fafb':'white',cursor:d?'not-allowed':'pointer',fontSize:'.82rem',opacity:d?.4:1,color:'#374151',display:'flex',alignItems:'center',justifyContent:'center'});
const ov:React.CSSProperties={position:'fixed',inset:0,background:'rgba(0,0,0,.6)',backdropFilter:'blur(4px)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:20};
const mb:React.CSSProperties={background:'white',borderRadius:20,width:'100%',maxWidth:460,boxShadow:'0 32px 80px rgba(0,0,0,.3)',overflow:'hidden'};
const mh:React.CSSProperties={padding:'15px 22px',borderBottom:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#fafafa'};
const xb:React.CSSProperties={background:'none',border:'none',cursor:'pointer',fontSize:'1rem',color:'#9ca3af',width:28,height:28,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center'};
const ml:React.CSSProperties={display:'block',fontSize:'.76rem',fontWeight:700,color:'#374151',marginBottom:5};
const mi:React.CSSProperties={width:'100%',padding:'9px 12px',border:'1.5px solid #e5e7eb',borderRadius:9,fontSize:'.86rem',background:'#fafafa',color:'#1e293b',fontFamily:"'Sarabun',sans-serif",outline:'none'};
