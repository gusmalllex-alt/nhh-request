'use client';
import { useState, useRef } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzA-89t5g8RFrlqejtUTXvJ166OE2qz2JOLzxuzmJ3doRXpnV31mmD81Lfu1ftMtb6Y/exec';

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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#f0f6f4 0%,#f4f8f7 100%)', fontFamily: "'Noto Sans Thai','Sarabun',sans-serif", display: 'flex', flexDirection: 'column' }}>

      {/* Success Modal Overlay */}
      {status === 'success' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', animation: 'fadeIn 0.3s ease-out' }}>
          <div style={{ background: 'white', borderRadius: 28, padding: '48px 36px', textAlign: 'center', maxWidth: 360, width: '90%', boxShadow: '0 24px 60px rgba(0,0,0,0.4)', animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transform: 'translateY(0)' }}>
            <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg,#d1fae5,#34d399)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 12px 24px rgba(16,185,129,0.35)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '0 0 12px' }}>ส่งข้อมูลสำเร็จ!</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 28px', lineHeight: 1.6 }}>ระบบได้รับเรื่องของท่านเรียบร้อยแล้ว<br/>ขอบพระคุณที่ร่วมพัฒนาโรงพยาบาล</p>
            <button 
              onClick={() => { setStatus('idle'); setSelected(''); setForm({ papade: '', type: '', detail: '', name: '', tel: '', line: '', email: '' }); setFile(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ width: '100%', padding: '16px', background: '#005C4B', color: 'white', border: 'none', borderRadius: 16, fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', fontFamily: "'Sarabun',sans-serif", transition: 'all 0.2s', boxShadow: '0 8px 16px rgba(0,92,75,0.25)' }}
            >
              ตกลง
            </button>
          </div>
        </div>
      )}

      <div style={{ background: 'linear-gradient(150deg,#00382b 0%,#005C4B 50%,#00796b 100%)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, background: 'radial-gradient(circle,rgba(0,200,150,0.25),transparent)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 260, height: 260, background: 'radial-gradient(circle,rgba(0,150,120,0.2),transparent)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div className="hero-header" style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', padding: '48px 20px 90px', textAlign: 'center' }}>
          {/* Logo with ring */}
          <div style={{ position: 'relative', width: 104, height: 104, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', animation: 'rpRing 3s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', inset: -16, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', animation: 'rpRing 3s ease-in-out infinite', animationDelay: '-1s' }} />
            <div style={{ width: 104, height: 104, borderRadius: 28, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <img src="https://img1.pic.in.th/images/nhh.png" alt="" style={{ width: 72, height: 72, borderRadius: 16 }} />
            </div>
          </div>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)', borderRadius: 100, padding: '5px 16px', marginBottom: 16 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4bffcf', display: 'inline-block', boxShadow: '0 0 8px #4bffcf', animation: 'rpPulse 2s infinite' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a7ffe8', letterSpacing: '0.08em' }}>ศูนย์รับเรื่องร้องเรียนและเสนอแนะ</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4.5vw,2.8rem)', fontWeight: 900, color: 'white', margin: '0 0 10px', letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>ร้องเรียนและเสนอแนะ</h1>
          <p style={{ color: 'rgba(200,255,240,0.8)', fontSize: '1rem', margin: '0 0 28px', fontWeight: 400 }}>โรงพยาบาลหนองหาน &nbsp;·&nbsp; จังหวัดอุดรธานี</p>
          <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
            {[['⏱', '< 24 ชม.'], ['🔒', 'ปลอดภัย'], ['👤', 'ไม่ระบุตัวตน']].map(([i, v], idx) => (
              <div key={idx} style={{ padding: '12px 20px', borderRight: idx < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: '1rem' }}>{i}</div><div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white', marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="main-container-pad" style={{ flex: 1, maxWidth: 640, width: '100%', margin: '-36px auto 0', padding: '0 16px 48px', position: 'relative', zIndex: 10 }}>
        <div style={card}>
          <div style={sectionTag}>📌 เลือกประเด็นที่ต้องการแจ้ง</div>
          <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {COMPLAINT_TYPES.map(ct => (
              <button key={ct.key} type="button" onClick={() => selectType(ct.key)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `2px solid ${selected === ct.key ? ct.color : '#e5e7eb'}`, background: selected === ct.key ? ct.activeBg : 'white', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontFamily: "'Sarabun',sans-serif" }}>
                <div style={{ fontSize: '1.2rem', width: 32, textAlign: 'center' }}>{ct.emoji}</div>
                <div><div style={{ fontWeight: 800, fontSize: '0.85rem', color: selected === ct.key ? ct.color : '#475569' }}>{ct.label}</div><div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{ct.sub}</div></div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="section-box">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'linear-gradient(135deg, #059669, #047857)', color: 'white' }}>📋</div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>รายละเอียดเรื่องที่แจ้ง</h2>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 0' }}>กรุณาระบุข้อมูลให้ครบถ้วนเพื่อความรวดเร็วในการแก้ไข</p>
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <label className="modern-label">
                <span style={{ fontSize: '1.2rem' }}>🔖</span> ประเภทบริการที่เกี่ยวข้อง <Req />
              </label>
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

            <div style={{ marginBottom: 28 }}>
              <label className="modern-label"><span style={{ fontSize: '1.2rem' }}>📝</span> รายละเอียด <Req /></label>
              <textarea value={form.detail} onChange={e => set('detail', e.target.value)} rows={4} className={`modern-input ${errors.detail ? 'error' : ''}`} placeholder="ระบุเหตุการณ์ วันเวลา สถานที่ และรายละเอียดที่ท่านพบ..." />
              {errors.detail && <ErrMsg msg={errors.detail} />}
            </div>
          </div>

          <div className="section-box">
            <div className="section-header">
              <div className="section-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' }}>👤</div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>ข้อมูลผู้แจ้ง</h2>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '4px 0 0' }}>ข้อมูลของท่านจะถูกเก็บรักษาเป็นความลับ ใช้เพื่อการติดต่อกลับเท่านั้น</p>
              </div>
            </div>

            <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {[['name', 'ชื่อ-นามสกุล', '👤'], ['tel', 'เบอร์โทรศัพท์', '📞'], ['line', 'Line ID (ถ้ามี)', '💬'], ['email', 'อีเมล', '✉️']].map(([k, l, icon]) => (
                <div key={k}>
                  <label className="modern-label"><span style={{ fontSize: '1.1rem' }}>{icon}</span> {l} {['name','email'].includes(k as string) && <Req />}</label>
                  <input value={form[k as keyof FormData]} onChange={e => set(k as keyof FormData, e.target.value)} className={`modern-input ${errors[k as keyof FormData] ? 'error' : ''}`} placeholder={`ระบุ${l}...`} />
                  {errors[k as keyof FormData] && <ErrMsg msg={errors[k as keyof FormData] as string} />}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" disabled={status === 'loading'} className="modern-button">
            {status === 'loading' ? '⏳ กำลังส่งข้อมูล...' : '🚀 ยืนยันการส่งข้อมูล'}
          </button>
        </form>
      </div>

      <footer style={{ background: 'linear-gradient(135deg,#00382b,#002d24)', padding: '48px 20px 32px', color: 'white', textAlign: 'center', marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 300, height: 200, background: 'radial-gradient(circle, rgba(0,200,150,0.1), transparent)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <img src="https://img1.pic.in.th/images/nhh.png" alt="Hospital Logo" style={{ width: 52, height: 52, borderRadius: 14, opacity: 0.7, margin: '0 auto 16px', filter: 'grayscale(50%) brightness(180%)', display: 'block' }} />
        <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 8px', opacity: 0.9, letterSpacing: '0.01em' }}>ศูนย์รับเรื่องร้องเรียน โรงพยาบาลหนองหาน</p>
        <p style={{ fontSize: '0.78rem', margin: '0 0 20px', opacity: 0.6 }}>📞 ติดต่อด่วน: 042-261135-6</p>
        <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.15)', margin: '0 auto 16px' }} />
        <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', margin: 0 }}>© {new Date().getFullYear()} โรงพยาบาลหนองหาน · All rights reserved.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }

        /* Hero animations */
        @keyframes rpRing { 0%,100% { transform: scale(1); opacity:1; } 50% { transform: scale(1.07); opacity:0.5; } }
        @keyframes rpPulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.4); } }

        /* Labels */
        .modern-label { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: #1e293b; margin-bottom: 8px; }

        /* Inputs */
        .modern-input {
          width: 100%; padding: 14px 16px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: 'Noto Sans Thai','Sarabun', sans-serif;
          color: #0f172a;
          transition: all 0.25s ease;
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        .modern-input:focus {
          border-color: #005C4B;
          background: white;
          box-shadow: 0 0 0 4px rgba(0,92,75,0.1), inset 0 2px 4px rgba(0,0,0,0);
          outline: none;
        }
        .modern-input:hover:not(:focus) { border-color: #94a3b8; }
        .modern-input.error { border-color: #fca5a5; background: #fff5f5; }

        /* Submit button */
        .modern-button {
          width: 100%; padding: 18px;
          background: linear-gradient(135deg, #00796b, #005C4B, #003d32);
          border: none; border-radius: 18px;
          color: white; font-size: 1.1rem; font-weight: 800;
          cursor: pointer;
          font-family: 'Noto Sans Thai','Sarabun', sans-serif;
          box-shadow: 0 12px 28px rgba(0,92,75,0.38);
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
          margin-top: 10px;
          letter-spacing: 0.01em;
          position: relative; overflow: hidden;
        }
        .modern-button::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          border-radius: 18px;
        }
        .modern-button:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(0,92,75,0.45); }
        .modern-button:active:not(:disabled) { transform: translateY(0); }
        .modern-button:disabled { background: #94a3b8; cursor: not-allowed; box-shadow: none; transform: none; }

        /* Section boxes */
        .section-box {
          background: white;
          border-radius: 22px;
          padding: 28px;
          margin-bottom: 20px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          transition: box-shadow 0.3s ease;
        }
        .section-box:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
        .section-header { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9; }
        .section-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; box-shadow: 0 4px 16px rgba(0,0,0,0.12); flex-shrink: 0; }

        @media (max-width: 640px) {
          .grid-cols-2 { grid-template-columns: 1fr !important; }
          .section-box { padding: 20px; }
        }
      `}</style>
    </div>
  );
}

const ErrMsg = ({ msg }: { msg: string }) => <p style={{ color: '#ef4444', fontSize: '0.7rem', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>⚠️ {msg}</p>;
const Req = () => <span style={{ color: '#ef4444' }}>*</span>;
const card = { background: 'white', borderRadius: 20, border: '1px solid rgba(0,0,0,0.04)', padding: '24px', marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' };
const sectionTag = { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 800, color: '#475569', background: '#f1f5f9', padding: '6px 12px', borderRadius: 10, marginBottom: 16 };
