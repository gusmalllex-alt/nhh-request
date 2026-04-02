'use client';

import { useState, useRef } from 'react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwvB3QPrLHImxbVW4NXKXxd3bFDjQizm1HEDnRZX6D5fz402LiQZJWAL0iU-5-emdav/exec';

const TYPE_OPTIONS = ['พฤติกรรมบริการ', 'ระบบบริการ', 'อาคาร/สถานที่', 'สิ่งแวดล้อม', 'อื่นๆ'];

const COMPLAINT_TYPES = [
  {
    key: 'ข้อร้องเรียน (Complaint)',
    label: 'ข้อร้องเรียน',
    sub: 'Complaint',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    color: '#ef4444', bg: '#fff1f2', border: '#fecdd3',
  },
  {
    key: 'ข้อเสนอแนะ (Suggestion)',
    label: 'ข้อเสนอแนะ',
    sub: 'Suggestion',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
  },
  {
    key: 'ข้อชื่นชม (Compliment)',
    label: 'ข้อชื่นชม',
    sub: 'Compliment',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    color: '#d97706', bg: '#fffbeb', border: '#fde68a',
  },
  {
    key: 'อื่นๆ',
    label: 'อื่นๆ',
    sub: 'Other',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe',
  },
];

type FormData = { papade: string; type: string; detail: string; name: string; tel: string; line: string; email: string; };
type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [selected, setSelected] = useState('');
  const [form, setForm] = useState<FormData>({ papade: '', type: '', detail: '', name: '', tel: '', line: '', email: '' });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const selectType = (key: string) => {
    setSelected(key);
    setForm(f => ({ ...f, papade: key }));
    if (errors.papade) setErrors(e => ({ ...e, papade: undefined }));
  };

  const set = (k: keyof FormData, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.papade) e.papade = 'กรุณาเลือกประเด็นหลัก';
    if (!form.type) e.type = 'กรุณาเลือกประเภทบริการ';
    if (!form.detail.trim()) e.detail = 'กรุณาระบุรายละเอียด';
    if (!form.name.trim()) e.name = 'กรุณาระบุชื่อ-นามสกุล';
    if (!form.email.trim()) e.email = 'กรุณาระบุอีเมล';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const payload: Record<string, unknown> = { ...form };
      if (file) {
        const b64 = await new Promise<string>((res, rej) => {
          const fr = new FileReader(); fr.onload = () => res((fr.result as string).split(',')[1]); fr.onerror = rej; fr.readAsDataURL(file!);
        });
        payload.fileInfo = { filename: file.name, mimeType: file.type, base64: b64 };
      }
      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setStatus('success');
    } catch { setStatus('error'); }
  };

  // SUCCESS
  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#003d32 0%,#005C4B 50%,#1a7a5e 100%)', padding: 20, fontFamily: "'Sarabun',sans-serif" }}>
        <div style={{ background: 'white', borderRadius: 28, padding: '52px 44px', textAlign: 'center', maxWidth: 460, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.25)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg,#005C4B,#38a382,#005C4B)' }} />
          <div style={{ width: 88, height: 88, background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(16,185,129,0.3)' }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 99, padding: '4px 14px', marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', letterSpacing: 1 }}>ส่งสำเร็จแล้ว</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1a202c', margin: '0 0 12px', letterSpacing: '-0.5px' }}>ขอบคุณสำหรับข้อมูล</h2>
          <p style={{ color: '#64748b', lineHeight: 1.8, margin: '0 0 8px', fontSize: '0.95rem' }}>ทีมงานได้รับเรื่องของท่านแล้ว</p>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 32px' }}>จะดำเนินการและแจ้งผลให้ท่านทราบทางอีเมลโดยเร็วที่สุด</p>
          <button onClick={() => { setStatus('idle'); setSelected(''); setForm({ papade: '', type: '', detail: '', name: '', tel: '', line: '', email: '' }); setFile(null); }}
            style={{ background: 'linear-gradient(135deg,#005C4B,#38a382)', color: 'white', border: 'none', borderRadius: 14, padding: '14px 36px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Sarabun',sans-serif", boxShadow: '0 8px 24px rgba(0,92,75,0.35)', transition: 'all 0.2s' }}>
            ส่งเรื่องใหม่
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f4', fontFamily: "'Sarabun',sans-serif" }}>

      {/* ═══ HERO ═══ */}
      <div style={{ background: 'linear-gradient(160deg,#003d32 0%,#005C4B 45%,#0d7a5f 75%,#38a382 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* ลาย cross pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0h10v60H25V0zm-25 25h60v10H0V25z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E\")" }} />
        {/* Glow circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,163,130,0.4),transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -40, left: -40, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,92,75,0.5),transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, paddingBottom: 100, paddingTop: 48, textAlign: 'center', padding: '48px 20px 100px' }}>
          {/* Logo */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 20 }}>
            <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.2)', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
              <img src="https://img1.pic.in.th/images/nhh.png" alt="โรงพยาบาลหนองหาน" style={{ width: 80, height: 80, objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 4, right: 4, width: 22, height: 22, background: '#10b981', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </div>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 99, padding: '5px 16px', marginBottom: 16, backdropFilter: 'blur(8px)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6ee7b7', display: 'inline-block' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a7f3d0', letterSpacing: 2, textTransform: 'uppercase' }}>ศูนย์รับเรื่อง</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.7rem,4.5vw,3rem)', fontWeight: 900, color: 'white', margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.5px', textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
            ร้องเรียนและเสนอแนะ
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', margin: '0 0 4px', fontWeight: 500 }}>โรงพยาบาลหนองหาน จังหวัดอุดรธานี</p>
          <div style={{ width: 40, height: 3, background: 'linear-gradient(90deg,#fbbf24,#f59e0b)', borderRadius: 99, margin: '16px auto 0' }} />

          {/* Stats */}
          <div style={{ display: 'inline-flex', gap: 0, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.15)', marginTop: 28, overflow: 'hidden' }}>
            {[['🕐', '< 24 ชม.', 'ตอบสนอง'], ['🔒', '100%', 'ปลอดภัย'], ['👤', 'ไม่ระบุตัวตน', 'ได้']].map(([icon, val, desc], i) => (
              <div key={i} style={{ padding: '14px 20px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: '1rem', marginBottom: 2 }}>{icon}</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>{val}</div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 56 }}>
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="#f1f5f4" />
          </svg>
        </div>
      </div>

      {/* ═══ FORM CONTAINER ═══ */}
      <div style={{ maxWidth: 780, margin: '-48px auto 0', padding: '0 16px 60px', position: 'relative', zIndex: 10 }}>

        {/* Type Selector */}
        <div style={{ background: 'white', borderRadius: 22, boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', padding: '24px', marginBottom: 16, overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,#005C4B,#38a382)' }} />
          <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38a382" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
            เลือกประเภทที่ต้องการแจ้ง
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {COMPLAINT_TYPES.map(ct => (
              <button key={ct.key} type="button" onClick={() => selectType(ct.key)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, border: `2px solid ${selected === ct.key ? ct.color : '#e2e8f0'}`, background: selected === ct.key ? ct.bg : 'white', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
                {selected === ct.key && <div style={{ position: 'absolute', inset: 0, background: ct.bg, opacity: 0.5 }} />}
                <div style={{ width: 46, height: 46, borderRadius: 12, background: selected === ct.key ? ct.color : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s', color: selected === ct.key ? 'white' : ct.color, boxShadow: selected === ct.key ? `0 4px 14px ${ct.color}40` : 'none' }}>
                  {ct.icon}
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: selected === ct.key ? ct.color : '#1e293b', lineHeight: 1.2 }}>{ct.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 2 }}>{ct.sub}</div>
                </div>
                {selected === ct.key && (
                  <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, background: ct.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                )}
              </button>
            ))}
          </div>
          {errors.papade && <p style={{ color: '#ef4444', fontSize: '0.78rem', margin: '10px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>⚠️ {errors.papade}</p>}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ background: 'white', borderRadius: 22, boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: 16 }}>

            {/* Header */}
            <div style={{ padding: '18px 24px', background: 'linear-gradient(135deg,#f8fffe,#f0fdf4)', borderBottom: '1px solid #d1fae5', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#005C4B,#38a382)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,92,75,0.3)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#003d32', fontSize: '0.95rem' }}>แบบฟอร์มบันทึกข้อมูล</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 1 }}>กรอกข้อมูลตามความเป็นจริงเพื่อความรวดเร็วในการตรวจสอบ</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.7rem', fontWeight: 700, color: '#059669', background: '#f0fdf4', padding: '5px 12px', borderRadius: 99, border: '1px solid #bbf7d0' }}>
                🔒 ปลอดภัย
              </div>
            </div>

            <div style={{ padding: '24px' }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#005C4B,#38a382)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.82rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,92,75,0.3)' }}>1</div>
                  <div style={{ width: 2, flex: 1, background: 'linear-gradient(#38a382,#e2e8f0)', marginTop: 6, minHeight: 40, borderRadius: 2 }} />
                </div>
                <div style={{ flex: 1, paddingBottom: 24 }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '4px 0 16px' }}>รายละเอียดเรื่องที่ต้องการแจ้ง</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={lb}>ประเภทบริการ <span style={{ color: '#ef4444' }}>*</span></label>
                      <select value={form.type} onChange={e => set('type', e.target.value)} style={{ ...inp, ...(errors.type ? errB : {}) }}>
                        <option value="">-- เลือกประเภทบริการ --</option>
                        {TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      {errors.type && <Err msg={errors.type} />}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#f8fffe', borderRadius: 10, padding: '10px 14px', border: '1px solid #d1fae5' }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>ประเด็นที่เลือก</div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: selected ? '#005C4B' : '#94a3b8', marginTop: 2 }}>{selected || '— ยังไม่ได้เลือก —'}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={lb}>รายละเอียดเหตุการณ์ <span style={{ color: '#ef4444' }}>*</span></label>
                    <textarea value={form.detail} onChange={e => set('detail', e.target.value)} placeholder="ระบุ วัน เวลา สถานที่ และรายละเอียดที่เกิดขึ้นอย่างชัดเจน..." rows={4} style={{ ...inp, resize: 'vertical', ...(errors.detail ? errB : {}) }} />
                    {errors.detail && <Err msg={errors.detail} />}
                  </div>
                  {/* File Upload */}
                  <div>
                    <label style={lb}>แนบเอกสาร/รูปภาพ <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.72rem' }}>(ถ้ามี, ไม่เกิน 5MB)</span></label>
                    <label htmlFor="pubFile" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: `2px dashed ${file ? '#38a382' : '#cbd5e1'}`, borderRadius: 10, background: file ? '#f0fdf4' : '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: file ? '#d1fae5' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={file ? '#059669' : '#94a3b8'} strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: file ? '#059669' : '#94a3b8', fontWeight: file ? 600 : 400, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {file ? file.name : 'คลิกหรือลากไฟล์มาวางที่นี่'}
                      </span>
                    </label>
                    <input id="pubFile" ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f && f.size > 5 * 1024 * 1024) { alert('ไฟล์ใหญ่เกิน 5MB'); return; } setFile(f || null); }} />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.82rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(245,158,11,0.35)' }}>2</div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '4px 0 16px' }}>
                    ข้อมูลผู้แจ้ง <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#94a3b8' }}>เพื่อแจ้งผลการดำเนินการ</span>
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[['name', 'ชื่อ-นามสกุล', 'text', 'ระบุชื่อ และ นามสกุลจริง', true],
                      ['tel', 'เบอร์โทรศัพท์', 'tel', '08XXXXXXXX', false],
                      ['line', 'Line ID', 'text', 'ระบุ Line ID', false],
                      ['email', 'อีเมล', 'email', 'example@email.com', true],
                    ].map(([k, lbl, type, ph, req]) => (
                      <div key={k as string}>
                        <label style={lb}>{lbl as string} {req && <span style={{ color: '#ef4444' }}>*</span>}{!req && <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.7rem' }}> (ถ้ามี)</span>}</label>
                        <input type={type as string} value={form[k as keyof FormData]} onChange={e => set(k as keyof FormData, e.target.value)} placeholder={ph as string} style={{ ...inp, ...(errors[k as keyof FormData] ? errB : {}) }} />
                        {errors[k as keyof FormData] && <Err msg={errors[k as keyof FormData]!} />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning + Submit */}
          <div style={{ background: 'white', borderRadius: 22, boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.7, maxWidth: 380 }}>
              <strong style={{ color: '#dc2626' }}>⚠️ คำเตือน:</strong> การส่งข้อมูลอันเป็นเท็จหรือมีเจตนากลั่นแกล้งผู้อื่น<br />อาจมีความผิดตาม พ.ร.บ. คอมพิวเตอร์ พ.ศ. 2560
            </div>
            <button type="submit" disabled={status === 'loading'}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 32px', background: status === 'loading' ? '#94a3b8' : 'linear-gradient(135deg,#005C4B,#38a382)', color: 'white', border: 'none', borderRadius: 14, fontSize: '0.95rem', fontWeight: 800, cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontFamily: "'Sarabun',sans-serif", boxShadow: status === 'loading' ? 'none' : '0 8px 24px rgba(0,92,75,0.35)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {status === 'loading' ? (
                <><span style={{ width: 18, height: 18, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />กำลังส่ง...</>
              ) : (
                <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>บันทึกข้อมูล</>
              )}
            </button>
          </div>

          {status === 'error' && <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 12, padding: '12px 16px', color: '#dc2626', fontSize: '0.85rem', marginTop: 12 }}>⚠️ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</div>}
        </form>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
            {[['📞', '042-391030', 'tel:042-391030'], ['📍', 'ต.หนองหาน อ.หนองหาน จ.อุดรธานี', '']].map(([icon, val, href]) => (
              <a key={val} href={href || undefined} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #e2e8f0', borderRadius: 12, padding: '10px 16px', textDecoration: 'none', color: '#334155', fontSize: '0.82rem', fontWeight: 500 }}>
                <span>{icon}</span><span>{val}</span>
              </a>
            ))}
          </div>
          <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
            © {new Date().getFullYear()} โรงพยาบาลหนองหาน · พัฒนาโดย กลุ่มงานสุขภาพดิจิทัล (GUsmALL)
          </p>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        input:focus, select:focus, textarea:focus { outline:none !important; border-color:#38a382 !important; box-shadow:0 0 0 3px rgba(56,163,130,0.15) !important; }
        button:not(:disabled):hover { filter: brightness(1.05); }
        @media(max-width:560px) {
          .type-grid { grid-template-columns:1fr !important; }
          .form-row { grid-template-columns:1fr !important; }
        }
      `}</style>
    </div>
  );
}

const lb: React.CSSProperties = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: 5 };
const inp: React.CSSProperties = { width: '100%', padding: '10px 13px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.88rem', background: '#f8fafc', color: '#1e293b', fontFamily: "'Sarabun',sans-serif", transition: 'all 0.2s', outline: 'none' };
const errB: React.CSSProperties = { borderColor: '#fca5a5', background: '#fff5f5' };
const Err = ({ msg }: { msg: string }) => <p style={{ color: '#ef4444', fontSize: '0.72rem', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 3 }}>⚠️ {msg}</p>;
