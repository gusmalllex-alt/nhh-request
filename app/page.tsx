'use client';

import { useState, useRef } from 'react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwvB3QPrLHImxbVW4NXKXxd3bFDjQizm1HEDnRZX6D5fz402LiQZJWAL0iU-5-emdav/exec';

const TYPE_CARDS = [
  { key: 'พฤติกรรมบริการ', emoji: '🧑‍⚕️', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc' },
  { key: 'ระบบบริการ', emoji: '⚙️', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  { key: 'อาคาร/สถานที่', emoji: '🏢', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  { key: 'สิ่งแวดล้อม', emoji: '🌿', color: '#059669', bg: '#f0fdf4', border: '#bbf7d0' },
  { key: 'อื่นๆ', emoji: '💬', color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' },
];

const COMPLAINT_TYPES = [
  { key: 'ข้อร้องเรียน (Complaint)', label: 'ข้อร้องเรียน', sub: 'Complaint', emoji: '⚠️', color: '#dc2626', bg: '#fff1f2', border: '#fecdd3', activeBg: '#fef2f2' },
  { key: 'ข้อเสนอแนะ (Suggestion)', label: 'ข้อเสนอแนะ', sub: 'Suggestion', emoji: '💡', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', activeBg: '#eff6ff' },
  { key: 'ข้อชื่นชม (Compliment)', label: 'ข้อชื่นชม', sub: 'Compliment', emoji: '⭐', color: '#d97706', bg: '#fffbeb', border: '#fde68a', activeBg: '#fffbeb' },
  { key: 'อื่นๆ', label: 'อื่นๆ', sub: 'Other', emoji: '💬', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', activeBg: '#f5f3ff' },
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

  const selectType = (key: string) => { setSelected(key); setForm(f => ({ ...f, papade: key })); if (errors.papade) setErrors(e => ({ ...e, papade: undefined })); };
  const set = (k: keyof FormData, v: string) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: undefined })); };

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
        const b64 = await new Promise<string>((res, rej) => { const fr = new FileReader(); fr.onload = () => res((fr.result as string).split(',')[1]); fr.onerror = rej; fr.readAsDataURL(file!); });
        payload.fileInfo = { filename: file.name, mimeType: file.type, base64: b64 };
      }
      await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setStatus('success');
    } catch { setStatus('error'); }
  };

  const selectedType = COMPLAINT_TYPES.find(c => c.key === selected);

  // ─── SUCCESS ───
  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#003d32,#005C4B,#1a7a5e)', padding: 20, fontFamily: "'Sarabun',sans-serif" }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', textAlign: 'center', maxWidth: 420, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}>
          <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#d1fae5,#6ee7b7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(16,185,129,0.35)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1a202c', margin: '0 0 10px' }}>ส่งเรื่องสำเร็จแล้ว!</h2>
          <p style={{ color: '#64748b', lineHeight: 1.8, margin: '0 0 28px', fontSize: '0.9rem' }}>ทีมงานได้รับเรื่องของท่านแล้ว<br />จะแจ้งผลทางอีเมลโดยเร็วที่สุด</p>
          <button onClick={() => { setStatus('idle'); setSelected(''); setForm({ papade: '', type: '', detail: '', name: '', tel: '', line: '', email: '' }); setFile(null); }}
            style={btnGreen}>ส่งเรื่องใหม่</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f3', fontFamily: "'Sarabun',sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* ─── HERO ─── */}
      <div style={{ background: 'linear-gradient(155deg,#002d24 0%,#004d3d 40%,#005C4B 70%,#2d8a70 100%)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,163,130,0.35),transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -30, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,77,61,0.6),transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', padding: '40px 20px 80px', textAlign: 'center' }}>
          {/* Logo */}
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', backdropFilter: 'blur(8px)', boxShadow: '0 16px 48px rgba(0,0,0,0.3)' }}>
            <img src="https://img1.pic.in.th/images/nhh.png" alt="โรงพยาบาลหนองหาน" style={{ width: 68, height: 68, objectFit: 'contain' }} />
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 99, padding: '4px 14px', marginBottom: 14, backdropFilter: 'blur(6px)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#6ee7b7', display: 'inline-block' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a7f3d0', letterSpacing: 2 }}>ศูนย์รับเรื่องร้องเรียน</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 900, color: 'white', margin: '0 0 8px', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
            ร้องเรียนและเสนอแนะ
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', margin: '0 0 28px', fontWeight: 500 }}>
            โรงพยาบาลหนองหาน จังหวัดอุดรธานี
          </p>

          {/* Stats strip */}
          <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            {[['⏱', '< 24 ชม.', 'เวลาตอบสนอง'], ['🔒', 'ปลอดภัย', '100%'], ['👤', 'ไม่ระบุตัวตน', 'ได้']].map(([icon, val, desc], i) => (
              <div key={i} style={{ padding: '12px 18px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', marginBottom: 1 }}>{icon}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>{val}</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50 }}>
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill="#f0f4f3" />
          </svg>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{ flex: 1, maxWidth: 640, width: '100%', margin: '-36px auto 0', padding: '0 16px 0', position: 'relative', zIndex: 10 }}>

        {/* Type Selector Card */}
        <div style={card}>
          <div style={sectionTag}>📌 เลือกประเด็นที่ต้องการแจ้ง</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {COMPLAINT_TYPES.map(ct => (
              <button key={ct.key} type="button" onClick={() => selectType(ct.key)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `2px solid ${selected === ct.key ? ct.color : '#e5e7eb'}`, background: selected === ct.key ? ct.activeBg : 'white', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontFamily: "'Sarabun',sans-serif" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: selected === ct.key ? ct.color : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.1rem', transition: 'all 0.2s', boxShadow: selected === ct.key ? `0 4px 12px ${ct.color}50` : 'none' }}>
                  {ct.emoji}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: selected === ct.key ? ct.color : '#374151', lineHeight: 1.2 }}>{ct.label}</div>
                  <div style={{ fontSize: '0.68rem', color: '#9ca3af', marginTop: 2 }}>{ct.sub}</div>
                </div>
                {selected === ct.key && <div style={{ marginLeft: 'auto', width: 16, height: 16, background: ct.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>}
              </button>
            ))}
          </div>
          {errors.papade && <ErrMsg msg={errors.papade} />}
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={card}>
            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#005C4B,#38a382)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.95rem' }}>รายละเอียดเรื่องที่แจ้ง</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2 }}>กรอกข้อมูลให้ครบถ้วนและถูกต้อง</div>
              </div>
              {selectedType && (
                <div style={{ background: selectedType.bg, border: `1px solid ${selectedType.border}`, color: selectedType.color, borderRadius: 8, padding: '4px 10px', fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  {selectedType.emoji} {selectedType.label}
                </div>
              )}
            </div>

            {/* Step 1 */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
              <StepDot n={1} active />
              <div style={{ flex: 1 }}>
                <div style={stepLabel}>รายละเอียดเหตุการณ์</div>
                <div style={{ marginBottom: 14 }}>
                  <label style={lb}>ประเภทบริการที่เกี่ยวข้อง <Req /></label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))', gap: 8 }}>
                    {TYPE_CARDS.map(tc => (
                      <button key={tc.key} type="button" onClick={() => { set('type', tc.key); }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', borderRadius: 12, border: `2px solid ${form.type === tc.key ? tc.color : '#e5e7eb'}`, background: form.type === tc.key ? tc.bg : 'white', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Sarabun',sans-serif", position: 'relative' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: form.type === tc.key ? tc.color : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'all 0.2s', boxShadow: form.type === tc.key ? `0 4px 10px ${tc.color}50` : 'none' }}>
                          {tc.emoji}
                        </div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: form.type === tc.key ? tc.color : '#6b7280', textAlign: 'center', lineHeight: 1.3 }}>{tc.key}</span>
                        {form.type === tc.key && <div style={{ position: 'absolute', top: 6, right: 6, width: 14, height: 14, background: tc.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                        </div>}
                      </button>
                    ))}
                  </div>
                  {errors.type && <ErrMsg msg={errors.type} />}
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label style={lb}>รายละเอียดเหตุการณ์ <Req /></label>
                  <textarea value={form.detail} onChange={e => set('detail', e.target.value)} placeholder="ระบุวัน เวลา สถานที่ และรายละเอียดที่เกิดขึ้น..." rows={4} style={{ ...inp, resize: 'vertical', ...(errors.detail ? errBorder : {}) }} />
                  {errors.detail && <ErrMsg msg={errors.detail} />}
                </div>
                {/* File Upload */}
                <div>
                  <label style={lb}>แนบเอกสาร/ภาพ <span style={{ color: '#9ca3af', fontWeight: 400, fontSize: '0.7rem' }}>(ไม่บังคับ · ไม่เกิน 5MB)</span></label>
                  <label htmlFor="pubFile" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: `2px dashed ${file ? '#38a382' : '#d1d5db'}`, borderRadius: 10, background: file ? '#f0fdf4' : '#fafafa', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: file ? '#d1fae5' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={file ? '#059669' : '#9ca3af'} strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: file ? '#059669' : '#9ca3af', fontWeight: file ? 600 : 400 }}>{file ? file.name : 'คลิกเพื่อแนบไฟล์...'}</span>
                    {file && <button type="button" onClick={e => { e.preventDefault(); setFile(null); if (fileRef.current) fileRef.current.value = ''; }} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.8rem' }}>✕ ลบ</button>}
                  </label>
                  <input id="pubFile" ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f && f.size > 5 * 1024 * 1024) { alert('ไฟล์ใหญ่เกิน 5MB'); return; } setFile(f || null); }} />
                </div>
              </div>
            </div>

            <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#e5e7eb,transparent)', margin: '12px 0 16px' }} />

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: 12 }}>
              <StepDot n={2} />
              <div style={{ flex: 1 }}>
                <div style={stepLabel}>ข้อมูลผู้แจ้ง <span style={{ fontSize: '0.72rem', fontWeight: 400, color: '#9ca3af' }}>เพื่อแจ้งผลการดำเนินการ</span></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {([
                    ['name', 'ชื่อ-นามสกุล', 'text', 'ชื่อ นามสกุลจริง', true],
                    ['tel', 'เบอร์โทรศัพท์', 'tel', '08XXXXXXXX', false],
                    ['line', 'Line ID', 'text', 'Line ID ของท่าน', false],
                    ['email', 'อีเมล', 'email', 'example@email.com', true],
                  ] as [keyof FormData, string, string, string, boolean][]).map(([k, lbl, t, ph, req]) => (
                    <div key={k}>
                      <label style={lb}>{lbl} {req ? <Req /> : <span style={{ color: '#9ca3af', fontSize: '0.7rem', fontWeight: 400 }}>(ถ้ามี)</span>}</label>
                      <input type={t} value={form[k]} onChange={e => set(k, e.target.value)} placeholder={ph} style={{ ...inp, ...(errors[k] ? errBorder : {}) }} />
                      {errors[k] && <ErrMsg msg={errors[k]!} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Warning + Submit */}
          <div style={{ ...card, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '16px 20px' }}>
            <div style={{ fontSize: '0.76rem', color: '#64748b', lineHeight: 1.7, flex: 1, minWidth: 200 }}>
              <strong style={{ color: '#dc2626' }}>⚠️</strong> การส่งข้อมูลเท็จหรือกลั่นแกล้งผู้อื่น อาจมีความผิดตาม พ.ร.บ.คอมพิวเตอร์ พ.ศ. 2560
            </div>
            <button type="submit" disabled={status === 'loading'} style={{ ...btnGreen, display: 'flex', alignItems: 'center', gap: 8, opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}>
              {status === 'loading'
                ? <><span style={spinner} />กำลังส่ง...</>
                : <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>บันทึกและส่งเรื่อง</>}
            </button>
          </div>

          {status === 'error' && (
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 12, padding: '12px 16px', color: '#dc2626', fontSize: '0.85rem', marginBottom: 12 }}>
              ⚠️ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
            </div>
          )}
        </form>
      </div>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: 'linear-gradient(135deg,#003d32,#005C4B)', marginTop: 48, padding: '28px 20px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10 }}>
            <img src="https://img1.pic.in.th/images/nhh.png" alt="NHH" style={{ width: 28, height: 28, objectFit: 'contain', opacity: 0.8 }} />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '0.88rem' }}>โรงพยาบาลหนองหาน</span>
          </div>
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', margin: '0 0 10px' }}>ระบบรับเรื่องร้องเรียน เสนอแนะ และชื่นชม</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
            {[['📞 042-261135-6', 'tel:042-261135-6'], ['📧 nhh@moph.mail.go.th', '']].map(([label, href]) => (
              <a key={label} href={href || undefined} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>{label}</a>
            ))}
          </div>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            © {new Date().getFullYear()} พัฒนาโดย กลุ่มงานสุขภาพดิจิทัล · โรงพยาบาลหนองหาน
          </p>
        </div>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus, select:focus, textarea:focus { outline: none !important; border-color: #38a382 !important; box-shadow: 0 0 0 3px rgba(56,163,130,0.15) !important; }
        button:not(:disabled):active { transform: scale(0.98); }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───
const StepDot = ({ n, active }: { n: number; active?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2, flexShrink: 0 }}>
    <div style={{ width: 28, height: 28, borderRadius: '50%', background: active ? 'linear-gradient(135deg,#005C4B,#38a382)' : 'linear-gradient(135deg,#f59e0b,#fbbf24)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.78rem', boxShadow: `0 4px 12px ${active ? 'rgba(0,92,75,0.35)' : 'rgba(245,158,11,0.35)'}` }}>{n}</div>
  </div>
);
const ErrMsg = ({ msg }: { msg: string }) => <p style={{ color: '#ef4444', fontSize: '0.72rem', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 3 }}>⚠️ {msg}</p>;
const Req = () => <span style={{ color: '#ef4444' }}>*</span>;

// ─── Styles ───
const card: React.CSSProperties = { background: 'white', borderRadius: 18, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb', padding: '20px', marginBottom: 12 };
const sectionTag: React.CSSProperties = { fontSize: '0.78rem', fontWeight: 800, color: '#374151', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 };
const stepLabel: React.CSSProperties = { fontSize: '0.88rem', fontWeight: 800, color: '#1e293b', marginBottom: 12 };
const lb: React.CSSProperties = { display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#374151', marginBottom: 5 };
const inp: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1.5px solid #e5e7eb', borderRadius: 9, fontSize: '0.87rem', background: '#fafafa', color: '#1e293b', fontFamily: "'Sarabun',sans-serif", transition: 'all 0.2s', outline: 'none', display: 'block' };
const errBorder: React.CSSProperties = { borderColor: '#fca5a5', background: '#fff5f5' };
const btnGreen: React.CSSProperties = { padding: '11px 26px', background: 'linear-gradient(135deg,#005C4B,#38a382)', color: 'white', border: 'none', borderRadius: 12, fontSize: '0.9rem', fontWeight: 800, cursor: 'pointer', fontFamily: "'Sarabun',sans-serif", boxShadow: '0 6px 20px rgba(0,92,75,0.35)', transition: 'all 0.2s', whiteSpace: 'nowrap' };
const spinner: React.CSSProperties = { width: 16, height: 16, border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' };
