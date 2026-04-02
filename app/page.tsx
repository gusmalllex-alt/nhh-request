'use client';

import { useState, useRef } from 'react';

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwvB3QPrLHImxbVW4NXKXxd3bFDjQizm1HEDnRZX6D5fz402LiQZJWAL0iU-5-emdav/exec';

const PAPADE_OPTIONS = [
  'ข้อร้องเรียน (Complaint)',
  'ข้อเสนอแนะ (Suggestion)',
  'ข้อชื่นชม (Compliment)',
  'อื่นๆ',
];

const TYPE_OPTIONS = [
  'พฤติกรรมบริการ',
  'ระบบบริการ',
  'อาคาร/สถานที่',
  'สิ่งแวดล้อม',
  'อื่นๆ',
];

type FormData = {
  papade: string;
  type: string;
  detail: string;
  name: string;
  tel: string;
  line: string;
  email: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Home() {
  const [form, setForm] = useState<FormData>({
    papade: '',
    type: '',
    detail: '',
    name: '',
    tel: '',
    line: '',
    email: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.papade) e.papade = 'กรุณาเลือกประเด็นหลัก';
    if (!form.type) e.type = 'กรุณาเลือกประเภทบริการ';
    if (!form.detail.trim()) e.detail = 'กรุณาระบุรายละเอียดเหตุการณ์';
    if (!form.name.trim()) e.name = 'กรุณาระบุชื่อ-นามสกุล';
    if (!form.email.trim()) e.email = 'กรุณาระบุอีเมล';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    return e;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.size > 5 * 1024 * 1024) {
      alert('ไฟล์ต้องมีขนาดไม่เกิน 5MB');
      if (fileRef.current) fileRef.current.value = '';
      return;
    }
    setFile(f || null);
  };

  const toBase64 = (f: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setStatus('loading');
    try {
      const payload: Record<string, unknown> = { ...form };
      if (file) {
        payload.fileInfo = {
          filename: file.name,
          mimeType: file.type,
          base64: await toBase64(file),
        };
      }

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setStatus('success');
      setForm({ papade: '', type: '', detail: '', name: '', tel: '', line: '', email: '' });
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
    } catch {
      setStatus('error');
    }
  };

  // ---- SUCCESS SCREEN ----
  if (status === 'success') {
    return (
      <div style={successWrapperStyle}>
        <div style={successCardStyle}>
          <div style={successIconStyle}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a202c', margin: '0 0 10px' }}>ส่งข้อมูลสำเร็จ!</h2>
          <p style={{ color: '#4a5568', lineHeight: 1.7, margin: '0 0 6px' }}>ขอบคุณที่ส่งเรื่องราวให้เรารับทราบ</p>
          <p style={{ color: '#718096', fontSize: '0.88rem', margin: '0 0 28px' }}>
            ทีมงานจะดำเนินการตรวจสอบและแจ้งผลให้ท่านทราบทางอีเมลโดยเร็วที่สุด
          </p>
          <button onClick={() => setStatus('idle')} style={submitBtnStyle}>
            ส่งเรื่องใหม่
          </button>
        </div>
      </div>
    );
  }

  // ---- MAIN FORM ----
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Sarabun',sans-serif" }}>

      {/* Hero */}
      <div style={heroStyle}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 30%,rgba(100,200,150,0.2) 0%,transparent 60%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0h10v60H25V0zm-25 25h60v10H0V25z' fill='%23ffffff' fill-opacity='0.04' fill-rule='evenodd'/%3E%3C/svg%3E\")" }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '56px 20px 120px' }}>
          <img
            src="https://img1.pic.in.th/images/nhh.png"
            alt="โรงพยาบาลหนองหาน"
            style={{ width: 120, height: 120, objectFit: 'contain', margin: '0 auto 20px', display: 'block', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}
          />
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 900, color: 'white', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            ศูนย์รับเรื่องร้องเรียนและเสนอแนะ
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', margin: '0 0 6px', fontWeight: 500 }}>
            โรงพยาบาลหนองหาน จังหวัดอุดรธานี
          </p>
          <div style={{ width: 48, height: 4, background: '#fbbf24', borderRadius: 99, margin: '16px auto 0' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 72 }}>
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,36 C480,72 960,0 1440,36 L1440,72 L0,72 Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* Form Card */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px 60px', marginTop: -60, position: 'relative', zIndex: 10 }}>
        <div style={cardStyle}>

          {/* Card Header */}
          <div style={cardHeaderStyle}>
            <div style={cardHeaderIconStyle}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1e293b' }}>แบบฟอร์มบันทึกข้อมูล</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>กรอกข้อมูลตามความเป็นจริง เพื่อความรวดเร็วในการตรวจสอบ</div>
            </div>
            <div style={secureTagStyle}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-2.215-.601-4.288-1.643-6.065M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ข้อมูลของท่านจะถูกปกปิดเป็นความลับ
            </div>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} noValidate style={{ padding: '28px 28px 20px' }}>

            {/* ─── Step 1 ─── */}
            <div style={stepWrapStyle}>
              <div style={stepLineStyle} />
              <div style={stepDotStyle}>1</div>
              <h3 style={stepTitleStyle}>รายละเอียดเรื่องที่ต้องการแจ้ง</h3>

              <div style={fieldBoxStyle}>
                {/* Row: papade + type */}
                <div style={rowStyle}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={labelStyle}>ประเด็นหลัก <Red /></label>
                    <select value={form.papade} onChange={(e) => handleChange('papade', e.target.value)} style={{ ...inputStyle, ...(errors.papade ? errorBorder : {}) }}>
                      <option value="">-- เลือกประเด็น --</option>
                      {PAPADE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {errors.papade && <Err msg={errors.papade} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={labelStyle}>ประเภทบริการ <Red /></label>
                    <select value={form.type} onChange={(e) => handleChange('type', e.target.value)} style={{ ...inputStyle, ...(errors.type ? errorBorder : {}) }}>
                      <option value="">-- เลือกประเภทบริการ --</option>
                      {TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {errors.type && <Err msg={errors.type} />}
                  </div>
                </div>

                {/* detail */}
                <div style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>รายละเอียดเหตุการณ์ <Red /></label>
                  <textarea
                    value={form.detail}
                    onChange={(e) => handleChange('detail', e.target.value)}
                    placeholder="ระบุ วัน เวลา สถานที่ และรายละเอียดเหตุการณ์ที่เกิดขึ้นอย่างชัดเจน..."
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', ...(errors.detail ? errorBorder : {}) }}
                  />
                  {errors.detail && <Err msg={errors.detail} />}
                </div>

                {/* File */}
                <div>
                  <label style={labelStyle}>
                    แนบเอกสาร/รูปภาพอ้างอิง <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.76rem' }}>(ถ้ามี)</span>
                  </label>
                  <label
                    htmlFor="fileInput"
                    style={fileZoneStyle}
                  >
                    <span style={{ color: file ? '#005C4B' : '#94a3b8', fontWeight: file ? 600 : 400, fontSize: '0.88rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {file ? file.name : 'คลิกเพื่อเลือกไฟล์รูปภาพ หรือเอกสาร...'}
                    </span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                  </label>
                  <input id="fileInput" ref={fileRef} type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={handleFileChange} style={{ display: 'none' }} />
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '4px 0 0' }}>รองรับไฟล์ขนาดไม่เกิน 5MB</p>
                </div>
              </div>
            </div>

            {/* ─── Step 2 ─── */}
            <div style={{ ...stepWrapStyle, borderLeft: 'none', paddingBottom: 0 }}>
              <div style={{ ...stepDotStyle, background: '#fbbf24' }}>2</div>
              <h3 style={stepTitleStyle}>
                ข้อมูลผู้แจ้ง{' '}
                <span style={{ fontSize: '0.78rem', fontWeight: 400, color: '#94a3b8' }}>(เพื่อแจ้งผลการดำเนินการ)</span>
              </h3>

              <div style={fieldBoxStyle}>
                <div style={rowStyle}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={labelStyle}>ชื่อ-นามสกุล <Red /></label>
                    <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="ระบุชื่อ และ นามสกุลจริง" style={{ ...inputStyle, ...(errors.name ? errorBorder : {}) }} />
                    {errors.name && <Err msg={errors.name} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={labelStyle}>เบอร์โทรศัพท์ <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.76rem' }}>(ถ้ามี)</span></label>
                    <input type="tel" value={form.tel} onChange={(e) => handleChange('tel', e.target.value)} placeholder="08XXXXXXXX" style={inputStyle} />
                  </div>
                </div>
                <div style={rowStyle}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={labelStyle}>Line ID <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.76rem' }}>(ถ้ามี)</span></label>
                    <input type="text" value={form.line} onChange={(e) => handleChange('line', e.target.value)} placeholder="ระบุ Line ID" style={inputStyle} />
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={labelStyle}>อีเมล <Red /></label>
                    <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="example@email.com" style={{ ...inputStyle, ...(errors.email ? errorBorder : {}) }} />
                    {errors.email && <Err msg={errors.email} />}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Step 3 Submit ─── */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '18px 20px', marginTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ fontSize: '0.78rem', color: '#15803d', lineHeight: 1.6 }}>
                <strong>⚠️ คำเตือน:</strong> การส่งข้อมูลอันเป็นเท็จ หรือมีเจตนากลั่นแกล้งผู้อื่น<br />
                อาจมีความผิดตาม พ.ร.บ. คอมพิวเตอร์
              </div>
              <button type="submit" disabled={status === 'loading'} style={submitBtnStyle}>
                {status === 'loading' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ display: 'inline-block', width: 18, height: 18, border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    กำลังส่ง...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                    บันทึกข้อมูล
                  </span>
                )}
              </button>
            </div>

            {status === 'error' && (
              <div style={{ marginTop: 12, padding: '12px 16px', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 10, color: '#be123c', fontSize: '0.85rem' }}>
                ⚠️ เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
              </div>
            )}
          </form>

          {/* Footer links */}
          <div style={{ textAlign: 'center', padding: '12px 28px 28px', borderTop: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
              โรงพยาบาลหนองหาน &nbsp;·&nbsp; พัฒนาโดย กลุ่มงานสุขภาพดิจิทัล (GUsmALL)
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        * { box-sizing: border-box; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #38a382 !important; box-shadow: 0 0 0 3px rgba(56,163,130,0.12); }
      `}</style>
    </div>
  );
}

// ─── Sub-components ───
const Red = () => <span style={{ color: '#ef4444' }}>*</span>;
const Err = ({ msg }: { msg: string }) => <p style={{ color: '#ef4444', fontSize: '0.75rem', margin: '4px 0 0' }}>{msg}</p>;

// ─── Styles ───
const heroStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg,#003d32 0%,#005C4B 40%,#38a382 100%)',
  position: 'relative', overflow: 'hidden',
};
const cardStyle: React.CSSProperties = {
  background: 'white', borderRadius: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', overflow: 'hidden',
};
const cardHeaderStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 14, padding: '18px 28px', background: 'linear-gradient(to right,#f8fafc,white)', borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap',
};
const cardHeaderIconStyle: React.CSSProperties = {
  width: 40, height: 40, borderRadius: 10, background: '#005C4B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};
const secureTagStyle: React.CSSProperties = {
  marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', fontWeight: 700, color: '#005C4B', background: '#f0fdf4', padding: '6px 12px', borderRadius: 8, border: '1px solid #bbf7d0',
};
const stepWrapStyle: React.CSSProperties = {
  position: 'relative', paddingLeft: 32, paddingBottom: 28, borderLeft: '2px solid #d1fae5',
};
const stepLineStyle: React.CSSProperties = {};
const stepDotStyle: React.CSSProperties = {
  position: 'absolute', left: -17, top: 0, width: 32, height: 32,
  background: '#005C4B', color: 'white', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '0.82rem', fontWeight: 800, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', border: '3px solid white',
};
const stepTitleStyle: React.CSSProperties = { fontSize: '0.95rem', fontWeight: 800, color: '#1e293b', margin: '0 0 16px' };
const fieldBoxStyle: React.CSSProperties = {
  background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
};
const rowStyle: React.CSSProperties = { display: 'flex', gap: 14, marginBottom: 14, flexWrap: 'wrap' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#374151', marginBottom: 5 };
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', border: '1.5px solid #e2e8f0', borderRadius: 8,
  fontSize: '0.9rem', background: '#f8fafc', color: '#1e293b',
  fontFamily: "'Sarabun',sans-serif", transition: 'border-color 0.2s', outline: 'none',
};
const errorBorder: React.CSSProperties = { borderColor: '#fca5a5' };
const fileZoneStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px',
  border: '1.5px dashed #cbd5e1', borderRadius: 8, background: '#f8fafc',
  cursor: 'pointer', transition: 'all 0.2s',
};
const submitBtnStyle: React.CSSProperties = {
  padding: '11px 28px', background: '#005C4B', color: 'white', border: 'none',
  borderRadius: 10, fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
  fontFamily: "'Sarabun',sans-serif", boxShadow: '0 4px 12px rgba(0,92,75,0.3)',
  transition: 'all 0.2s',
};
const successWrapperStyle: React.CSSProperties = {
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'linear-gradient(135deg,#003d32,#005C4B)', fontFamily: "'Sarabun',sans-serif", padding: 20,
};
const successCardStyle: React.CSSProperties = {
  background: 'white', borderRadius: 24, padding: '48px 40px', textAlign: 'center',
  maxWidth: 440, width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
};
const successIconStyle: React.CSSProperties = {
  width: 80, height: 80, background: '#d1fae5', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
};
