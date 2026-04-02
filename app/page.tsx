'use client';
import { useState, useRef } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwvB3QPrLHImxbVW4NXKXxd3bFDjQizm1HEDnRZX6D5fz402LiQZJWAL0iU-5-emdav/exec';

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

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#003d32,#005C4B,#1a7a5e)', padding: 20, fontFamily: "'Sarabun',sans-serif" }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '48px 40px', textAlign: 'center', maxWidth: 420, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.25)' }}>
          <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#d1fae5,#6ee7b7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(16,185,129,0.35)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1a202c', margin: '0 0 10px' }}>ส่งเรื่องสำเร็จแล้ว!</h2>
          <button onClick={() => { setStatus('idle'); setSelected(''); setForm({ papade: '', type: '', detail: '', name: '', tel: '', line: '', email: '' }); setFile(null); }} style={btnGreen}>ส่งเรื่องใหม่</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f3', fontFamily: "'Sarabun',sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'linear-gradient(155deg,#002d24 0%,#004d3d 40%,#005C4B 70%,#2d8a70 100%)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', padding: '40px 20px 80px', textAlign: 'center' }}>
          <img src="https://img1.pic.in.th/images/nhh.png" alt="" style={{ width: 96, height: 96, margin: '0 auto 20px' }} />
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.5rem)', fontWeight: 900, color: 'white', margin: '0 0 8px' }}>ร้องเรียนและเสนอแนะ</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>โรงพยาบาลหนองหาน จังหวัดอุดรธานี</p>
          <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.2)', borderRadius: 14, overflow: 'hidden', marginTop: 20 }}>
            {[['⏱', '< 24 ชม.'], ['🔒', 'ปลอดภัย'], ['👤', 'ไม่ระบุตัวตน']].map(([i, v], idx) => (
              <div key={idx} style={{ padding: '10px 16px', borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem' }}>{i}</div><div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, maxWidth: 640, width: '100%', margin: '-36px auto 0', padding: '0 16px 48px', position: 'relative', zIndex: 10 }}>
        <div style={card}>
          <div style={sectionTag}>📌 เลือกประเด็นที่ต้องการแจ้ง</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {COMPLAINT_TYPES.map(ct => (
              <button key={ct.key} type="button" onClick={() => selectType(ct.key)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `2px solid ${selected === ct.key ? ct.color : '#e5e7eb'}`, background: selected === ct.key ? ct.activeBg : 'white', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontFamily: "'Sarabun',sans-serif" }}>
                <div style={{ fontSize: '1.2rem', width: 32, textAlign: 'center' }}>{ct.emoji}</div>
                <div><div style={{ fontWeight: 800, fontSize: '0.85rem', color: selected === ct.key ? ct.color : '#475569' }}>{ct.label}</div><div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{ct.sub}</div></div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#005C4B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🖋️</div>
              <h2 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>รายละเอียดเรื่องที่แจ้ง</h2>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={lb}>ประเภทบริการที่เกี่ยวข้อง <Req /></label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(100px,1fr))', gap: 8 }}>
                {TYPE_CARDS.map(tc => (
                  <button key={tc.key} type="button" onClick={() => set('type', tc.key)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 10px', borderRadius: 12, border: `2px solid ${form.type === tc.key ? tc.color : '#e5e7eb'}`, background: form.type === tc.key ? tc.bg : 'white', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Sarabun',sans-serif" }}>
                    <div style={{ fontSize: '1.2rem' }}>{tc.emoji}</div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: form.type === tc.key ? tc.color : '#64748b', textAlign: 'center' }}>{tc.key}</span>
                  </button>
                ))}
              </div>
              {errors.type && <ErrMsg msg={errors.type} />}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={lb}>รายละเอียด <Req /></label>
              <textarea value={form.detail} onChange={e => set('detail', e.target.value)} rows={4} style={{ ...inp, ...(errors.detail ? errBorder : {}) }} placeholder="ระบุเหตุการณ์..." />
              {errors.detail && <ErrMsg msg={errors.detail} />}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={lb}>ข้อมูลผู้แจ้ง <span style={{ fontWeight: 400, color: '#94a3b8' }}>(เพื่อการติดต่อกลับ)</span></label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[['name', 'ชื่อ-นามสกุล'], ['tel', 'เบอร์โทร'], ['line', 'Line ID (ถ้ามี)'], ['email', 'อีเมล']].map(([k, l]) => (
                  <div key={k}><label style={{ fontSize: '0.7rem', color: '#64748b' }}>{l}</label><input value={form[k as keyof FormData]} onChange={e => set(k as keyof FormData, e.target.value)} style={{ ...inp, ...(errors[k as keyof FormData] ? errBorder : {}) }} /></div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={status === 'loading'} style={{ ...btnGreen, width: '100%', marginTop: 10 }}>{status === 'loading' ? 'กำลังส่ง...' : 'ส่งข้อมูล'}</button>
          </div>
        </form>
      </div>

      <footer style={{ background: '#002d24', padding: '32px 16px', color: 'white', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', margin: '0 0 8px' }}>📞 ติดต่อ: 042-261135-6</p>
        <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>© {new Date().getFullYear()} โรงพยาบาลหนองหาน</p>
      </footer>
      <style>{`* { box-sizing: border-box; } input:focus, textarea:focus { outline: none; border-color: #005C4B !important; box-shadow: 0 0 0 3px rgba(0,92,75,0.1); }`}</style>
    </div>
  );
}

const ErrMsg = ({ msg }: { msg: string }) => <p style={{ color: '#ef4444', fontSize: '0.65rem', margin: '4px 0 0' }}>⚠️ {msg}</p>;
const Req = () => <span style={{ color: '#ef4444' }}>*</span>;
const card = { background: 'white', borderRadius: 16, border: '1px solid #e5e7eb', padding: '24px', marginBottom: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' };
const sectionTag = { fontSize: '0.75rem', fontWeight: 800, color: '#64748b', marginBottom: 14 };
const lb = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: 6 };
const inp = { width: '100%', padding: '10px 12px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '0.85rem', fontFamily: "'Sarabun',sans-serif" };
const errBorder = { borderColor: '#fca5a5', background: '#fff5f5' };
const btnGreen = { padding: '14px', background: '#005C4B', color: 'white', border: 'none', borderRadius: 12, fontSize: '0.9rem', fontWeight: 800, cursor: 'pointer' };
