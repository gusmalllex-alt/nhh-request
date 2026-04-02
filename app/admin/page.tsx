'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const GAS = 'https://script.google.com/macros/s/AKfycbwvB3QPrLHImxbVW4NXKXxd3bFDjQizm1HEDnRZX6D5fz402LiQZJWAL0iU-5-emdav/exec';
const CRED = { u: 'nonghan', p: 'nonghan11018' };

const STATUSES = ['รอดำเนินการ','รับเรื่อง','ส่งเรื่อง','รอตอบกลับ','ปิดเรื่องได้','ปิดเรื่องไม่ได้','ทบทวนผู้บริหารรับทราบ'];
const DEPTS = ['','งานธุรการ','งาน CKD','งาน LAB','องค์กรแพทย์','งานกายภาพบำบัด','งานการพยาบาล','งานการพยาบาลป่วยผ่าตัดฯ','งานการพยาบาลผู้คลอด','งานการพยาบาลผู้ป่วยนอก','งานการพยาบาลผู้ป่วยหนัก','งานการพยาบาลผู้ป่วยอุบัติเหตุฯ','งานการพยาบาลผู้ป่วยใน (ชาย)','งานการพยาบาลผู้ป่วยใน (พิเศษ)','งานการพยาบาลผู้ป่วยใน (หญิง)','งานการพยาบาลผู้ป่วยใน (เด็ก)','งานการเงินและบัญชี','งานคลินิกพิเศษ','งานคุณภาพ QIC','งานซ่อมบำรุง','งานทรัพยากรบุคคล','งานทันตกรรม','งานบริหารทั่วไป','งานปฐมภูมิ','งานประกันสุขภาพ','งานประชาสัมพันธ์','งานพยาบาลควบคุมการติดเชื้อฯ','งานพัสดุ','งานยานพาหนะ','งานรักษาความปลอดภัย','งานรังสีวิทยา','งานสุขภาพจิต','งานสุขาภิบาล','งานสูติ-นรีเวช','งานเทคโนโลยีสารสนเทศฯ','งานเภสัชกรรมผู้ป่วยนอก','งานเภสัชกรรมผู้ป่วยใน','งานเวชระเบียนฯ','งานแผนงานและประเมินผล','งานแพทย์แผนไทย','งานโภชนศาสตร์','งานโสตทัศนศึกษา'];

type Row = string[];
const ns = (s:string) => ['ทบทวนแล้ว','ผู้บริหารรับทราบ'].includes(s)?'ทบทวนผู้บริหารรับทราบ':(s||'รอดำเนินการ');
const SC:Record<string,[string,string]> = {'รอดำเนินการ':['#fef3c7','#92400e'],'รับเรื่อง':['#dbeafe','#1e40af'],'ส่งเรื่อง':['#e0f2fe','#0369a1'],'รอตอบกลับ':['#fef9c3','#854d0e'],'ปิดเรื่องได้':['#dcfce7','#166534'],'ปิดเรื่องไม่ได้':['#fee2e2','#991b1b'],'ทบทวนผู้บริหารรับทราบ':['#ede9fe','#5b21b6']};
const sb = (s:string) => SC[s]??['#f1f5f9','#475569'];
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
      {/* LEFT SIDE - BRANDING */}
      <div className="login-brand">
        <div className="login-brand-overlay"/>
        <div className="login-brand-circle1"/>
        <div className="login-brand-circle2"/>
        <div className="login-brand-content">
          <div className="login-logo-box">
            <img src="https://img1.pic.in.th/images/nhh.png" alt="NHH Logo" className="login-logo-img"/>
          </div>
          <h1 className="login-brand-title">Admin Portal</h1>
          <p className="login-brand-subtitle">ระบบจัดการข้อร้องเรียนและข้อเสนอแนะ โรงพยาบาลหนองหาน</p>
        </div>
      </div>
      
      {/* RIGHT SIDE - FORM */}
      <div className="login-form-side">
        <div className="login-form-bg"/>
        <div className="login-form-wrapper">
          <div className="login-form-header">
             <img src="https://img1.pic.in.th/images/nhh.png" className="login-mobile-logo" alt=""/>
             <div>
               <h2 className="login-title">ยินดีต้อนรับ</h2>
               <p className="login-subtitle">กรุณาลงชื่อเข้าใช้เพื่อจัดการระบบ</p>
             </div>
          </div>
          
          <form className="login-form" onSubmit={login}>
            {[['ชื่อผู้ใช้',u,su,'text','username'],['รหัสผ่าน',p,sp,'password','current-password']].map(([L,V,S,T,AC])=>(
              <div key={L as string} className="login-input-group">
                <label className="login-label">{L as string}</label>
                <div style={{position:'relative'}}>
                  <input type={T as string} value={V as string} onChange={e=>(S as (v:string)=>void)(e.target.value)} autoComplete={AC as string}
                    className="login-input" />
                </div>
              </div>
            ))}
            {le&&<div className="login-error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              {le}
            </div>}
            <button type="submit" className="login-btn">เข้าสู่ระบบ</button>
          </form>
          
          <div className="login-footer-link">
            <a href="/nhh-request/">← กลับสู่หน้าแจ้งเรื่อง</a>
          </div>
          <p className="login-credit">พัฒนาโดย กลุ่มงานสุขภาพดิจิทัล · โรงพยาบาลหนองหาน</p>
        </div>
      </div>
      <style>{`
        * { box-sizing: border-box; }
        .login-container { min-height: 100vh; display: flex; font-family: 'Sarabun', sans-serif; background: #f8fafc; position: relative; overflow: hidden; }
        .login-brand { display: flex; width: 50%; background: linear-gradient(135deg, #1e6c93 0%, #0d4a6b 100%); position: relative; flex-direction: column; justify-content: center; align-items: center; padding: 40px; color: white; overflow: hidden; }
        .login-brand-overlay { position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); opacity: 0.8; }
        .login-brand-circle1 { position: absolute; top: -10%; left: -10%; width: 50%; height: 50%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; }
        .login-brand-circle2 { position: absolute; bottom: -10%; right: -10%; width: 60%; height: 60%; background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%); border-radius: 50%; }
        .login-brand-content { z-index: 1; text-align: center; }
        .login-logo-box { width: 100px; height: 100px; border-radius: 24px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .login-logo-img { width: 68px; height: 68px; object-fit: contain; }
        .login-brand-title { font-size: 2.5rem; font-weight: 800; margin: 0 0 12px; text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
        .login-brand-subtitle { font-size: 1.1rem; color: rgba(255,255,255,0.85); margin: 0; max-width: 320px; line-height: 1.6; }
        
        .login-form-side { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; position: relative; }
        .login-form-bg { position: absolute; top: 0; right: 0; width: 100%; height: 100%; background: radial-gradient(circle at top right, rgba(224,242,254,0.5) 0%, transparent 50%); z-index: 0; }
        .login-form-wrapper { width: 100%; max-width: 380px; position: relative; z-index: 1; }
        .login-form-header { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
        .login-mobile-logo { display: none; width: 40px; height: 40px; }
        .login-title { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.2; }
        .login-subtitle { font-size: 0.9rem; color: #64748b; margin: 4px 0 0; }
        
        .login-form { background: white; padding: 32px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
        .login-input-group { margin-bottom: 20px; }
        .login-label { display: block; font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 8px; }
        .login-input { width: 100%; padding: 14px 16px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; color: #1e293b; font-size: 1rem; font-family: 'Sarabun', sans-serif; outline: none; transition: all 0.2s; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
        .login-input:focus { border-color: #1e6c93; box-shadow: 0 0 0 4px rgba(30,108,147,0.1); background: white; }
        .login-error { background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 12px; color: #dc2626; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        .login-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #1e6c93, #0d4a6b); border: none; border-radius: 12px; color: white; font-weight: 800; font-size: 1.05rem; cursor: pointer; font-family: 'Sarabun', sans-serif; box-shadow: 0 10px 25px rgba(30,108,147,0.3); transition: transform 0.2s, box-shadow 0.2s; margin-top: 8px; }
        .login-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(30,108,147,0.4); }
        
        .login-footer-link { text-align: center; margin-top: 24px; }
        .login-footer-link a { font-size: 0.85rem; color: #64748b; text-decoration: none; font-weight: 600; transition: color 0.2s; }
        .login-footer-link a:hover { color: #1e6c93; }
        .login-credit { text-align: center; margin-top: 40px; font-size: 0.75rem; color: #94a3b8; font-weight: 500; }
        
        @media (max-width: 768px) {
          .login-brand { display: none; }
          .login-mobile-logo { display: block; }
          .login-form-side { padding: 20px; }
          .login-form { padding: 24px; }
        }
      `}</style>
    </div>
  );

  // ─── APP SHELL ───
  return (
    <div style={{display:'flex',minHeight:'100vh',fontFamily:"'Sarabun',sans-serif",background:'#f8fafc'}}>

      {/* SIDEBAR */}
      <aside style={{width:260,background:'white',display:'flex',flexDirection:'column',position:'fixed',top:0,left:0,bottom:0,zIndex:40,borderRight:'1px solid #e2e8f0',boxShadow:'4px 0 24px rgba(0,0,0,0.02)'}}>
        {/* Logo */}
        <div style={{padding:'24px 24px 20px',borderBottom:'1px solid #f1f5f9'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:42,height:42,borderRadius:12,background:'linear-gradient(135deg,#1e6c93,#0d4a6b)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:'0 4px 12px rgba(30,108,147,0.2)'}}>
              <img src="https://img1.pic.in.th/images/nhh.png" alt="" style={{width:28,height:28,objectFit:'contain'}}/>
            </div>
            <div>
              <div style={{color:'#0f172a',fontWeight:900,fontSize:'.9rem',lineHeight:1.2,letterSpacing:-0.5}}>NHH Admin</div>
              <div style={{color:'#64748b',fontSize:'.7rem',fontWeight:500}}>โรงพยาบาลหนองหาน</div>
            </div>
          </div>
        </div>
        {/* Nav */}
        <nav style={{flex:1,padding:'24px 16px'}}>
          <div style={{fontSize:'.65rem',fontWeight:800,color:'#94a3b8',letterSpacing:1.5,padding:'0 12px',marginBottom:12}}>MENU</div>
          {([['dash','📊','Dashboard Overview'],['list','📋','รายการรับแจ้งทั้งหมด']] as ['dash'|'list',string,string][]).map(([id,ic,lb])=>(
            <button key={id} onClick={()=>sn(id)} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'12px 14px',borderRadius:12,border:'none',cursor:'pointer',marginBottom:6,background:nav===id?'#f1f8ff':'transparent',color:nav===id?'#0284c7':'#475569',fontWeight:nav===id?700:600,fontSize:'.88rem',fontFamily:"'Sarabun',sans-serif",textAlign:'left',transition:'all .2s',position:'relative'}}>
              <span style={{fontSize:'1.1rem'}}>{ic}</span>{lb}
              {nav===id&&<div style={{position:'absolute',right:12,width:6,height:6,borderRadius:'50%',background:'#0ea5e9'}}/>}
            </button>
          ))}
        </nav>
        {/* Bottom */}
        <div style={{padding:'20px 16px',borderTop:'1px solid #f1f5f9'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,padding:'12px',background:'#f8fafc',borderRadius:14,marginBottom:12,border:'1px solid #f1f5f9'}}>
            <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#10b981)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.8rem',color:'white',fontWeight:800,flexShrink:0}}>A</div>
            <div style={{flex:1,minWidth:0}}><div style={{color:'#1e293b',fontSize:'.8rem',fontWeight:700}}>Admin User</div><div style={{color:'#10b981',fontSize:'.68rem',fontWeight:600}}>ออนไลน์</div></div>
            <div style={{width:8,height:8,borderRadius:'50%',background:'#10b981',flexShrink:0,boxShadow:'0 0 0 3px #d1fae5'}}/>
          </div>
          <button onClick={()=>{sv('login');su('');sp('');sd([]);}} style={{width:'100%',padding:'10px',background:'white',border:'1.5px solid #feaca',borderRadius:12,color:'#ef4444',fontSize:'.84rem',fontWeight:700,cursor:'pointer',fontFamily:"'Sarabun',sans-serif",transition:'all 0.2s'}} onMouseEnter={e=>{e.currentTarget.style.background='#fef2f2'}} onMouseLeave={e=>{e.currentTarget.style.background='white'}}>
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{marginLeft:260,flex:1,display:'flex',flexDirection:'column',minHeight:'100vh',background:'#f8fafc'}}>
        {/* Topbar */}
        <header style={{background:'rgba(255,255,255,0.8)',backdropFilter:'blur(12px)',padding:'0 32px',height:72,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:30,borderBottom:'1px solid #e2e8f0'}}>
          <div>
            <h2 style={{margin:0,fontSize:'1.2rem',fontWeight:800,color:'#0f172a'}}>{nav==='dash'?'📊 Dashboard Overview':'📋 รายการรับแจ้งทั้งหมด'}</h2>
            <p style={{margin:0,fontSize:'.75rem',color:'#64748b'}}>ระบบรับเรื่องร้องเรียน โรงพยาบาลหนองหาน</p>
          </div>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            {ferr&&<div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:'6px 14px',color:'#dc2626',fontSize:'.75rem',fontWeight:600}}>⚠ {ferr}</div>}
            {sav==='ok'&&<div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:10,padding:'6px 14px',color:'#059669',fontSize:'.75rem',fontWeight:600}}>✅ บันทึกสำเร็จ</div>}
            <button onClick={fetchD} disabled={load} style={{display:'flex',alignItems:'center',gap:6,padding:'8px 16px',background:load?'#f1f5f9':'#0f172a',border:'none',borderRadius:12,color:load?'#94a3b8':'white',fontSize:'.8rem',fontWeight:700,cursor:load?'not-allowed':'pointer',fontFamily:"'Sarabun',sans-serif",boxShadow:load?'none':'0 4px 12px rgba(15,23,42,0.15)'}}>
              {load?'⏳ โหลด...':'🔄 รีเฟรช'}
            </button>
          </div>
        </header>

        <div style={{flex:1,padding:32}}>

          {/* ══ DASHBOARD ══ */}
          {nav==='dash'&&(<>
            {/* Date filter */}
            <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:20,flexWrap:'wrap'}}>
              {[['จากวันที่',ds,sds],['ถึงวันที่',de,sde]].map(([L,V,S])=>(
                <div key={L as string} style={{display:'flex',alignItems:'center',gap:6}}>
                  <label style={{fontSize:'.76rem',color:'#64748b',fontWeight:600,whiteSpace:'nowrap'}}>{L as string}</label>
                  <input type="date" value={V as string} onChange={e=>(S as (v:string)=>void)(e.target.value)} style={{padding:'6px 10px',border:'1.5px solid #e5e7eb',borderRadius:8,fontSize:'.8rem',background:'white',color:'#374151'}}/>
                </div>
              ))}
              <button onClick={()=>{sds('');sde('');}} style={ob}>เคลียร์</button>
            </div>

            {/* Stat cards */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(148px,1fr))',gap:14,marginBottom:22}}>
              {/* total */}
              <div style={{background:'linear-gradient(135deg,#6366f1,#4f46e5)',borderRadius:16,padding:'18px 16px',boxShadow:'0 4px 20px rgba(99,102,241,.3)'}}>
                <div style={{fontSize:'2.4rem',fontWeight:900,color:'white',lineHeight:1}}>{dashD.length}</div>
                <div style={{fontSize:'.68rem',color:'rgba(255,255,255,.7)',marginTop:4,fontWeight:600,textTransform:'uppercase',letterSpacing:1}}>เรื่องทั้งหมด</div>
                <div style={{marginTop:10,width:'100%',height:3,background:'rgba(255,255,255,.15)',borderRadius:2}}><div style={{height:'100%',width:'100%',background:'rgba(255,255,255,.5)',borderRadius:2}}/></div>
              </div>
              {/* dept */}
              <div style={{background:'linear-gradient(135deg,#10b981,#059669)',borderRadius:16,padding:'18px 16px',boxShadow:'0 4px 20px rgba(16,185,129,.25)'}}>
                <div style={{fontSize:'2.4rem',fontWeight:900,color:'white',lineHeight:1}}>{deptSet.size}</div>
                <div style={{fontSize:'.68rem',color:'rgba(255,255,255,.7)',marginTop:4,fontWeight:600,textTransform:'uppercase',letterSpacing:1}}>หน่วยงาน</div>
                <div style={{fontSize:'.64rem',color:'rgba(255,255,255,.5)',marginTop:4}}>ที่มีเรื่องร้องเรียน</div>
              </div>
              {/* per status */}
              {[['#f59e0b','#78350f'],['#3b82f6','#1e40af'],['#10b981','#064e3b'],['#ef4444','#7f1d1d'],['#8b5cf6','#3b0764'],['#06b6d4','#0c4a6e']].map(([bg,_],i)=>{
                const [st,cnt]=Object.entries(stC)[i]??['',''];
                if(!st)return null;
                return(
                  <div key={st} style={{background:'white',borderRadius:16,padding:'18px 16px',border:'1px solid #f1f5f9',boxShadow:'0 1px 4px rgba(0,0,0,.04)',position:'relative',overflow:'hidden'}}>
                    <div style={{position:'absolute',top:0,left:0,width:4,bottom:0,background:bg,borderRadius:'16px 0 0 16px'}}/>
                    <div style={{fontSize:'2rem',fontWeight:900,color:'#1e293b',lineHeight:1}}>{cnt}</div>
                    <div style={{fontSize:'.64rem',color:'#94a3b8',marginTop:4,fontWeight:600,lineHeight:1.4}}>{st}</div>
                    <div style={{marginTop:8,fontSize:'.72rem',color:bg as string,fontWeight:700}}>{dashD.length?Math.round((cnt as number)/dashD.length*100):0}%</div>
                  </div>
                );
              })}
            </div>

            {/* Charts */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
              <ChartCard title="สัดส่วนสถานะการดำเนินการ" color="#6366f1" ref_={s1} h={260}/>
              <ChartCard title="แนวโน้มปริมาณการร้องเรียน (รายวัน)" color="#f43f5e" ref_={s4} h={260}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
              <ChartCard title="สถิติแยกตามประเด็นหลัก" color="#0ea5e9" ref_={s2} h={240}/>
              <ChartCard title="🏆 หน่วยงานที่รับเรื่องมากที่สุด (Top 7)" color="#8b5cf6" ref_={s3} h={240}/>
            </div>
          </>)}

          {/* ══ LIST ══ */}
          {nav==='list'&&(
            <div>
              {/* Filter bar */}
              <div style={{background:'white',borderRadius:14,border:'1px solid #e5e7eb',padding:'14px 18px',marginBottom:16,display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
                <div style={{position:'relative',flex:1,minWidth:180}}>
                  <svg style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)'}} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input value={q} onChange={e=>{sq(e.target.value);spg(1);}} placeholder="ค้นหา..." style={{width:'100%',padding:'8px 12px 8px 30px',border:'1.5px solid #e5e7eb',borderRadius:9,fontSize:'.84rem',fontFamily:"'Sarabun',sans-serif",outline:'none'}}/>
                </div>
                {[['จาก',ms,(v:string)=>{sms(v);spg(1);}],['ถึง',me,(v:string)=>{sme(v);spg(1);}]].map(([L,V,S])=>(
                  <div key={L as string} style={{display:'flex',alignItems:'center',gap:5}}>
                    <label style={{fontSize:'.74rem',color:'#6b7280',fontWeight:600}}>{L as string}</label>
                    <input type="date" value={V as string} onChange={e=>(S as (v:string)=>void)(e.target.value)} style={{padding:'7px 10px',border:'1.5px solid #e5e7eb',borderRadius:8,fontSize:'.8rem'}}/>
                  </div>
                ))}
                <button onClick={()=>{sq('');sms('');sme('');spg(1);}} style={ob}>ล้างทั้งหมด</button>
                <div style={{marginLeft:'auto',fontSize:'.76rem',color:'#94a3b8',fontWeight:600}}>พบ {listD.length} รายการ</div>
              </div>

              {/* Table */}
              <div style={{background:'white',borderRadius:14,border:'1px solid #e5e7eb',overflow:'hidden',boxShadow:'0 1px 6px rgba(0,0,0,.04)'}}>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse',minWidth:680}}>
                    <thead>
                      <tr style={{background:'linear-gradient(135deg,#0f172a,#1e293b)'}}>
                        {['#','วันที่แจ้ง','ประเด็น / รายละเอียด','ผู้แจ้ง / เบอร์','สถานะ','จัดการ'].map((h,i)=>(
                          <th key={h} style={{padding:'12px 14px',textAlign:i>=4?'center':'left',fontSize:'.66rem',fontWeight:700,color:'rgba(255,255,255,.6)',textTransform:'uppercase',letterSpacing:.8,whiteSpace:'nowrap'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {load&&<tr><td colSpan={6} style={{textAlign:'center',padding:48,color:'#94a3b8'}}>⏳ กำลังโหลด...</td></tr>}
                      {!load&&pd.length===0&&<tr><td colSpan={6} style={{textAlign:'center',padding:48,color:'#94a3b8'}}>ไม่พบข้อมูล</td></tr>}
                      {pd.map((row,i)=>{
                        const st=ns(row[8]);const[bg,tc]=sb(st);
                        const d=new Date(row[0]);const isV=!isNaN(d.getTime());
                        const dt=isV?d.toLocaleDateString('th-TH',{day:'2-digit',month:'short',year:'2-digit'}):row[0];
                        const tm=isV?d.toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'}):'';
                        return(
                          <tr key={i} style={{borderBottom:'1px solid #f8fafc',background:i%2?'#fafafa':'white',transition:'background .1s'}}
                            onMouseEnter={e=>e.currentTarget.style.background='#f0f9ff'}
                            onMouseLeave={e=>e.currentTarget.style.background=i%2?'#fafafa':'white'}>
                            <td style={{padding:'10px 14px',fontSize:'.72rem',color:'#94a3b8',fontWeight:700}}>{(pg-1)*rpp+i+1}</td>
                            <td style={{padding:'10px 14px',whiteSpace:'nowrap'}}>
                              <div style={{fontWeight:700,fontSize:'.8rem',color:'#1e293b'}}>{dt}</div>
                              <div style={{fontSize:'.68rem',color:'#9ca3af'}}>{tm}น.</div>
                            </td>
                            <td style={{padding:'10px 14px',maxWidth:280}}>
                              <div style={{fontWeight:700,fontSize:'.84rem',color:'#1e293b',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{row[1]}</div>
                              <div style={{fontSize:'.7rem',color:'#6b7280',marginTop:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{row[2]} {row[3]?'· '+row[3].slice(0,36)+'…':''}</div>
                            </td>
                            <td style={{padding:'10px 14px',whiteSpace:'nowrap'}}>
                              <div style={{fontSize:'.82rem',fontWeight:600,color:'#374151'}}>{row[4]||'-'}</div>
                              <div style={{fontSize:'.68rem',color:'#9ca3af'}}>{row[5]||''}</div>
                            </td>
                            <td style={{padding:'10px 14px',textAlign:'center'}}>
                              <span style={{background:bg,color:tc,padding:'4px 10px',borderRadius:20,fontSize:'.68rem',fontWeight:700,whiteSpace:'nowrap'}}>{st}</span>
                            </td>
                            <td style={{padding:'10px 14px',textAlign:'center'}}>
                              <div style={{display:'flex',gap:4,justifyContent:'center'}}>
                                {([['👁','#2563eb','ดูรายละเอียด',()=>sdR(row)],['✏️','#d97706','แก้ไข',()=>{seR(row);ses(ns(row[8]));sed(row[9]||'');sen(row[10]||'');sef(null);}],['🗑','#dc2626','ลบ',()=>del(row[0])]] as [string,string,string,()=>void][]).map(([em,c,t,fn])=>(
                                  <button key={t} title={t} onClick={fn} style={{width:30,height:30,borderRadius:8,border:'1.5px solid #e5e7eb',background:'white',cursor:'pointer',fontSize:'.85rem',color:c,display:'flex',alignItems:'center',justifyContent:'center'}}>{em}</button>
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
                <div style={{padding:'12px 18px',borderTop:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8,background:'#fafafa'}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,fontSize:'.78rem',color:'#6b7280'}}>
                    แสดง <select value={rpp} onChange={e=>{srpp(Number(e.target.value));spg(1);}} style={{border:'1px solid #e5e7eb',borderRadius:6,padding:'3px 6px',fontSize:'.76rem'}}>{[5,10,25,50].map(n=><option key={n} value={n}>{n}</option>)}</select> รายการ
                  </div>
                  <div style={{display:'flex',gap:4,alignItems:'center'}}>
                    {[['«',1],['‹',pg-1]].map(([lbl,to])=><button key={lbl as string} disabled={pg<=1} onClick={()=>spg(to as number)} style={pb(pg<=1)}>{lbl}</button>)}
                    <span style={{fontSize:'.78rem',color:'#64748b',padding:'0 8px',fontWeight:600}}>หน้า {pg}/{tp||1}</span>
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
