'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwvB3QPrLHImxbVW4NXKXxd3bFDjQizm1HEDnRZX6D5fz402LiQZJWAL0iU-5-emdav/exec';
const ADMIN_USER = 'nonghan';
const ADMIN_PASS = 'nonghan11018';

const STATUSES = ['รอดำเนินการ','รับเรื่อง','ส่งเรื่อง','รอตอบกลับ','ปิดเรื่องได้','ปิดเรื่องไม่ได้','ทบทวนผู้บริหารรับทราบ'];
const DEPARTMENTS = ['','งานธุรการ','งาน CKD','งาน LAB','องค์กรแพทย์','งานกายภาพบำบัด','งานการพยาบาล','งานการพยาบาลป่วยผ่าตัดและวิสัญญีพยาบาล','งานการพยาบาลผู้คลอด','งานการพยาบาลผู้ป่วยนอก','งานการพยาบาลผู้ป่วยหนัก','งานการพยาบาลผู้ป่วยอุบัติเหตุฉุกเฉินและนิติเวช','งานการพยาบาลผู้ป่วยใน (ชาย)','งานการพยาบาลผู้ป่วยใน (พิเศษ)','งานการพยาบาลผู้ป่วยใน (หญิง)','งานการพยาบาลผู้ป่วยใน (เด็ก)','งานการเงินและบัญชี','งานคลินิกพิเศษ','งานคุณภาพ QIC','งานซ่อมบำรุง','งานทรัพยากรบุคคล','งานทันตกรรม','งานบริหารทั่วไป','งานปฐมภูมิ','งานประกันสุขภาพ','งานประชาสัมพันธ์','งานพยาบาลหน่วยควบคุมการติดเชื้อและงานจ่ายกลาง','งานพัสดุ','งานยานพาหนะ','งานรักษาความปลอดภัย','งานรังสีวิทยา','งานสุขภาพจิต','งานสุขาภิบาล','งานสูติ-นรีเวช','งานเทคโนโลยีสารสนเทศและพัฒระบบสุขภาพดิจิทัล','งานเภสัชกรรมผู้ป่วยนอก','งานเภสัชกรรมผู้ป่วยใน','งานเวชระเบียนและข้อมูลทางการแพทย์','งานแผนงานและประเมินผล','งานแพทย์แผนไทย','งานโภชนศาสตร์','งานโสตทัศนศึกษา'];

type Row = string[];
type Tab = 'dashboard' | 'management';

const STATUS_COLORS: Record<string, [string,string]> = {
  'รับเรื่อง':['#dbeafe','#1d4ed8'],'ส่งเรื่อง':['#e0f2fe','#0369a1'],
  'ปิดเรื่องได้':['#d1fae5','#059669'],'ปิดเรื่องไม่ได้':['#fee2e2','#dc2626'],
  'รอตอบกลับ':['#fef3c7','#d97706'],'ทบทวนผู้บริหารรับทราบ':['#ede9fe','#7c3aed'],
  'ทบทวนแล้ว':['#ede9fe','#7c3aed'],'ผู้บริหารรับทราบ':['#ede9fe','#7c3aed'],
};
const normSt = (s:string) => (['ทบทวนแล้ว','ผู้บริหารรับทราบ'].includes(s)) ? 'ทบทวนผู้บริหารรับทราบ' : (s||'รอดำเนินการ');
const stBadge = (s:string) => STATUS_COLORS[s]||['#f1f5f9','#475569'];
const inRange = (d:string,s:string,e:string) => {
  const dt=new Date(d); dt.setHours(0,0,0,0);
  if(s){const sd=new Date(s);sd.setHours(0,0,0,0);if(dt<sd)return false;}
  if(e){const ed=new Date(e);ed.setHours(0,0,0,0);if(dt>ed)return false;}
  return true;
};

export default function AdminPage() {
  const [view,setView]=useState<'login'|'panel'>('login');
  const [tab,setTab]=useState<Tab>('dashboard');
  const [user,setUser]=useState(''); const [pass,setPass]=useState(''); const [loginErr,setLoginErr]=useState('');
  const [data,setData]=useState<Row[]>([]); const [loading,setLoading]=useState(false); const [fetchErr,setFetchErr]=useState('');
  const [dStart,setDStart]=useState(''); const [dEnd,setDEnd]=useState('');
  const [search,setSearch]=useState(''); const [mStart,setMStart]=useState(''); const [mEnd,setMEnd]=useState('');
  const [rpp,setRpp]=useState(10); const [page,setPage]=useState(1);
  const [editRow,setEditRow]=useState<Row|null>(null);
  const [eSt,setESt]=useState(''); const [eDept,setEDept]=useState(''); const [eNotes,setENotes]=useState('');
  const [eFile,setEFile]=useState<File|null>(null); const eFileRef=useRef<HTMLInputElement>(null);
  const [saving,setSaving]=useState('');
  const [detailRow,setDetailRow]=useState<Row|null>(null);
  const stChRef=useRef<HTMLCanvasElement>(null);
  const issChRef=useRef<HTMLCanvasElement>(null);
  const deptChRef=useRef<HTMLCanvasElement>(null);
  const chartI=useRef<Record<string,{destroy?:()=>void}>>({});

  const dashData=data.filter(r=>inRange(r[0],dStart,dEnd));
  const mgmtData=data.filter(r=>{
    if(!inRange(r[0],mStart,mEnd))return false;
    if(search&&!r.join(' ').toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });
  const totalPg=Math.ceil(mgmtData.length/rpp);
  const pgData=mgmtData.slice((page-1)*rpp,page*rpp);

  const fetchData=useCallback(async()=>{
    setLoading(true);setFetchErr('');
    try{
      const res=await fetch(`${SCRIPT_URL}?action=getData`,{redirect:'follow'});
      if(!res.ok)throw new Error(`HTTP ${res.status}`);
      const json=await res.json();
      const rows:Row[]=Array.isArray(json)?json:[];
      if(rows.length>0)rows.shift();
      rows.sort((a,b)=>new Date(b[0]).getTime()-new Date(a[0]).getTime());
      setData(rows.map(r=>{r[0]=r[0]?.toString()||'';return r;}));
    }catch(e){setFetchErr('โหลดข้อมูลไม่สำเร็จ กรุณาตรวจสอบ Apps Script: '+String(e));}
    finally{setLoading(false);}
  },[]);

  useEffect(()=>{if(view==='panel')fetchData();},[view,fetchData]);

  useEffect(()=>{
    if(tab!=='dashboard'||dashData.length===0)return;
    const load=()=>{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const C=(window as any).Chart;
      if(!C)return;
      // Status doughnut
      const stC:Record<string,number>={};
      const issC:Record<string,number>={};
      const deptC:Record<string,number>={};
      dashData.forEach(r=>{
        const st=normSt(r[8]);stC[st]=(stC[st]||0)+1;
        if(r[1])issC[r[1]]=(issC[r[1]]||0)+1;
        if(r[9])deptC[r[9]]=(deptC[r[9]]||0)+1;
      });
      const bld=(id:string,ref:React.RefObject<HTMLCanvasElement|null>,type:string,labels:string[],values:number[],colors:string[],opts={})=>{
        if(chartI.current[id]?.destroy)chartI.current[id].destroy!();
        if(!ref.current)return;
        chartI.current[id]=new C(ref.current,{type,data:{labels,datasets:[{data:values,backgroundColor:colors,borderRadius:type==='bar'?4:0,borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:type==='doughnut',position:'right',labels:{font:{family:'Sarabun',size:11},boxWidth:10}},tooltip:{backgroundColor:'#1e293b',bodyFont:{family:'Sarabun'},titleFont:{family:'Sarabun'},cornerRadius:8}},scales:type!=='doughnut'?{y:{grid:{color:'#f1f5f9'},border:{display:false},ticks:{font:{family:'Sarabun',size:10},color:'#64748b'}},x:{grid:{display:false},border:{display:false},ticks:{font:{family:'Sarabun',size:10},color:'#64748b'}}}:undefined,...opts}});
      };
      bld('st',stChRef,'doughnut',Object.keys(stC),Object.values(stC),['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#64748b']);
      bld('iss',issChRef,'bar',Object.keys(issC),Object.values(issC),['#38a382','#005C4B','#0d9488','#0891b2','#4f46e5']);
      const topDept=Object.entries(deptC).sort((a,b)=>b[1]-a[1]).slice(0,8);
      bld('dept',deptChRef,'bar',topDept.map(d=>d[0].replace('งาน','')),topDept.map(d=>d[1]),['#005C4B'],{indexAxis:'y'});
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if(!(window as any).Chart){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/chart.js';s.onload=load;document.head.appendChild(s);}
    else load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[tab,dashData.length,dStart,dEnd]);

  function handleLogin(e:React.FormEvent){e.preventDefault();if(user===ADMIN_USER&&pass===ADMIN_PASS){setView('panel');setLoginErr('');}else setLoginErr('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');}

  async function saveEdit(){
    if(!editRow)return;setSaving('saving');
    const payload:Record<string,unknown>={action:'update',timestampISO:editRow[0],status:eSt,department:eDept,notes:eNotes};
    if(eFile){const b64=await new Promise<string>((res,rej)=>{const fr=new FileReader();fr.onload=()=>res((fr.result as string).split(',')[1]);fr.onerror=rej;fr.readAsDataURL(eFile!);});payload.fileInfo={filename:eFile.name,mimeType:eFile.type,base64:b64};}
    try{
      await fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      setData(p=>p.map(r=>r[0]===editRow[0]?[...r.slice(0,8),eSt,eDept,eNotes,r[11]]:r));
      setEditRow(null);setSaving('ok');setTimeout(()=>{setSaving('');fetchData();},1500);
    }catch{setSaving('err');}
  }
  async function deleteRow(ts:string){
    if(!confirm('ต้องการลบรายการนี้?'))return;
    try{await fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',timestampISO:ts})});setData(p=>p.filter(r=>r[0]!==ts));}
    catch{alert('ลบไม่สำเร็จ');}
  }

  const stCounts:Record<string,number>={};
  dashData.forEach(r=>{const st=normSt(r[8]);stCounts[st]=(stCounts[st]||0)+1;});
  const deptCounts:Record<string,number>={};
  dashData.forEach(r=>{if(r[9])deptCounts[r[9]]=(deptCounts[r[9]]||0)+1;});
  const uniqueDeptCount=Object.keys(deptCounts).length;

  // ─── LOGIN ───
  if(view==='login') return (
    <div style={{minHeight:'100vh',display:'flex',fontFamily:"'Sarabun',sans-serif"}}>
      {/* Left */}
      <div style={{flex:1,background:'linear-gradient(160deg,#002d24 0%,#004d3d 40%,#005C4B 70%,#2d8a70 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:48,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,opacity:.06,backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0h10v60H25V0zm-25 25h60v10H0V25z' fill='%23ffffff'/%3E%3C/svg%3E\")"}} />
        <div style={{position:'absolute',top:-80,right:-80,width:320,height:320,borderRadius:'50%',background:'radial-gradient(circle,rgba(56,163,130,.4),transparent 70%)'}}/>
        <div style={{position:'relative',zIndex:1,textAlign:'center',maxWidth:340}}>
          <div style={{width:108,height:108,borderRadius:'50%',background:'rgba(255,255,255,.12)',border:'2px solid rgba(255,255,255,.2)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 24px',backdropFilter:'blur(8px)',boxShadow:'0 20px 60px rgba(0,0,0,.3)'}}>
            <img src="https://img1.pic.in.th/images/nhh.png" alt="NHH" style={{width:76,height:76,objectFit:'contain'}}/>
          </div>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,.1)',border:'1px solid rgba(255,255,255,.15)',borderRadius:99,padding:'4px 14px',marginBottom:14}}>
            <span style={{width:5,height:5,borderRadius:'50%',background:'#6ee7b7',display:'inline-block'}}/>
            <span style={{fontSize:'.68rem',fontWeight:700,color:'#a7f3d0',letterSpacing:2}}>ADMIN SYSTEM</span>
          </div>
          <h1 style={{color:'white',fontWeight:900,fontSize:'1.8rem',margin:'0 0 8px',lineHeight:1.2}}>โรงพยาบาลหนองหาน</h1>
          <p style={{color:'rgba(255,255,255,.65)',fontSize:'.88rem',margin:'0 0 32px'}}>จังหวัดอุดรธานี</p>
          <div style={{width:36,height:3,background:'linear-gradient(90deg,#fbbf24,#f59e0b)',borderRadius:99,margin:'0 auto 28px'}}/>
          {[['🏥','ศูนย์รับเรื่องร้องเรียนและเสนอแนะ','สำหรับการจัดการและติดตามผล'],['📊','Dashboard แบบ Real-time','สถิติ กราฟ และรายงานเชิงวิเคราะห์'],['🔔','แจ้งเตือนอัตโนมัติ','ผ่าน LINE Notify และอีเมล']].map(([ic,t,d])=>(
            <div key={t} style={{display:'flex',gap:12,alignItems:'flex-start',marginBottom:12,textAlign:'left',background:'rgba(255,255,255,.07)',borderRadius:14,padding:'12px 16px',border:'1px solid rgba(255,255,255,.1)'}}>
              <span style={{fontSize:'1.1rem',flexShrink:0}}>{ic}</span>
              <div><div style={{color:'white',fontWeight:700,fontSize:'.84rem',lineHeight:1.3}}>{t}</div><div style={{color:'rgba(255,255,255,.5)',fontSize:'.72rem',marginTop:3}}>{d}</div></div>
            </div>
          ))}
        </div>
      </div>
      {/* Right */}
      <div style={{width:'100%',maxWidth:460,background:'#f8fafc',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px 44px',position:'relative'}}>
        <div style={{width:'100%',maxWidth:340}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:99,padding:'5px 14px',marginBottom:20}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>
            <span style={{fontSize:'.7rem',fontWeight:700,color:'#059669',letterSpacing:1}}>ADMIN ACCESS</span>
          </div>
          <h2 style={{fontSize:'1.9rem',fontWeight:900,color:'#1e293b',margin:'0 0 4px',letterSpacing:'-.5px'}}>เข้าสู่ระบบ</h2>
          <p style={{color:'#64748b',fontSize:'.86rem',margin:'0 0 28px'}}>ระบบจัดการข้อร้องเรียน · โรงพยาบาลหนองหาน</p>
          <form onSubmit={handleLogin}>
            {[['ชื่อผู้ใช้งาน','text',user,setUser,'username','กรอกชื่อผู้ใช้งาน','M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'],['รหัสผ่าน','password',pass,setPass,'current-password','••••••••','M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z']].map(([lbl,t,val,setter,ac,ph,icon])=>(
              <div key={lbl as string} style={{marginBottom:14}}>
                <label style={{display:'block',fontSize:'.78rem',fontWeight:700,color:'#374151',marginBottom:5}}>{lbl as string}</label>
                <div style={{position:'relative'}}>
                  <svg style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={icon as string}/></svg>
                  <input type={t as string} value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} placeholder={ph as string} autoComplete={ac as string} style={{width:'100%',padding:'10px 12px 10px 36px',border:'1.5px solid #e5e7eb',borderRadius:10,fontSize:'.88rem',background:'#fafafa',color:'#1e293b',fontFamily:"'Sarabun',sans-serif",transition:'all .2s',outline:'none'}}/>
                </div>
              </div>
            ))}
            {loginErr&&<div style={{display:'flex',alignItems:'center',gap:8,background:'#fff1f2',border:'1px solid #fecdd3',borderRadius:10,padding:'10px 14px',marginBottom:14}}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg><span style={{color:'#dc2626',fontSize:'.82rem',fontWeight:600}}>{loginErr}</span></div>}
            <button type="submit" style={{width:'100%',padding:'12px',background:'linear-gradient(135deg,#005C4B,#38a382)',color:'white',border:'none',borderRadius:12,fontWeight:800,fontSize:'.95rem',cursor:'pointer',fontFamily:"'Sarabun',sans-serif",boxShadow:'0 8px 24px rgba(0,92,75,.35)',display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginTop:6}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25"/></svg>
              เข้าสู่ระบบ
            </button>
          </form>
          <div style={{textAlign:'center',marginTop:24,paddingTop:18,borderTop:'1px solid #e5e7eb'}}>
            <a href="/nhh-request/" style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:'.78rem',color:'#64748b',textDecoration:'none',fontWeight:600}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
              กลับสู่หน้าแจ้งเรื่อง
            </a>
          </div>
        </div>
        <p style={{position:'absolute',bottom:16,fontSize:'.65rem',color:'#cbd5e1'}}>พัฒนาโดย กลุ่มงานสุขภาพดิจิทัล · โรงพยาบาลหนองหาน</p>
      </div>
      <style>{`*{box-sizing:border-box}input:focus{outline:none!important;border-color:#38a382!important;box-shadow:0 0 0 3px rgba(56,163,130,.15)!important}`}</style>
    </div>
  );

  // ─── PANEL ───
  return (
    <div style={{minHeight:'100vh',background:'#f0f4f3',fontFamily:"'Sarabun',sans-serif",display:'flex',flexDirection:'column'}}>
      {/* Topbar */}
      <header style={{background:'white',borderBottom:'1px solid #e5e7eb',position:'sticky',top:0,zIndex:50,boxShadow:'0 1px 4px rgba(0,0,0,.06)'}}>
        <div style={{maxWidth:1280,margin:'0 auto',padding:'0 20px',height:64,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <img src="https://img1.pic.in.th/images/nhh.png" alt="NHH" style={{width:34,height:34,objectFit:'contain',borderRadius:8,border:'1px solid #e5e7eb'}}/>
            <div><div style={{fontWeight:900,fontSize:'.82rem',color:'#1e293b',lineHeight:1.2}}>NH HOSPITAL</div><div style={{fontSize:'.6rem',color:'#94a3b8',fontWeight:700,letterSpacing:2}}>ADMIN PANEL</div></div>
          </div>
          {/* Tabs */}
          <div style={{display:'flex',gap:4,background:'#f1f5f9',borderRadius:99,padding:4,border:'1px solid #e5e7eb'}}>
            {([['dashboard','📊 Dashboard'],['management','📋 ข้อมูลรับแจ้ง']] as [Tab,string][]).map(([t,lbl])=>(
              <button key={t} onClick={()=>setTab(t)} style={{padding:'7px 18px',borderRadius:99,border:'none',cursor:'pointer',fontWeight:700,fontSize:'.8rem',fontFamily:"'Sarabun',sans-serif",background:tab===t?'#005C4B':'transparent',color:tab===t?'white':'#64748b',boxShadow:tab===t?'0 2px 8px rgba(0,92,75,.3)':'none',transition:'all .2s'}}>{lbl}</button>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{display:'flex',alignItems:'center',gap:5,fontSize:'.7rem',color:'#059669',fontWeight:700,background:'#f0fdf4',padding:'4px 10px',borderRadius:99,border:'1px solid #bbf7d0'}}>
              <span style={{width:5,height:5,borderRadius:'50%',background:'#059669',display:'inline-block'}}/>Online
            </div>
            <button onClick={()=>{setView('login');setUser('');setPass('');setData([]);}} style={{width:34,height:34,borderRadius:9,border:'1px solid #e5e7eb',background:'white',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#94a3b8'}} title="ออกจากระบบ">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>
            </button>
          </div>
        </div>
      </header>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'24px 20px',width:'100%',flex:1}}>
        {fetchErr&&<div style={{background:'#fff1f2',border:'1px solid #fecdd3',borderRadius:10,padding:'12px 16px',color:'#be123c',fontSize:'.84rem',marginBottom:16}}>{fetchErr}</div>}
        {saving==='ok'&&<div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:10,padding:'12px 16px',color:'#059669',fontSize:'.84rem',marginBottom:16}}>✅ บันทึกสำเร็จ</div>}

        {/* ═══ DASHBOARD ═══ */}
        {tab==='dashboard'&&(
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:20}}>
              <div><h2 style={{fontSize:'1.5rem',fontWeight:900,color:'#1e293b',margin:'0 0 2px',letterSpacing:'-.5px'}}>Dashboard</h2><p style={{margin:0,fontSize:'.82rem',color:'#64748b'}}>ภาพรวมศูนย์รับเรื่องร้องเรียน โรงพยาบาลหนองหาน</p></div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {[['จาก',dStart,setDStart],['ถึง',dEnd,setDEnd]].map(([lbl,val,setter])=>(
                  <div key={lbl as string} style={{display:'flex',alignItems:'center',gap:4}}>
                    <label style={{fontSize:'.76rem',color:'#64748b',fontWeight:600,whiteSpace:'nowrap'}}>{lbl as string}</label>
                    <input type="date" value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} style={dateInp}/>
                  </div>
                ))}
                <button onClick={()=>{setDStart('');setDEnd('');}} style={outBtn}>รีเซ็ต</button>
                <button onClick={fetchData} disabled={loading} style={greenBtn}>{loading?'โหลด...':'รีเฟรช'}</button>
              </div>
            </div>

            {/* Big stat cards */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:12,marginBottom:16}}>
              {/* Total */}
              <div style={{background:'linear-gradient(135deg,#005C4B,#38a382)',borderRadius:16,padding:'18px 16px',display:'flex',flexDirection:'column',gap:4,boxShadow:'0 4px 20px rgba(0,92,75,.25)'}}>
                <span style={{fontSize:'.68rem',color:'rgba(255,255,255,.7)',fontWeight:700,textTransform:'uppercase',letterSpacing:1}}>เรื่องทั้งหมด</span>
                <span style={{fontSize:'2.8rem',fontWeight:900,color:'white',lineHeight:1}}>{dashData.length}</span>
                <span style={{fontSize:'.68rem',color:'rgba(255,255,255,.6)'}}>รายการ</span>
              </div>
              {/* Dept count */}
              <div style={{background:'linear-gradient(135deg,#1d4ed8,#3b82f6)',borderRadius:16,padding:'18px 16px',display:'flex',flexDirection:'column',gap:4,boxShadow:'0 4px 20px rgba(29,78,216,.25)'}}>
                <span style={{fontSize:'.68rem',color:'rgba(255,255,255,.7)',fontWeight:700,textTransform:'uppercase',letterSpacing:1}}>หน่วยงาน</span>
                <span style={{fontSize:'2.8rem',fontWeight:900,color:'white',lineHeight:1}}>{uniqueDeptCount}</span>
                <span style={{fontSize:'.68rem',color:'rgba(255,255,255,.6)'}}>แห่งที่มีเรื่อง</span>
              </div>
              {/* Per status */}
              {Object.entries(stCounts).slice(0,6).map(([st,cnt])=>{
                const [bg,tc]=stBadge(st);
                return(
                  <div key={st} style={{background:'white',borderRadius:16,padding:'18px 16px',display:'flex',flexDirection:'column',gap:4,border:`1px solid #e5e7eb`,boxShadow:'0 1px 6px rgba(0,0,0,.04)'}}>
                    <span style={{fontSize:'.62rem',color:'#94a3b8',fontWeight:700,textTransform:'uppercase',letterSpacing:1,lineHeight:1.4}}>{st}</span>
                    <span style={{fontSize:'2.4rem',fontWeight:900,color:tc,lineHeight:1}}>{cnt}</span>
                    <span style={{display:'inline-block',background:bg,color:tc,borderRadius:4,padding:'2px 8px',fontSize:'.62rem',fontWeight:700,width:'fit-content'}}>{Math.round(cnt/dashData.length*100)}%</span>
                  </div>
                );
              })}
            </div>

            {/* Charts */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:14}}>
              {[['st',stChRef,'สัดส่วนสถานะ','#3b82f6'],['iss',issChRef,'สถิติตามประเด็น','#38a382'],['dept',deptChRef,'หน่วยงานที่มีเรื่องมากสุด 8 อันดับ','#005C4B']].map(([id,ref,title,color])=>(
                <div key={id as string} style={{background:'white',borderRadius:16,border:'1px solid #e5e7eb',padding:'18px',boxShadow:'0 1px 6px rgba(0,0,0,.04)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:14}}>
                    <span style={{width:7,height:7,borderRadius:'50%',background:color as string,display:'inline-block'}}/>
                    <span style={{fontSize:'.84rem',fontWeight:700,color:'#1e293b'}}>{title as string}</span>
                  </div>
                  <div style={{height:220}}><canvas ref={ref as React.RefObject<HTMLCanvasElement>}/></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ MANAGEMENT ═══ */}
        {tab==='management'&&(
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12,marginBottom:20}}>
              <div><h2 style={{fontSize:'1.5rem',fontWeight:900,color:'#1e293b',margin:'0 0 2px',letterSpacing:'-.5px'}}>รายการรับแจ้ง</h2><p style={{margin:0,fontSize:'.82rem',color:'#64748b'}}>ทั้งหมด {mgmtData.length} รายการ</p></div>
            </div>

            <div style={{background:'white',borderRadius:16,boxShadow:'0 2px 12px rgba(0,0,0,.06)',border:'1px solid #e5e7eb',overflow:'hidden'}}>
              {/* Toolbar */}
              <div style={{padding:'14px 18px',borderBottom:'1px solid #f1f5f9',display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',background:'#fafafa'}}>
                <div style={{position:'relative',flex:1,minWidth:180}}>
                  <svg style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:'#9ca3af'}} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}} placeholder="ค้นหา..." style={{...searchInp,paddingLeft:30}}/>
                </div>
                {[['จาก',mStart,(v:string)=>{setMStart(v);setPage(1);}],['ถึง',mEnd,(v:string)=>{setMEnd(v);setPage(1);}]].map(([lbl,val,setter])=>(
                  <div key={lbl as string} style={{display:'flex',alignItems:'center',gap:4}}>
                    <label style={{fontSize:'.74rem',color:'#6b7280',fontWeight:600}}>{lbl as string}</label>
                    <input type="date" value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} style={dateInp}/>
                  </div>
                ))}
                <button onClick={()=>{setSearch('');setMStart('');setMEnd('');setPage(1);}} style={outBtn}>ล้าง</button>
                <button onClick={fetchData} disabled={loading} style={greenBtn}>{loading?'...':'รีเฟรช'}</button>
              </div>

              {/* Table */}
              <div style={{overflowX:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',minWidth:680}}>
                  <thead>
                    <tr style={{borderBottom:'1px solid #e5e7eb',background:'#f9fafb'}}>
                      {['วันที่แจ้ง','ประเด็น / รายละเอียด','ผู้แจ้ง','สถานะ','จัดการ'].map((h,i)=>(
                        <th key={h} style={{padding:'11px 14px',textAlign:i>=3?'center':'left',fontSize:'.68rem',fontWeight:700,color:'#6b7280',textTransform:'uppercase',letterSpacing:.8}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading&&<tr><td colSpan={5} style={{textAlign:'center',padding:44,color:'#9ca3af'}}>กำลังโหลดข้อมูล...</td></tr>}
                    {!loading&&pgData.length===0&&<tr><td colSpan={5} style={{textAlign:'center',padding:44,color:'#9ca3af',fontSize:'.9rem'}}>ไม่พบข้อมูล</td></tr>}
                    {pgData.map((row,i)=>{
                      const st=normSt(row[8]);
                      const [stBg,stTc]=stBadge(st);
                      const d=new Date(row[0]);
                      const dt=isNaN(d.getTime())?row[0]:d.toLocaleDateString('th-TH',{day:'2-digit',month:'short',year:'2-digit'});
                      const tm=isNaN(d.getTime())?'':d.toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'});
                      return(
                        <tr key={i} style={{borderBottom:'1px solid #f3f4f6',background:i%2===0?'white':'#fafafa',transition:'background .15s'}}
                          onMouseEnter={e=>(e.currentTarget.style.background='#f0fdf4')}
                          onMouseLeave={e=>(e.currentTarget.style.background=i%2===0?'white':'#fafafa')}>
                          <td style={{padding:'12px 14px',whiteSpace:'nowrap'}}>
                            <div style={{fontWeight:700,fontSize:'.8rem',color:'#374151'}}>{dt}</div>
                            <div style={{fontSize:'.7rem',color:'#9ca3af'}}>{tm} น.</div>
                          </td>
                          <td style={{padding:'12px 14px',maxWidth:300}}>
                            <div style={{fontWeight:700,fontSize:'.84rem',color:'#111827',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={row[1]}>{row[1]}</div>
                            <div style={{fontSize:'.72rem',color:'#6b7280',marginTop:2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{row[2]} {row[3]?'· '+row[3].slice(0,40)+'…':''}</div>
                          </td>
                          <td style={{padding:'12px 14px',whiteSpace:'nowrap'}}>
                            <div style={{fontSize:'.84rem',fontWeight:600,color:'#374151'}}>{row[4]||'-'}</div>
                            <div style={{fontSize:'.7rem',color:'#9ca3af'}}>{row[5]||''}</div>
                          </td>
                          <td style={{padding:'12px 14px',textAlign:'center'}}>
                            <span style={{background:stBg,color:stTc,padding:'4px 10px',borderRadius:6,fontSize:'.7rem',fontWeight:700,whiteSpace:'nowrap'}}>{st}</span>
                          </td>
                          <td style={{padding:'12px 14px',textAlign:'center'}}>
                            <div style={{display:'flex',gap:4,justifyContent:'center'}}>
                              <IconBtn emoji="👁" color="#2563eb" title="ดูรายละเอียด" onClick={()=>setDetailRow(row)}/>
                              <IconBtn emoji="✏️" color="#d97706" title="แก้ไข" onClick={()=>{setEditRow(row);setESt(normSt(row[8]));setEDept(row[9]||'');setENotes(row[10]||'');setEFile(null);}}/>
                              <IconBtn emoji="🗑" color="#ef4444" title="ลบ" onClick={()=>deleteRow(row[0])}/>
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
                <div style={{display:'flex',alignItems:'center',gap:6,fontSize:'.8rem',color:'#6b7280'}}>
                  แสดง
                  <select value={rpp} onChange={e=>{setRpp(Number(e.target.value));setPage(1);}} style={{border:'1px solid #e5e7eb',borderRadius:6,padding:'3px 8px',fontSize:'.76rem',background:'white'}}>
                    {[5,10,25,50].map(n=><option key={n} value={n}>{n}</option>)}
                  </select>
                  รายการ
                </div>
                <div style={{display:'flex',gap:4,alignItems:'center'}}>
                  <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} style={pgBtn(page<=1)}>‹ ก่อนหน้า</button>
                  <span style={{fontSize:'.78rem',color:'#6b7280',padding:'0 8px'}}>หน้า {page}/{totalPg||1}</span>
                  <button disabled={page>=totalPg} onClick={()=>setPage(p=>p+1)} style={pgBtn(page>=totalPg)}>ถัดไป ›</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══ EDIT MODAL ═══ */}
      {editRow&&(
        <div style={overlay} onClick={()=>setEditRow(null)}>
          <div style={modalBox} onClick={e=>e.stopPropagation()}>
            <div style={modalHdr}><span style={{fontWeight:800,color:'#1e293b'}}>✏️ อัปเดตสถานะ</span><button onClick={()=>setEditRow(null)} style={closeBtn}>✕</button></div>
            <div style={{padding:'18px 22px',display:'flex',flexDirection:'column',gap:12}}>
              {[['สถานะ',eSt,setESt,'select',STATUSES,[]],['หน่วยงานรับผิดชอบ',eDept,setEDept,'select',DEPARTMENTS,[]]].map(([lbl,val,setter,type,opts])=>(
                <div key={lbl as string}>
                  <label style={mlb}>{lbl as string}</label>
                  <select value={val as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)} style={minp}>
                    {(opts as string[]).map(o=><option key={o} value={o}>{o||'-- เลือก --'}</option>)}
                  </select>
                </div>
              ))}
              <div><label style={mlb}>ผลการดำเนินการ / หมายเหตุ</label><textarea value={eNotes} onChange={e=>setENotes(e.target.value)} rows={3} style={{...minp,resize:'vertical'}} placeholder="ระบุความคืบหน้า..."/></div>
              <div>
                <label style={mlb}>แนบเอกสาร (ถ้ามี)</label>
                <label htmlFor="eFile" style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',border:'1.5px dashed #d1d5db',borderRadius:8,background:'#fafafa',cursor:'pointer'}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
                  <span style={{fontSize:'.8rem',color:eFile?'#059669':'#9ca3af',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{eFile?eFile.name:'เลือกไฟล์...'}</span>
                </label>
                <input id="eFile" ref={eFileRef} type="file" accept="image/*,.pdf,.doc,.docx" onChange={e=>setEFile(e.target.files?.[0]||null)} style={{display:'none'}}/>
              </div>
            </div>
            <div style={{padding:'12px 22px',borderTop:'1px solid #f1f5f9',display:'flex',gap:8,justifyContent:'flex-end'}}>
              <button onClick={()=>setEditRow(null)} style={outBtn}>ยกเลิก</button>
              <button onClick={saveEdit} disabled={saving==='saving'} style={greenBtn}>{saving==='saving'?'กำลังบันทึก...':'บันทึก'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DETAIL MODAL ═══ */}
      {detailRow&&(
        <div style={overlay} onClick={()=>setDetailRow(null)}>
          <div style={{...modalBox,maxWidth:580}} onClick={e=>e.stopPropagation()}>
            <div style={modalHdr}><span style={{fontWeight:800,color:'#1e293b'}}>📄 รายละเอียด</span><button onClick={()=>setDetailRow(null)} style={closeBtn}>✕</button></div>
            <div style={{padding:'18px 22px',maxHeight:'68vh',overflowY:'auto'}}>
              {(()=>{
                const r=detailRow;const st=normSt(r[8]);const[bg,tc]=stBadge(st);
                const d=new Date(r[0]);const dt=isNaN(d.getTime())?r[0]:d.toLocaleString('th-TH',{day:'2-digit',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'});
                return(<>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
                    <span style={{background:bg,color:tc,padding:'3px 10px',borderRadius:6,fontSize:'.7rem',fontWeight:700}}>{st}</span>
                    <span style={{background:'#f1f5f9',color:'#475569',padding:'3px 10px',borderRadius:6,fontSize:'.7rem',fontWeight:700}}>{r[2]}</span>
                  </div>
                  <h3 style={{fontSize:'1.05rem',fontWeight:900,color:'#1e293b',margin:'0 0 14px'}}>{r[1]}</h3>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,padding:'14px 0',borderTop:'1px solid #f1f5f9',borderBottom:'1px solid #f1f5f9',marginBottom:14}}>
                    {[['ผู้แจ้ง',r[4]||'-'],['วันเวลา',dt+' น.'],['เบอร์',r[5]||'-'],['Line/Email',[r[6]?'Line:'+r[6]:'',r[7]].filter(Boolean).join(', ')||'-']].map(([k,v])=>(
                      <div key={k}><p style={{fontSize:'.65rem',color:'#9ca3af',fontWeight:700,textTransform:'uppercase',letterSpacing:1,margin:'0 0 3px'}}>{k}</p><p style={{fontSize:'.86rem',fontWeight:700,color:'#1e293b',margin:0}}>{v}</p></div>
                    ))}
                  </div>
                  <p style={{fontSize:'.65rem',color:'#9ca3af',fontWeight:700,textTransform:'uppercase',letterSpacing:1,margin:'0 0 6px'}}>รายละเอียด</p>
                  <div style={{background:'#f9fafb',border:'1px solid #e5e7eb',borderRadius:10,padding:'12px 14px',fontSize:'.86rem',color:'#374151',whiteSpace:'pre-wrap',lineHeight:1.7,marginBottom:14}}>{r[3]}</div>
                  <div style={{background:'#f0fdf4',border:'1px solid #bbf7d0',borderRadius:10,padding:'12px 14px'}}>
                    <p style={{fontSize:'.65rem',fontWeight:800,color:'#059669',textTransform:'uppercase',letterSpacing:1,margin:'0 0 8px'}}>ส่วนของเจ้าหน้าที่</p>
                    <p style={{fontSize:'.82rem',margin:'0 0 4px'}}><span style={{color:'#64748b',fontWeight:600}}>หน่วยงาน: </span><span style={{fontWeight:700}}>{r[9]||'-'}</span></p>
                    <p style={{fontSize:'.82rem',margin:'0 0 4px'}}><span style={{color:'#64748b',fontWeight:600}}>หมายเหตุ: </span>{r[10]||'-'}</p>
                    {r[11]&&<a href={r[11]} target="_blank" rel="noreferrer" style={{color:'#005C4B',fontWeight:600,fontSize:'.82rem'}}>📎 ดูเอกสารแนบ</a>}
                  </div>
                </>);
              })()}
            </div>
            <div style={{padding:'12px 22px',borderTop:'1px solid #f1f5f9',textAlign:'right'}}><button onClick={()=>setDetailRow(null)} style={outBtn}>ปิด</button></div>
          </div>
        </div>
      )}

      <style>{`*{box-sizing:border-box}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}input:focus,select:focus,textarea:focus{outline:none!important;border-color:#38a382!important;box-shadow:0 0 0 3px rgba(56,163,130,.15)!important}`}</style>
    </div>
  );
}

const IconBtn=({emoji,color,title,onClick}:{emoji:string,color:string,title:string,onClick:()=>void})=>(
  <button onClick={onClick} title={title} style={{width:28,height:28,borderRadius:7,border:'1px solid #e5e7eb',background:'white',cursor:'pointer',fontSize:'.85rem',transition:'all .15s',color}}>{emoji}</button>
);

const dateInp:React.CSSProperties={padding:'6px 10px',border:'1px solid #e5e7eb',borderRadius:8,fontSize:'.8rem',background:'white',color:'#374151',cursor:'pointer'};
const outBtn:React.CSSProperties={padding:'7px 14px',border:'1px solid #e5e7eb',borderRadius:8,background:'white',cursor:'pointer',fontSize:'.8rem',fontWeight:600,color:'#475569',fontFamily:"'Sarabun',sans-serif"};
const greenBtn:React.CSSProperties={padding:'7px 16px',border:'none',borderRadius:8,background:'#005C4B',cursor:'pointer',fontSize:'.8rem',fontWeight:700,color:'white',fontFamily:"'Sarabun',sans-serif"};
const searchInp:React.CSSProperties={width:'100%',padding:'8px 12px',border:'1.5px solid #e5e7eb',borderRadius:9,fontSize:'.84rem',background:'white',color:'#1e293b',fontFamily:"'Sarabun',sans-serif",outline:'none'};
const pgBtn=(dis:boolean):React.CSSProperties=>({padding:'5px 12px',borderRadius:7,border:'1px solid #e5e7eb',background:dis?'#f9fafb':'white',cursor:dis?'not-allowed':'pointer',fontSize:'.78rem',opacity:dis?.4:1,color:'#374151'});
const overlay:React.CSSProperties={position:'fixed',inset:0,background:'rgba(15,23,42,.5)',backdropFilter:'blur(4px)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',padding:20};
const modalBox:React.CSSProperties={background:'white',borderRadius:18,width:'100%',maxWidth:460,boxShadow:'0 24px 60px rgba(0,0,0,.2)',border:'1px solid #e5e7eb',overflow:'hidden'};
const modalHdr:React.CSSProperties={padding:'14px 22px',borderBottom:'1px solid #f1f5f9',display:'flex',alignItems:'center',justifyContent:'space-between',background:'#fafafa'};
const closeBtn:React.CSSProperties={background:'none',border:'none',cursor:'pointer',fontSize:'1rem',color:'#9ca3af'};
const mlb:React.CSSProperties={display:'block',fontSize:'.78rem',fontWeight:700,color:'#374151',marginBottom:5};
const minp:React.CSSProperties={width:'100%',padding:'9px 12px',border:'1.5px solid #e5e7eb',borderRadius:9,fontSize:'.86rem',background:'#fafafa',color:'#1e293b',fontFamily:"'Sarabun',sans-serif",outline:'none'};
