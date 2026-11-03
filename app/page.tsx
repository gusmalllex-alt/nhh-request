'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1WC39jTrxVQT2KxnnvOpjghgASzKZiZmOK_BmZwUfedxsmUQQy0ZqgRw8qlAnSBRr8w/exec';

const TYPE_CARDS = [
  { key: 'พฤติกรรมบริการ', emoji: '🧑‍⚕️', color: '#00796b', bg: '#f0fdfa', border: '#99f6e4' },
  { key: 'ระบบบริการ', emoji: '⚙️', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
  { key: 'สิทธิผู้ป่วย', emoji: '⚖️', color: '#0d9488', bg: '#f0fdfa', border: '#99f6e4' },
  { key: 'อาคาร/สถานที่', emoji: '🏢', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  { key: 'สิ่งแวดล้อม', emoji: '🌿', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
  { key: 'อื่นๆ', emoji: '💬', color: '#475569', bg: '#f8fafc', border: '#e2e8f0' },
];

const COMPLAINT_TYPES = [
  { key: 'ข้อร้องเรียน (Complaint)', label: 'ข้อร้องเรียน', sub: 'Complaint', emoji: '⚠️', color: '#dc2626', bg: '#fff1f2', border: '#fecdd3', activeBg: '#fef2f2' },
  { key: 'ข้อเสนอแนะ (Suggestion)', label: 'ข้อเสนอแนะ', sub: 'Suggestion', emoji: '💡', color: '#00796b', bg: '#f0fdfa', border: '#99f6e4', activeBg: '#e6fffa' },
  { key: 'ข้อชื่นชม (Compliment)', label: 'ข้อชื่นชม', sub: 'Compliment', emoji: '⭐', color: '#d97706', bg: '#fffbeb', border: '#fde68a', activeBg: '#fffbeb' },
  { key: 'อื่นๆ', label: 'อื่นๆ', sub: 'Other', emoji: '💬', color: '#475569', bg: '#f8fafc', border: '#e2e8f0', activeBg: '#f1f5f9' },
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
          const fr = new FileReader(); 
          fr.onload = () => res((fr.result as string).split(',')[1]); 
          fr.onerror = rej; 
          fr.readAsDataURL(file); 
        });
        payload.fileInfo = { filename: file.name, mimeType: file.type, base64: b64 };
      }
      await fetch(SCRIPT_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      });
      setStatus('success');
    } catch { 
      setStatus('error'); 
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f0f7f4 0%, #f7faf8 50%, #f0f5f2 100%)', fontFamily: "'Noto Sans Thai','Sarabun',sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* Top Navbar */}
      <nav style={{ background: '#002d24', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 20px', position: 'relative', zIndex: 30 }}>
        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#a7ffe8', letterSpacing: '0.02em' }}>
              🏥 กระทรวงสาธารณสุข · รพ.หนองหาน
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/request" style={{ fontSize: '0.78rem', color: '#cbfbee', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}>
              📖 ขั้นตอนการรับเรื่อง
            </Link>
            <Link href="/admin" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              🔒 เจ้าหน้าที่
            </Link>
          </div>
        </div>
      </nav>

      {/* Success Modal Overlay */}
      {status === 'success' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,30,22,0.65)', backdropFilter: 'blur(10px)', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ background: 'white', borderRadius: 28, padding: '48px 36px', textAlign: 'center', maxWidth: 380, width: '90%', boxShadow: '0 24px 60px rgba(0,45,36,0.3)', animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div style={{ width: 84, height: 84, background: 'linear-gradient(135deg, #d1fae5, #34d399)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 12px 28px rgba(16,185,129,0.35)' }}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>ส่งข้อมูลสำเร็จ!</h2>
            <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0 0 28px', lineHeight: 1.7 }}>
              ระบบได้รับเรื่องของท่านเรียบร้อยแล้ว<br/>
              เจ้าหน้าที่จะดำเนินการตรวจสอบตามมาตรฐานบริการ<br/>
              <span style={{ fontSize: '0.85rem', color: '#005C4B', fontWeight: 700 }}>ขอบพระคุณที่ร่วมพัฒนาโรงพยาบาลหนองหาน</span>
            </p>
            <button 
              onClick={() => { setStatus('idle'); setSelected(''); setForm({ papade: '', type: '', detail: '', name: '', tel: '', line: '', email: '' }); setFile(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #00796b, #005C4B)', color: 'white', border: 'none', borderRadius: 16, fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', fontFamily: "'Sarabun',sans-serif", transition: 'all 0.2s', boxShadow: '0 8px 20px rgba(0,92,75,0.3)' }}
            >
              ตกลง
            </button>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div style={{ background: 'linear-gradient(150deg, #002d24 0%, #004d40 40%, #005C4B 75%, #00796b 100%)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: -100, right: -80, width: 340, height: 340, background: 'radial-gradient(circle,rgba(52,211,153,0.22),transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: -70, left: -60, width: 280, height: 280, background: 'radial-gradient(circle,rgba(0,121,107,0.35),transparent 70%)', borderRadius: '50%', filter: 'blur(45px)' }} />
        
        <div className="hero-header" style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', padding: '42px 20px 88px', textAlign: 'center' }}>
          {/* Logo */}
          <div style={{ position: 'relative', width: 92, height: 92, margin: '0 auto 20px' }}>
            <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', background: 'radial-gradient(circle, rgba(75,255,207,0.25), transparent 70%)', filter: 'blur(10px)' }} />
            <img src="https://img1.pic.in.th/images/nhh.png" alt="ตราโรงพยาบาลหนองหาน" style={{ width: 92, height: 92, display: 'block', position: 'relative', filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.35))' }} />
          </div>

          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)', borderRadius: 100, padding: '6px 18px', marginBottom: 14 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4bffcf', display: 'inline-block', boxShadow: '0 0 10px #4bffcf', animation: 'rpPulse 2s infinite' }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#a7ffe8', letterSpacing: '0.06em' }}>ศูนย์รับเรื่องร้องเรียนและข้อเสนอแนะ</span>
          </div>

          <h1 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'white', margin: '0 0 6px', letterSpacing: '-0.01em', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
            โรงพยาบาลหนองหาน
          </h1>
          <p style={{ color: 'rgba(200,255,240,0.85)', fontSize: '0.95rem', margin: '0 0 24px', fontWeight: 400 }}>
            สำนักงานสาธารณสุขจังหวัดอุดรธานี · กระทรวงสาธารณสุข
          </p>

          <div className="stat-badges" style={{ display: 'inline-flex', background: 'rgba(0,35,27,0.38)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(14px)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 6px 28px rgba(0,0,0,0.22)' }}>
            {[['⏱', 'ตอบสนองไว', '< 24 ชม.'], ['🔒', 'ความปลอดภัย', 'มาตรฐาน สธ.'], ['👤', 'สิทธิคุ้มครอง', 'ไม่ระบุตัวตนได้']].map(([icon, label, sub], idx) => (
              <div key={idx} className="stat-badge-item" style={{ padding: '10px 18px', borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem' }}>{icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white', marginTop: 2 }}>{sub}</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(200,255,240,0.7)', marginTop: 1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="main-container-pad" style={{ flex: 1, maxWidth: 640, width: '100%', margin: '-38px auto 0', padding: '0 16px 48px', position: 'relative', zIndex: 10 }}>
        
        {/* Step 1: Select Topic Card */}
        <div style={card}>
          <div style={sectionTag}>
            <span>📌</span>
            <span>ขั้นตอนที่ 1 : เลือกประเด็นที่ต้องการแจ้ง</span>
          </div>
          <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {COMPLAINT_TYPES.map(ct => {
              const isSel = selected === ct.key;
              return (
                <button 
                  key={ct.key} 
                  type="button" 
                  onClick={() => selectType(ct.key)} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 12, 
                    padding: '13px 14px', 
                    borderRadius: 14, 
                    border: `2px solid ${isSel ? ct.color : '#e2e8f0'}`, 
                    background: isSel ? ct.activeBg : '#ffffff', 
                    cursor: 'pointer', 
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 
                    textAlign: 'left', 
                    fontFamily: "'Sarabun',sans-serif",
                    boxShadow: isSel ? `0 4px 14px ${ct.color}25` : 'none',
                    transform: isSel ? 'scale(1.01)' : 'scale(1)'
                  }}
                >
                  <div style={{ fontSize: '1.3rem', width: 34, height: 34, borderRadius: 10, background: isSel ? 'white' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isSel ? '0 2px 6px rgba(0,0,0,0.06)' : 'none', flexShrink: 0 }}>
                    {ct.emoji}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.86rem', color: isSel ? ct.color : '#1e293b' }}>{ct.label}</div>
                    <div style={{ fontSize: '0.66rem', color: isSel ? ct.color : '#94a3b8', fontWeight: 600 }}>{ct.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.papade && <ErrMsg msg={errors.papade} />}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Section: Details */}
          <div className="section-box">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'linear-gradient(135deg, #00796b, #005C4B)', color: 'white' }}>
                📋
              </div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                  รายละเอียดเรื่องที่แจ้ง
                </h2>
                <p style={{ fontSize: '0.76rem', color: '#64748b', margin: '3px 0 0' }}>
                  ข้อมูลจะถูกส่งตรงถึงผู้รับผิดชอบงานรับเรื่องร้องเรียน รพ.หนองหาน
                </p>
              </div>
            </div>

            {/* Service Type */}
            <div style={{ marginBottom: 26 }}>
              <label className="modern-label">
                <span style={{ fontSize: '1.15rem' }}>🔖</span> ประเภทบริการที่เกี่ยวข้อง <Req />
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 8 }}>
                {TYPE_CARDS.map(tc => {
                  const isMatch = form.type === tc.key;
                  return (
                    <button 
                      key={tc.key} 
                      type="button" 
                      onClick={() => set('type', tc.key)} 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        gap: 6, 
                        padding: '12px 8px', 
                        borderRadius: 12, 
                        border: `2px solid ${isMatch ? tc.color : '#e2e8f0'}`, 
                        background: isMatch ? tc.bg : '#ffffff', 
                        cursor: 'pointer', 
                        transition: 'all 0.2s ease', 
                        fontFamily: "'Sarabun',sans-serif",
                        boxShadow: isMatch ? `0 4px 12px ${tc.color}20` : 'none',
                        transform: isMatch ? 'translateY(-2px)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '1.25rem' }}>{tc.emoji}</div>
                      <span style={{ fontSize: '0.72rem', fontWeight: isMatch ? 800 : 600, color: isMatch ? tc.color : '#475569', textAlign: 'center', lineHeight: 1.2 }}>
                        {tc.key}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.type && <ErrMsg msg={errors.type} />}
            </div>

            {/* Detail */}
            <div style={{ marginBottom: 24 }}>
              <label className="modern-label">
                <span style={{ fontSize: '1.15rem' }}>📝</span> รายละเอียดเรื่องที่แจ้ง <Req />
              </label>
              <textarea 
                value={form.detail} 
                onChange={e => set('detail', e.target.value)} 
                rows={4} 
                className={`modern-input ${errors.detail ? 'error' : ''}`} 
                placeholder="ระบุเหตุการณ์ วัน เวลา สถานที่ หรือบุคคลที่เกี่ยวข้อง เพื่อความสะดวกรวดเร็วในการตรวจสอบ..." 
              />
              {errors.detail && <ErrMsg msg={errors.detail} />}
            </div>

            {/* File Upload Field */}
            <div style={{ marginBottom: 6 }}>
              <label className="modern-label">
                <span style={{ fontSize: '1.15rem' }}>📎</span> แนบรูปภาพหรือเอกสาร (ถ้ามี)
              </label>
              <input 
                ref={fileRef}
                type="file" 
                accept="image/*,.pdf" 
                onChange={e => setFile(e.target.files?.[0] || null)}
                style={{ display: 'none' }}
                id="file-upload"
              />
              <div 
                onClick={() => fileRef.current?.click()}
                style={{
                  border: '2px dashed #bbf7d0',
                  borderRadius: 14,
                  padding: '14px 18px',
                  background: file ? '#f0fdf4' : '#fafcfb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: file ? '#dcfce7' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.1rem' }}>
                    {file ? '📄' : '📁'}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: file ? '#047857' : '#475569', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                      {file ? file.name : 'แตะเพื่อเลือกไฟล์รูปภาพหรือ PDF'}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                      {file ? `${(file.size / 1024).toFixed(1)} KB` : 'รองรับ JPG, PNG, PDF ขนาดไม่เกิน 10MB'}
                    </div>
                  </div>
                </div>
                {file ? (
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); setFile(null); if (fileRef.current) fileRef.current.value = ''; }}
                    style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '1.1rem', cursor: 'pointer', padding: '4px 8px' }}
                  >
                    ✕
                  </button>
                ) : (
                  <span style={{ fontSize: '0.78rem', color: '#005C4B', fontWeight: 700 }}>เลือกไฟล์</span>
                )}
              </div>
            </div>

          </div>

          {/* Section: Contact Information */}
          <div className="section-box">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'linear-gradient(135deg, #0d9488, #005C4B)', color: 'white' }}>
                👤
              </div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                  ข้อมูลผู้แจ้งเรื่อง
                </h2>
                <p style={{ fontSize: '0.76rem', color: '#64748b', margin: '3px 0 0' }}>
                  เก็บรักษาเป็นความลับตามมาตรฐานการคุ้มครองข้อมูลส่วนบุคคล (PDPA)
                </p>
              </div>
            </div>

            <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {([
                ['name', 'ชื่อ-นามสกุล', '👤', 'ระบุชื่อ-นามสกุลของท่าน', true],
                ['tel', 'เบอร์โทรศัพท์ติดต่อ', '📞', 'เช่น 0812345678', false],
                ['line', 'LINE ID (ถ้ามี)', '💬', 'ระบุ LINE ID เพื่อความสะดวก', false],
                ['email', 'อีเมล', '✉️', 'เช่น example@gmail.com', true]
              ] as [keyof FormData, string, string, string, boolean][]).map(([k, l, icon, ph, req]) => (
                <div key={k}>
                  <label className="modern-label">
                    <span style={{ fontSize: '1.05rem' }}>{icon}</span> {l} {req && <Req />}
                  </label>
                  <input 
                    value={form[k]} 
                    onChange={e => set(k, e.target.value)} 
                    className={`modern-input ${errors[k] ? 'error' : ''}`} 
                    placeholder={ph} 
                  />
                  {errors[k] && <ErrMsg msg={errors[k] as string} />}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={status === 'loading'} className="modern-button">
            {status === 'loading' ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span className="spinner" /> กำลังส่งข้อมูล...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span>🚀</span> ยืนยันการส่งเรื่องไปยังโรงพยาบาล
              </span>
            )}
          </button>
          {status === 'error' && (
            <p style={{ textAlign: 'center', color: '#dc2626', fontSize: '0.85rem', fontWeight: 700, marginTop: 12 }}>
              เกิดข้อผิดพลาดในการส่งข้อมูล โปรดตรวจสอบอินเทอร์เน็ตแล้วลองใหม่อีกครั้ง
            </p>
          )}
        </form>

      </div>

      {/* Footer */}
      <footer style={{ background: 'linear-gradient(135deg, #00241c 0%, #001f18 100%)', padding: '48px 20px 32px', color: 'white', textAlign: 'center', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 340, height: 220, background: 'radial-gradient(circle, rgba(0,200,150,0.12), transparent)', borderRadius: '50%', filter: 'blur(45px)', pointerEvents: 'none' }} />
        
        <img src="https://img1.pic.in.th/images/nhh.png" alt="Hospital Logo" style={{ width: 56, height: 56, borderRadius: 14, margin: '0 auto 16px', display: 'block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }} />
        <p style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 6px', color: '#cbfbee', letterSpacing: '0.01em' }}>
          ศูนย์รับเรื่องร้องเรียนและข้อเสนอแนะ โรงพยาบาลหนองหาน
        </p>
        <p style={{ fontSize: '0.8rem', margin: '0 0 16px', color: 'rgba(255,255,255,0.65)' }}>
          สำนักงานสาธารณสุขจังหวัดอุดรธานี · กระทรวงสาธารณสุข
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, fontSize: '0.78rem', color: '#94a3b8', margin: '0 0 20px' }}>
          <span>📞 โทรศัพท์: 042-261135-6</span>
          <span>·</span>
          <span>🚨 สายด่วน 1669</span>
          <span>·</span>
          <Link href="/request" style={{ color: '#4bffcf', textDecoration: 'none' }}>ขั้นตอนการดำเนินงาน</Link>
          <span>·</span>
          <Link href="/admin" style={{ color: '#a7ffe8', textDecoration: 'none' }}>ระบบเจ้าหน้าที่</Link>
        </div>

        <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.12)', margin: '0 auto 16px' }} />
        <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
          © {new Date().getFullYear()} โรงพยาบาลหนองหาน · All rights reserved.
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }

        @keyframes rpPulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.3); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Labels */
        .modern-label { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          font-size: 0.86rem; 
          font-weight: 700; 
          color: #1e293b; 
          margin-bottom: 8px; 
        }

        /* Inputs */
        .modern-input {
          width: 100%; 
          padding: 13px 16px;
          background: #ffffff;
          border: 1.5px solid #d1fae5;
          border-radius: 12px;
          font-size: 0.92rem;
          font-family: 'Noto Sans Thai','Sarabun', sans-serif;
          color: #0f172a;
          transition: all 0.25s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
        }
        .modern-input:focus {
          border-color: #005C4B;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(0,92,75,0.12);
          outline: none;
        }
        .modern-input:hover:not(:focus) { 
          border-color: #6ee7b7; 
        }
        .modern-input.error { 
          border-color: #fca5a5; 
          background: #fff5f5; 
        }

        /* Submit button */
        .modern-button {
          width: 100%; 
          padding: 17px;
          background: linear-gradient(135deg, #00796b 0%, #005C4B 50%, #004d40 100%);
          border: none; 
          border-radius: 16px;
          color: white; 
          font-size: 1.05rem; 
          font-weight: 800;
          cursor: pointer;
          font-family: 'Noto Sans Thai','Sarabun', sans-serif;
          box-shadow: 0 10px 24px rgba(0,92,75,0.28);
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
          margin-top: 6px;
          letter-spacing: 0.01em;
          position: relative; 
          overflow: hidden;
        }
        .modern-button:hover:not(:disabled) { 
          transform: translateY(-2px); 
          box-shadow: 0 14px 32px rgba(0,92,75,0.36); 
        }
        .modern-button:active:not(:disabled) { 
          transform: translateY(0); 
        }
        .modern-button:disabled { 
          background: #94a3b8; 
          cursor: not-allowed; 
          box-shadow: none; 
          transform: none; 
        }

        /* Section boxes */
        .section-box {
          background: white;
          border-radius: 22px;
          padding: 26px 24px;
          margin-bottom: 18px;
          box-shadow: 0 4px 20px rgba(0, 92, 75, 0.04);
          border: 1px solid rgba(0, 92, 75, 0.08);
          transition: box-shadow 0.25s ease;
        }
        .section-box:hover { 
          box-shadow: 0 8px 28px rgba(0, 92, 75, 0.07); 
        }
        .section-header { 
          display: flex; 
          align-items: center; 
          gap: 14px; 
          margin-bottom: 22px; 
          padding-bottom: 14px; 
          border-bottom: 1px solid #f0fdf4; 
        }
        .section-icon { 
          width: 44px; 
          height: 44px; 
          border-radius: 13px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          font-size: 1.2rem; 
          box-shadow: 0 4px 14px rgba(0, 92, 75, 0.2); 
          flex-shrink: 0; 
        }

        @media (max-width: 640px) {
          .grid-cols-2 { grid-template-columns: 1fr !important; }
          .section-box { padding: 20px 16px; border-radius: 18px; }
          .stat-badges { flex-wrap: wrap !important; justify-content: center !important; border-radius: 14px !important; }
          .stat-badge-item { padding: 8px 12px !important; }
          .modern-button { padding: 15px; font-size: 0.98rem; border-radius: 14px; }
        }
      `}</style>
    </div>
  );
}

const ErrMsg = ({ msg }: { msg: string }) => (
  <p style={{ color: '#ef4444', fontSize: '0.72rem', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
    ⚠️ {msg}
  </p>
);

const Req = () => <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>;

const card = { 
  background: 'white', 
  borderRadius: 22, 
  border: '1px solid rgba(0, 92, 75, 0.08)', 
  padding: '24px', 
  marginBottom: 18, 
  boxShadow: '0 4px 20px rgba(0, 92, 75, 0.04)' 
};

const sectionTag = { 
  display: 'inline-flex', 
  alignItems: 'center', 
  gap: 6, 
  fontSize: '0.82rem', 
  fontWeight: 800, 
  color: '#005C4B', 
  background: '#f0fdf4', 
  border: '1px solid #bbf7d0',
  padding: '6px 14px', 
  borderRadius: 10, 
  marginBottom: 16 
};
