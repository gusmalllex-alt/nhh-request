'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwvB3QPrLHImxbVW4NXKXxd3bFDjQizm1HEDnRZX6D5fz402LiQZJWAL0iU-5-emdav/exec';

const ADMIN_USER = 'nonghan';
const ADMIN_PASS = 'nonghan11018';

const STATUSES = ['รอดำเนินการ', 'รับเรื่อง', 'ส่งเรื่อง', 'รอตอบกลับ', 'ปิดเรื่องได้', 'ปิดเรื่องไม่ได้', 'ทบทวนผู้บริหารรับทราบ'];
const DEPARTMENTS = ['', 'งานธุรการ', 'งาน CKD', 'งาน LAB', 'องค์กรแพทย์', 'งานกายภาพบำบัด', 'งานการพยาบาล', 'งานการพยาบาลป่วยผ่าตัดและวิสัญญีพยาบาล', 'งานการพยาบาลผู้คลอด', 'งานการพยาบาลผู้ป่วยนอก', 'งานการพยาบาลผู้ป่วยหนัก', 'งานการพยาบาลผู้ป่วยอุบัติเหตุฉุกเฉินและนิติเวช', 'งานการพยาบาลผู้ป่วยใน (ชาย)', 'งานการพยาบาลผู้ป่วยใน (พิเศษ)', 'งานการพยาบาลผู้ป่วยใน (หญิง)', 'งานการพยาบาลผู้ป่วยใน (เด็ก)', 'งานการเงินและบัญชี', 'งานคลินิกพิเศษ', 'งานคุณภาพ QIC', 'งานซ่อมบำรุง', 'งานทรัพยากรบุคคล', 'งานทันตกรรม', 'งานบริหารทั่วไป', 'งานปฐมภูมิ', 'งานประกันสุขภาพ', 'งานประชาสัมพันธ์', 'งานพยาบาลหน่วยควบคุมการติดเชื้อและงานจ่ายกลาง', 'งานพัสดุ', 'งานยานพาหนะ', 'งานรักษาความปลอดภัย', 'งานรังสีวิทยา', 'งานสุขภาพจิต', 'งานสุขาภิบาล', 'งานสูติ-นรีเวช', 'งานเทคโนโลยีสารสนเทศและพัฒระบบสุขภาพดิจิทัล', 'งานเภสัชกรรมผู้ป่วยนอก', 'งานเภสัชกรรมผู้ป่วยใน', 'งานเวชระเบียนและข้อมูลทางการแพทย์', 'งานแผนงานและประเมินผล', 'งานแพทย์แผนไทย', 'งานโภชนศาสตร์', 'งานโสตทัศนศึกษา'];

type Row = string[];
type TabName = 'dashboard' | 'management';

function statusBadge(st: string): { bg: string; text: string } {
  const map: Record<string, { bg: string; text: string }> = {
    'รับเรื่อง': { bg: '#dbeafe', text: '#1d4ed8' },
    'ส่งเรื่อง': { bg: '#e0f2fe', text: '#0369a1' },
    'ปิดเรื่องได้': { bg: '#d1fae5', text: '#059669' },
    'ปิดเรื่องไม่ได้': { bg: '#fee2e2', text: '#dc2626' },
    'รอตอบกลับ': { bg: '#fef3c7', text: '#d97706' },
    'ทบทวนผู้บริหารรับทราบ': { bg: '#ede9fe', text: '#7c3aed' },
    'ทบทวนแล้ว': { bg: '#ede9fe', text: '#7c3aed' },
    'ผู้บริหารรับทราบ': { bg: '#ede9fe', text: '#7c3aed' },
  };
  return map[st] || { bg: '#f1f5f9', text: '#475569' };
}

function normStatus(s: string) {
  if (s === 'ทบทวนแล้ว' || s === 'ผู้บริหารรับทราบ') return 'ทบทวนผู้บริหารรับทราบ';
  return s || 'รอดำเนินการ';
}

function isInRange(dateStr: string, start: string, end: string) {
  const d = new Date(dateStr); d.setHours(0, 0, 0, 0);
  if (start) { const s = new Date(start); s.setHours(0, 0, 0, 0); if (d < s) return false; }
  if (end) { const e = new Date(end); e.setHours(0, 0, 0, 0); if (d > e) return false; }
  return true;
}

export default function AdminPage() {
  const [view, setView] = useState<'login' | 'panel'>('login');
  const [tab, setTab] = useState<TabName>('dashboard');
  const [loginErr, setLoginErr] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchErr, setFetchErr] = useState('');

  // Filters
  const [dashStart, setDashStart] = useState('');
  const [dashEnd, setDashEnd] = useState('');
  const [search, setSearch] = useState('');
  const [mgmtStart, setMgmtStart] = useState('');
  const [mgmtEnd, setMgmtEnd] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Edit modal
  const [editRow, setEditRow] = useState<Row | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editDept, setEditDept] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState('');

  // Detail modal
  const [detailRow, setDetailRow] = useState<Row | null>(null);

  // Charts
  const statusChartRef = useRef<HTMLCanvasElement>(null);
  const issueChartRef = useRef<HTMLCanvasElement>(null);
  const typeChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstances = useRef<Record<string, unknown>>({});

  const filteredDash = data.filter(r => isInRange(r[0], dashStart, dashEnd));
  const filteredMgmt = data.filter(r => {
    if (!isInRange(r[0], mgmtStart, mgmtEnd)) return false;
    if (search && !r.join(' ').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const totalPages = Math.ceil(filteredMgmt.length / rowsPerPage);
  const pageData = filteredMgmt.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const fetchData = useCallback(async () => {
    setLoading(true); setFetchErr('');
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getData`, { redirect: 'follow' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const rows: Row[] = Array.isArray(json) ? json : [];
      if (rows.length > 0) rows.shift(); // remove header
      rows.sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
      setData(rows.map(r => { r[0] = r[0]?.toString() || ''; return r; }));
    } catch (e) {
      setFetchErr('ไม่สามารถโหลดข้อมูลได้ กรุณาตรวจสอบว่าได้อัปเดต Apps Script แล้ว: ' + String(e));
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { if (view === 'panel') fetchData(); }, [view, fetchData]);

  useEffect(() => {
    if (tab !== 'dashboard' || filteredDash.length === 0) return;
    loadCharts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, filteredDash.length, dashStart, dashEnd]);

  function loadCharts() {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (!win.Chart) {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      s.onload = () => renderCharts();
      document.head.appendChild(s);
    } else { renderCharts(); }
  }

  function renderCharts() {
    const C = (window as never as Record<string, unknown>)['Chart'] as never;
    if (!C) return;
    const stCounts: Record<string, number> = {};
    const issCounts: Record<string, number> = {};
    const typeCounts: Record<string, number> = {};
    filteredDash.forEach(r => {
      const st = normStatus(r[8]);
      stCounts[st] = (stCounts[st] || 0) + 1;
      if (r[1]) issCounts[r[1]] = (issCounts[r[1]] || 0) + 1;
      if (r[2]) typeCounts[r[2]] = (typeCounts[r[2]] || 0) + 1;
    });
    buildChart('status', statusChartRef, 'doughnut', stCounts, ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#64748b','#06b6d4'], true);
    buildChart('issue', issueChartRef, 'bar', issCounts, '#38a382');
    buildChart('type', typeChartRef, 'bar', typeCounts, '#38a382', false, 'y');
  }

  function buildChart(id: string, ref: React.RefObject<HTMLCanvasElement | null>, type: string, counts: Record<string, number>, colors: string | string[], legend = false, axis = 'x') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const C = (window as any).Chart;
    if (!C || !ref.current) return;
    const inst = chartInstances.current[id] as { destroy?: () => void } | undefined;
    if (inst?.destroy) inst.destroy();
    chartInstances.current[id] = new C(ref.current, {
      type,
      data: { labels: Object.keys(counts), datasets: [{ data: Object.values(counts), backgroundColor: colors, borderRadius: type === 'bar' ? 4 : 0, borderWidth: legend ? 2 : 0, borderColor: '#fff', barPercentage: 0.5 }] },
      options: {
        indexAxis: axis, responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: legend, position: 'right', labels: { boxWidth: 10, font: { family: 'Sarabun', size: 11 } } }, tooltip: { backgroundColor: '#1e293b', titleFont: { family: 'Sarabun' }, bodyFont: { family: 'Sarabun' }, cornerRadius: 8 } },
        scales: !legend ? {
          y: { grid: { color: '#f1f5f9' }, border: { display: false }, ticks: { font: { family: 'Sarabun', size: 10 }, color: '#64748b' } },
          x: { grid: { display: false }, border: { display: false }, ticks: { font: { family: 'Sarabun', size: 10 }, color: '#64748b' } }
        } : { x: { display: false }, y: { display: false } }
      }
    });
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) { setView('panel'); setLoginErr(''); }
    else setLoginErr('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
  }

  async function saveEdit() {
    if (!editRow) return;
    setSaving('saving');
    const payload: Record<string, unknown> = { action: 'update', timestampISO: editRow[0], status: editStatus, department: editDept, notes: editNotes };
    if (editFile) {
      const b64 = await new Promise<string>((res, rej) => {
        const fr = new FileReader(); fr.onload = () => res((fr.result as string).split(',')[1]); fr.onerror = rej; fr.readAsDataURL(editFile!);
      });
      payload.fileInfo = { filename: editFile.name, mimeType: editFile.type, base64: b64 };
    }
    try {
      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      // optimistic update
      setData(prev => prev.map(r => r[0] === editRow[0] ? [...r.slice(0, 8), editStatus, editDept, editNotes, r[11]] : r));
      setEditRow(null); setSaving('ok');
      setTimeout(() => { setSaving(''); fetchData(); }, 1500);
    } catch { setSaving('err'); }
  }

  async function deleteRow(ts: string) {
    if (!confirm('ต้องการลบรายการนี้?')) return;
    try {
      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', timestampISO: ts }) });
      setData(prev => prev.filter(r => r[0] !== ts));
    } catch { alert('ลบไม่สำเร็จ'); }
  }

  // ─── Stat cards ───
  const stCounts: Record<string, number> = {};
  filteredDash.forEach(r => { const st = normStatus(r[8]); stCounts[st] = (stCounts[st] || 0) + 1; });

  const statColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // ─── LOGIN VIEW ───
  if (view === 'login') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Sarabun',sans-serif" }}>

        {/* Left Panel — Branding */}
        <div style={{ flex: 1, background: 'linear-gradient(160deg,#003d32 0%,#005C4B 50%,#38a382 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
          {/* BG Pattern */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0h10v60H25V0zm-25 25h60v10H0V25z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E\")" }} />
          <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,163,130,0.4),transparent 70%)' }} />
          <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,92,75,0.5),transparent 70%)' }} />

          <div style={{ position: 'relative', textAlign: 'center', maxWidth: 320 }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
              <img src="https://img1.pic.in.th/images/nhh.png" alt="NHH" style={{ width: 72, height: 72, objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }} />
            </div>
            <h1 style={{ color: 'white', fontWeight: 900, fontSize: '1.6rem', margin: '0 0 10px', letterSpacing: '-0.5px' }}>โรงพยาบาลหนองหาน</h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', margin: '0 0 32px' }}>จังหวัดอุดรธานี</p>
            <div style={{ width: 40, height: 3, background: 'linear-gradient(90deg,#fbbf24,#f59e0b)', borderRadius: 99, margin: '0 auto 32px' }} />

            {[['🏥', 'ระบบรับเรื่องร้องเรียนและเสนอแนะ', 'สำหรับการจัดการ และติดตามผล'],
              ['📊', 'Dashboard แบบ Real-time', 'สถิติและรายงานแบบ Visual'],
              ['🔔', 'แจ้งเตือนอัตโนมัติ', 'ผ่าน LINE และอีเมล'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16, textAlign: 'left', background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: '12px 16px', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.3 }}>{title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginTop: 3 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Login Form */}
        <div style={{ width: '100%', maxWidth: 480, background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', position: 'relative' }}>
          <div style={{ width: '100%', maxWidth: 360 }}>
            {/* Tag */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 99, padding: '5px 14px', marginBottom: 24 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-2.215-.601-4.288-1.643-6.065M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', letterSpacing: 1 }}>ADMIN ACCESS</span>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e293b', margin: '0 0 4px', letterSpacing: '-0.5px' }}>เข้าสู่ระบบ</h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 32px' }}>ระบบจัดการข้อร้องเรียน · โรงพยาบาลหนองหาน</p>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 16 }}>
                <label style={lbStyle}>ชื่อผู้ใช้งาน</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  </div>
                  <input value={username} onChange={e => setUsername(e.target.value)} style={{ ...inpStyle, paddingLeft: 38 }} placeholder="กรอกชื่อผู้ใช้งาน" autoComplete="username" />
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={lbStyle}>รหัสผ่าน</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                  </div>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ ...inpStyle, paddingLeft: 38 }} placeholder="••••••••" autoComplete="current-password" />
                </div>
              </div>

              {loginErr && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                  <span style={{ color: '#dc2626', fontSize: '0.82rem', fontWeight: 600 }}>{loginErr}</span>
                </div>
              )}

              <button type="submit" style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,#005C4B,#38a382)', color: 'white', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', fontFamily: "'Sarabun',sans-serif", boxShadow: '0 8px 24px rgba(0,92,75,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25" /></svg>
                เข้าสู่ระบบ
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 28, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
              <a href="/nhh-request/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#64748b', textDecoration: 'none', fontWeight: 600 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                กลับไปหน้าแจ้งเรื่อง
              </a>
            </div>
          </div>

          {/* Bottom branding */}
          <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
            <p style={{ fontSize: '0.68rem', color: '#cbd5e1', margin: 0 }}>พัฒนาโดย กลุ่มงานสุขภาพดิจิทัล (GUsmALL) · โรงพยาบาลหนองหาน</p>
          </div>
        </div>

        <style>{`
          * { box-sizing: border-box; }
          input:focus { outline:none !important; border-color:#38a382 !important; box-shadow:0 0 0 3px rgba(56,163,130,0.15) !important; }
          @media(max-width:700px) { .left-panel { display:none !important; } }
        `}</style>
      </div>
    );
  }


  // ─── ADMIN PANEL ───
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Sarabun',sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* Top Nav */}
      <header style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 }}>
            <img src="https://img1.pic.in.th/images/nhh.png" alt="NH" style={{ width: 36, height: 36, objectFit: 'contain', borderRadius: 8, border: '1px solid #e2e8f0' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#1e293b', lineHeight: 1.2 }}>NH HOSPITAL</span>
              <span style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: 700, letterSpacing: 2 }}>ADMIN PANEL</span>
            </div>
          </div>

          {/* Nav Pills — centered */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', borderRadius: 99, padding: 5, border: '1px solid #e2e8f0', pointerEvents: 'all' }}>
              {[['dashboard', '📊 Dashboard'], ['management', '📥 ข้อมูลรับแจ้ง']].map(([t, label]) => (
                <button key={t} onClick={() => setTab(t as TabName)} style={{ padding: '8px 20px', borderRadius: 99, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.82rem', fontFamily: "'Sarabun',sans-serif", background: tab === t ? '#005C4B' : 'transparent', color: tab === t ? 'white' : '#64748b', boxShadow: tab === t ? '0 2px 8px rgba(0,92,75,0.3)' : 'none', transition: 'all 0.2s' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#059669', fontWeight: 700, background: '#f0fdf4', padding: '4px 10px', borderRadius: 99, border: '1px solid #bbf7d0' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', display: 'inline-block' }} />Online
            </div>
            <button onClick={() => { setView('login'); setUsername(''); setPassword(''); setData([]); }} title="ออกจากระบบ" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 20px', width: '100%', flex: 1 }}>

        {/* ═══ DASHBOARD TAB ═══ */}
        {tab === 'dashboard' && (
          <div>
            <h2 style={pageTitleStyle}>ภาพรวมสถิติ (Dashboard)</h2>
            <p style={pageSubStyle}>ข้อมูลสรุปการรับเรื่องร้องเรียนและเสนอแนะ</p>

            {/* Filter bar */}
            <div style={filterBarStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>จาก</label>
                <input type="date" value={dashStart} onChange={e => setDashStart(e.target.value)} style={dateInpStyle} />
                <label style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>ถึง</label>
                <input type="date" value={dashEnd} onChange={e => setDashEnd(e.target.value)} style={dateInpStyle} />
                <button onClick={() => { setDashStart(''); setDashEnd(''); }} style={outBtnStyle}>รีเซ็ต</button>
                <button onClick={fetchData} disabled={loading} style={greenBtnStyle}>{loading ? 'กำลังโหลด...' : 'รีเฟรช'}</button>
              </div>
            </div>

            {fetchErr && <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 10, padding: '12px 16px', color: '#be123c', fontSize: '0.85rem', marginBottom: 16 }}>{fetchErr}</div>}

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))', gap: 14, marginBottom: 20 }}>
              <div style={statCardStyle}>
                <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>เรื่องทั้งหมด</span>
                <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#1e293b', lineHeight: 1.1 }}>{filteredDash.length}</span>
              </div>
              {Object.entries(stCounts).map(([st, cnt], i) => (
                <div key={st} style={statCardStyle}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, lineHeight: 1.3 }}>{st}</span>
                  <span style={{ fontSize: '2.4rem', fontWeight: 900, color: statColors[i % statColors.length], lineHeight: 1.1 }}>{cnt}</span>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
              {[
                { title: 'สัดส่วนสถานะ', ref: statusChartRef, color: '#3b82f6' },
                { title: 'สถิติตามประเด็นหลัก', ref: issueChartRef, color: '#10b981' },
                { title: 'สถิติตามประเภทบริการ', ref: typeChartRef, color: '#8b5cf6' },
              ].map(({ title, ref, color }) => (
                <div key={title} style={chartCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b' }}>{title}</span>
                  </div>
                  <div style={{ height: 220 }}>
                    <canvas ref={ref} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ MANAGEMENT TAB ═══ */}
        {tab === 'management' && (
          <div>
            <h2 style={pageTitleStyle}>รายการข้อมูลรับแจ้งทั้งหมด</h2>
            <p style={pageSubStyle}>ตารางแสดงรายละเอียดและการจัดการสถานะ</p>

            {fetchErr && <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 10, padding: '12px 16px', color: '#be123c', fontSize: '0.85rem', marginBottom: 16 }}>{fetchErr}</div>}

            {saving === 'ok' && <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 16px', color: '#059669', fontSize: '0.85rem', marginBottom: 16 }}>✅ บันทึกสำเร็จ</div>}

            <div style={{ background: 'white', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              {/* Toolbar */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                  <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                  <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="ค้นหาชื่อ, เรื่อง, รายละเอียด..." style={{ ...inpStyle, paddingLeft: 36, maxWidth: '100%' }} />
                </div>
                <input type="date" value={mgmtStart} onChange={e => { setMgmtStart(e.target.value); setPage(1); }} style={dateInpStyle} />
                <input type="date" value={mgmtEnd} onChange={e => { setMgmtEnd(e.target.value); setPage(1); }} style={dateInpStyle} />
                <button onClick={() => { setSearch(''); setMgmtStart(''); setMgmtEnd(''); setPage(1); }} style={outBtnStyle}>ล้าง</button>
                <button onClick={fetchData} disabled={loading} style={greenBtnStyle}>{loading ? '...' : 'รีเฟรช'}</button>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                  <thead>
                    <tr style={{ background: 'white', borderBottom: '1px solid #e2e8f0' }}>
                      {['วันเวลาแจ้ง', 'หัวข้อ / รายละเอียด', 'ผู้แจ้ง', 'สถานะ', 'จัดการ'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: h === 'สถานะ' || h === 'จัดการ' ? 'center' : 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>กำลังโหลด...</td></tr>}
                    {!loading && pageData.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#94a3b8', fontSize: '0.9rem' }}>ไม่มีข้อมูล</td></tr>}
                    {pageData.map((row, i) => {
                      const st = normStatus(row[8]);
                      const badge = statusBadge(st);
                      const d = new Date(row[0]);
                      const dt = isNaN(d.getTime()) ? row[0] : d.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: '2-digit' });
                      const tm = isNaN(d.getTime()) ? '' : d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
                      return (
                        <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                          <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#334155' }}>{dt}</div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{tm} น.</div>
                          </td>
                          <td style={{ padding: '12px 16px', maxWidth: 320 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={row[1]}>{row[1]}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row[2]} · {row[3]}</div>
                          </td>
                          <td style={{ padding: '12px 16px', whiteSpace: 'nowrap', fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>{row[4]}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <span style={{ background: badge.bg, color: badge.text, padding: '4px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{st}</span>
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                              <button onClick={() => setDetailRow(row)} title="ดูรายละเอียด" style={iconBtnStyle('#3b82f6')}>👁</button>
                              <button onClick={() => { setEditRow(row); setEditStatus(normStatus(row[8])); setEditDept(row[9] || ''); setEditNotes(row[10] || ''); setEditFile(null); }} title="แก้ไข" style={iconBtnStyle('#f59e0b')}>✏️</button>
                              <button onClick={() => deleteRow(row[0])} title="ลบ" style={iconBtnStyle('#ef4444')}>🗑</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#64748b' }}>
                  แสดง
                  <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setPage(1); }} style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '3px 8px', fontSize: '0.8rem' }}>
                    {[5, 10, 25, 50].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  รายการ · ทั้งหมด {filteredMgmt.length} รายการ
                </div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} style={pgBtnStyle(page <= 1)}>‹</button>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', padding: '0 8px' }}>หน้า {page} / {totalPages || 1}</span>
                  <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} style={pgBtnStyle(page >= totalPages)}>›</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══ EDIT MODAL ═══ */}
      {editRow && (
        <div style={modalOverlayStyle} onClick={() => setEditRow(null)}>
          <div style={modalBoxStyle} onClick={e => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <span style={{ fontWeight: 800, color: '#1e293b' }}>✏️ อัปเดตสถานะ</span>
              <button onClick={() => setEditRow(null)} style={closeStyle}>✕</button>
            </div>
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={lbStyle}>สถานะ <span style={{ color: '#ef4444' }}>*</span></label>
                <select value={editStatus} onChange={e => setEditStatus(e.target.value)} style={inpStyle}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={lbStyle}>หน่วยงานที่รับผิดชอบ</label>
                <select value={editDept} onChange={e => setEditDept(e.target.value)} style={inpStyle}>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d || '-- เลือกหน่วยงาน --'}</option>)}
                </select>
              </div>
              <div>
                <label style={lbStyle}>ผลการดำเนินการ / หมายเหตุ</label>
                <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={3} style={{ ...inpStyle, resize: 'vertical' }} placeholder="ระบุความคืบหน้า..." />
              </div>
              <div>
                <label style={lbStyle}>แนบเอกสาร <span style={{ color: '#94a3b8', fontWeight: 400 }}>(ถ้ามี)</span></label>
                <label htmlFor="editFile" style={fileZoneS}>
                  <span style={{ fontSize: '0.82rem', color: editFile ? '#005C4B' : '#94a3b8', fontWeight: editFile ? 600 : 400, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{editFile ? editFile.name : 'เลือกไฟล์...'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                </label>
                <input id="editFile" ref={editFileRef} type="file" accept="image/*,.pdf,.doc,.docx" onChange={e => setEditFile(e.target.files?.[0] || null)} style={{ display: 'none' }} />
              </div>
            </div>
            <div style={{ padding: '14px 24px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setEditRow(null)} style={outBtnStyle}>ยกเลิก</button>
              <button onClick={saveEdit} disabled={saving === 'saving'} style={greenBtnStyle}>{saving === 'saving' ? 'กำลังบันทึก...' : 'บันทึก'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DETAIL MODAL ═══ */}
      {detailRow && (
        <div style={modalOverlayStyle} onClick={() => setDetailRow(null)}>
          <div style={{ ...modalBoxStyle, maxWidth: 640 }} onClick={e => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <span style={{ fontWeight: 800, color: '#1e293b' }}>📄 รายละเอียดข้อมูล</span>
              <button onClick={() => setDetailRow(null)} style={closeStyle}>✕</button>
            </div>
            <div style={{ padding: '20px 24px', maxHeight: '70vh', overflowY: 'auto' }}>
              {(() => {
                const r = detailRow;
                const st = normStatus(r[8]);
                const badge = statusBadge(st);
                const d = new Date(r[0]);
                const dt = isNaN(d.getTime()) ? r[0] : d.toLocaleString('th-TH', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                return (
                  <>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                        <span style={{ background: badge.bg, color: badge.text, padding: '3px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700 }}>{st}</span>
                        <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700 }}>{r[2]}</span>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>{r[1]}</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '16px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: 16 }}>
                      {[['ผู้แจ้ง', r[4]], ['วันเวลา', dt + ' น.'], ['เบอร์ติดต่อ', r[5] || '-'], ['Line / Email', [r[6] ? 'Line: ' + r[6] : '', r[7]].filter(Boolean).join(', ') || '-']].map(([k, v]) => (
                        <div key={k}>
                          <p style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 3px' }}>{k}</p>
                          <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>{v}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <p style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>รายละเอียด</p>
                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 16px', fontSize: '0.88rem', color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{r[3]}</div>
                    </div>
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '14px 16px' }}>
                      <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px' }}>ส่วนของเจ้าหน้าที่</p>
                      <div style={{ display: 'grid', gap: 8 }}>
                        <div><span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>หน่วยงาน: </span><span style={{ fontWeight: 700, color: '#1e293b' }}>{r[9] || '-'}</span></div>
                        <div><span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>หมายเหตุ: </span><span style={{ color: '#334155' }}>{r[10] || '-'}</span></div>
                        {r[11] && <a href={r[11]} target="_blank" rel="noreferrer" style={{ color: '#005C4B', fontWeight: 600, fontSize: '0.85rem' }}>📎 เปิดเอกสารแนบ</a>}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid #f1f5f9', textAlign: 'right' }}>
              <button onClick={() => setDetailRow(null)} style={outBtnStyle}>ปิด</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #005C4B !important; box-shadow: 0 0 0 3px rgba(0,92,75,0.1); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─── Styles ───
const lbStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 5 };
const inpStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: '0.88rem', background: '#f8fafc', color: '#1e293b', fontFamily: "'Sarabun',sans-serif", transition: 'border-color 0.2s', outline: 'none' };
const dateInpStyle: React.CSSProperties = { padding: '7px 10px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.82rem', background: 'white', color: '#334155', cursor: 'pointer' };
const outBtnStyle: React.CSSProperties = { padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: 8, background: 'white', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: '#475569', fontFamily: "'Sarabun',sans-serif" };
const greenBtnStyle: React.CSSProperties = { padding: '8px 18px', border: 'none', borderRadius: 8, background: '#005C4B', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 700, color: 'white', fontFamily: "'Sarabun',sans-serif" };
const pageTitleStyle: React.CSSProperties = { fontSize: '1.6rem', fontWeight: 900, color: '#1e293b', margin: '0 0 4px', letterSpacing: '-0.5px' };
const pageSubStyle: React.CSSProperties = { fontSize: '0.85rem', color: '#64748b', margin: '0 0 20px', fontWeight: 500 };
const filterBarStyle: React.CSSProperties = { background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: '14px 18px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' };
const statCardStyle: React.CSSProperties = { background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' };
const chartCardStyle: React.CSSProperties = { background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' };
const iconBtnStyle = (c: string): React.CSSProperties => ({ width: 30, height: 30, borderRadius: 7, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', transition: 'all 0.15s', color: c });
const pgBtnStyle = (dis: boolean): React.CSSProperties => ({ width: 30, height: 30, borderRadius: 7, border: '1px solid #e2e8f0', background: dis ? '#f8fafc' : 'white', cursor: dis ? 'not-allowed' : 'pointer', fontSize: '1rem', opacity: dis ? 0.4 : 1 });
const modalOverlayStyle: React.CSSProperties = { position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 };
const modalBoxStyle: React.CSSProperties = { background: 'white', borderRadius: 20, width: '100%', maxWidth: 480, boxShadow: '0 24px 60px rgba(0,0,0,0.2)', border: '1px solid #e2e8f0', overflow: 'hidden' };
const modalHeaderStyle: React.CSSProperties = { padding: '16px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' };
const closeStyle: React.CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#94a3b8' };
const fileZoneS: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1.5px dashed #cbd5e1', borderRadius: 8, background: '#f8fafc', cursor: 'pointer' };
