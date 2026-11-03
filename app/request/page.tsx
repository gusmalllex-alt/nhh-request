'use client';
import Link from 'next/link';

export const dynamic = 'force-static';

export default function RequestPage() {
  return (
    <div className="rp-root">
      {/* ══════════════════════════════════════
          TOP UTILITY NAVBAR
      ══════════════════════════════════════ */}
      <nav className="rp-topbar">
        <div className="rp-container rp-topbar-inner">
          <div className="rp-topbar-brand">
            <span className="rp-topbar-dot" />
            <span>กระทรวงสาธารณสุข · โรงพยาบาลหนองหาน</span>
          </div>
          <div className="rp-topbar-links">
            <Link href="/" className="rp-topbar-link rp-topbar-link--btn">
              📝 แจ้งเรื่องทันที
            </Link>
            <Link href="/admin" className="rp-topbar-link">
              🔒 เจ้าหน้าที่
            </Link>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="rp-hero">
        {/* Animated background blobs */}
        <div className="rp-blob rp-blob-1" />
        <div className="rp-blob rp-blob-2" />
        <div className="rp-blob rp-blob-3" />
        <div className="rp-grid-overlay" />

        <div className="rp-hero-inner">
          {/* Badge */}
          <div className="rp-badge">
            <span className="rp-badge-dot" />
            ศูนย์รับเรื่องร้องเรียน ข้อเสนอแนะ และสิทธิผู้ป่วย
          </div>

          {/* Icon */}
          <div className="rp-hero-icon-wrap">
            <div className="rp-hero-icon-ring" />
            <div className="rp-hero-icon-ring rp-hero-icon-ring--2" />
            <div className="rp-hero-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
          </div>

          <h1 className="rp-hero-title">รับฟังทุกเสียง เพื่อพัฒนาบริการ</h1>
          <p className="rp-hero-sub">โรงพยาบาลหนองหาน &nbsp;·&nbsp; สำนักงานสาธารณสุขจังหวัดอุดรธานี</p>
          <p className="rp-hero-desc">
            เราพร้อมรับฟังทุกข้อร้องเรียน ข้อเสนอแนะ ข้อชื่นชม และดูแลคุ้มครองสิทธิผู้ป่วย<br />
            เพื่อยกระดับคุณภาพการรักษาพยาบาลด้วยความโปร่งใสและมีมาตรฐาน
          </p>

          <div style={{ marginBottom: 36, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="rp-hero-cta">
              🚀 เริ่มต้นกรอกแบบฟอร์มแจ้งเรื่อง
            </Link>
            <a href="#process" className="rp-hero-cta-secondary">
              📖 ดูขั้นตอนการดำเนินการ
            </a>
          </div>

          {/* Stats row */}
          <div className="rp-stats">
            <div className="rp-stat">
              <span className="rp-stat-num">24 ชม.</span>
              <span className="rp-stat-lbl">ประสานงานตอบสนอง</span>
            </div>
            <div className="rp-stat-sep" />
            <div className="rp-stat">
              <span className="rp-stat-num">มาตรฐาน สธ.</span>
              <span className="rp-stat-lbl">ความปลอดภัยสูงสุด</span>
            </div>
            <div className="rp-stat-sep" />
            <div className="rp-stat">
              <span className="rp-stat-num">คุ้มครองสิทธิ</span>
              <span className="rp-stat-lbl">ไม่ระบุตัวตนได้</span>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="rp-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z" fill="#f0f7f4" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INFO CARDS
      ══════════════════════════════════════ */}
      <section className="rp-cards-section">
        <div className="rp-container">
          <div className="rp-section-label">ประเภทประเด็นที่เปิดรับ</div>
          <h2 className="rp-section-title">ร่วมสร้างสรรค์และดูแลระบบบริการไปด้วยกัน</h2>
          <div className="rp-cards-grid">

            {/* Card 1 */}
            <div className="rp-card rp-card--complaint">
              <div className="rp-card-glow" />
              <div className="rp-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="rp-card-title">เรื่องร้องเรียน</h3>
              <p className="rp-card-desc">แจ้งปัญหาด้านการบริการ พฤติกรรมบริการ ความไม่สะดวก หรือข้อบกพร่องเพื่อให้ทีมงานแก้ไขโดยเร็ว</p>
              <div className="rp-card-tag">Complaint</div>
            </div>

            {/* Card 2 */}
            <div className="rp-card rp-card--suggest">
              <div className="rp-card-glow" />
              <div className="rp-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="rp-card-title">ข้อเสนอแนะ</h3>
              <p className="rp-card-desc">แบ่งปันไอเดีย ความคิดเห็น เพื่อพัฒนาสิ่งอำนวยความสะดวก และขั้นตอนการให้บริการให้ดียิ่งขึ้น</p>
              <div className="rp-card-tag">Suggestion</div>
            </div>

            {/* Card 3 */}
            <div className="rp-card rp-card--rights">
              <div className="rp-card-glow" />
              <div className="rp-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-14-9-4-9 4m18 0-4.5 7.5a4.5 4.5 0 0 1-9 0L3 7m18 0v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7" />
                </svg>
              </div>
              <h3 className="rp-card-title">สิทธิผู้ป่วย</h3>
              <p className="rp-card-desc">ข้อปรึกษา ข้อสอบถาม หรือแจ้งประเด็นเกี่ยวกับการคุ้มครองสิทธิและความเท่าเทียมในการรับบริการ</p>
              <div className="rp-card-tag">Patient Rights</div>
            </div>

            {/* Card 4 */}
            <div className="rp-card rp-card--praise">
              <div className="rp-card-glow" />
              <div className="rp-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="rp-card-title">ข้อชื่นชม</h3>
              <p className="rp-card-desc">ส่งต่อกำลังใจอันมีค่ายิ่งถึงแพทย์ พยาบาล และเจ้าหน้าที่ผู้ปฏิบัติงานด้วยความทุ่มเท</p>
              <div className="rp-card-tag">Compliment</div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROCESS STEPS
      ══════════════════════════════════════ */}
      <section id="process" className="rp-steps-section">
        <div className="rp-container">
          <div className="rp-section-label">ขั้นตอนการดำเนินงาน</div>
          <h2 className="rp-section-title">กระบวนการรับเรื่องและแก้ไขปัญหา</h2>
          <div className="rp-steps">
            <div className="rp-step">
              <div className="rp-step-num">01</div>
              <div className="rp-step-body">
                <h4>ยื่นเรื่อง</h4>
                <p>กรอกแบบฟอร์มออนไลน์ได้ตลอด 24 ชม.</p>
              </div>
            </div>
            <div className="rp-step-arrow">→</div>
            <div className="rp-step">
              <div className="rp-step-num">02</div>
              <div className="rp-step-body">
                <h4>ตรวจสอบ</h4>
                <p>ทีมงานคัดกรองข้อมูลภายใน 24 ชม.</p>
              </div>
            </div>
            <div className="rp-step-arrow">→</div>
            <div className="rp-step">
              <div className="rp-step-num">03</div>
              <div className="rp-step-body">
                <h4>ดำเนินการแก้ไข</h4>
                <p>ส่งต่อหน่วยงานที่เกี่ยวข้องดำเนินการ</p>
              </div>
            </div>
            <div className="rp-step-arrow">→</div>
            <div className="rp-step">
              <div className="rp-step-num">04</div>
              <div className="rp-step-body">
                <h4>แจ้งผลการจัดการ</h4>
                <p>รายงานผลกลับทางเบอร์โทร/อีเมลที่ระบุ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA PROMPT BANNER
      ══════════════════════════════════════ */}
      <section style={{ padding: '24px 0 0', background: '#f0f7f4' }}>
        <div className="rp-container">
          <div style={{ background: 'linear-gradient(135deg, #004d40, #005C4B, #00796b)', borderRadius: 24, padding: '36px 32px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, boxShadow: '0 12px 36px rgba(0,92,75,0.22)' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px' }}>พร้อมแจ้งเรื่องหรือส่งข้อเสนอแนะแล้วหรือยัง?</h3>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '0.92rem' }}>ท่านสามารถกรอกแบบฟอร์มบนเว็บไซต์ได้โดยตรง สะดวก รวดเร็ว และเป็นความลับ</p>
            </div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#4bffcf', color: '#00382b', borderRadius: 14, fontWeight: 800, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 6px 18px rgba(75,255,207,0.3)', transition: 'transform 0.2s' }}>
              <span>📝</span> ไปที่หน้ากรอกแบบฟอร์ม
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FORM SECTION
      ══════════════════════════════════════ */}
      <section className="rp-form-section">
        <div className="rp-container">
          {/* Top notice */}
          <div className="rp-notice">
            <div className="rp-notice-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-2.215-.601-4.288-1.643-6.065M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p>
              ข้อมูลและประวัติส่วนบุคคลของท่านจะถูกเก็บรักษาไว้เป็นความลับอย่างเคร่งครัดตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)
            </p>
          </div>

          {/* Form card */}
          <div className="rp-form-card">
            <div className="rp-form-header">
              <div className="rp-form-header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <div>
                <h2>กรอกแบบฟอร์มรับเรื่องออนไลน์</h2>
                <p>ส่งข้อมูลถึงผู้บริหารและทีมคุณภาพโรงพยาบาลหนองหาน</p>
              </div>
              <div className="rp-form-header-badges">
                <span className="rp-badge-sm rp-badge-sm--safe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  ความปลอดภัย SSL
                </span>
                <span className="rp-badge-sm rp-badge-sm--anon">ไม่ระบุตัวตนได้</span>
              </div>
            </div>

            <div className="rp-iframe-wrap">
              <iframe
                src="https://script.google.com/macros/s/AKfycbw1WC39jTrxVQT2KxnnvOpjghgASzKZiZmOK_BmZwUfedxsmUQQy0ZqgRw8qlAnSBRr8w/exec"
                className="rp-iframe"
                frameBorder="0"
                title="แบบฟอร์มร้องเรียนและเสนอแนะ โรงพยาบาลหนองหาน"
                allowFullScreen
                scrolling="yes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════ */}
      <section className="rp-contact-section">
        <div className="rp-contact-bg" />
        <div className="rp-container rp-container--rel">
          <div className="rp-section-label rp-section-label--light">ช่องทางการติดต่อ</div>
          <h2 className="rp-section-title rp-section-title--light">ประสานงานกับโรงพยาบาลโดยตรง</h2>
          <p className="rp-contact-sub">กรณีฉุกเฉินหรือต้องการติดต่อเจ้าหน้าที่โดยตรง สามารถเลือกช่องทางด้านล่างได้ทันที</p>

          <div className="rp-contact-grid">
            <a href="tel:042-261135" className="rp-contact-card">
              <div className="rp-contact-card-icon rp-contact-card-icon--green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="rp-contact-card-text">
                <span className="rp-contact-card-lbl">เบอร์โทรศัพท์โรงพยาบาล</span>
                <span className="rp-contact-card-val">042-261135-6</span>
              </div>
              <div className="rp-contact-card-arrow">→</div>
            </a>

            <a href="tel:1669" className="rp-contact-card" style={{ border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.12)' }}>
              <div className="rp-contact-card-icon" style={{ background: 'rgba(239,68,68,0.25)', color: '#fca5a5' }}>
                🚨
              </div>
              <div className="rp-contact-card-text">
                <span className="rp-contact-card-lbl">แจ้งเหตุเจ็บป่วยฉุกเฉิน</span>
                <span className="rp-contact-card-val" style={{ color: '#fecaca', fontWeight: 800 }}>สายด่วน 1669 (ฟรี 24 ชม.)</span>
              </div>
              <div className="rp-contact-card-arrow">→</div>
            </a>

            <a href="https://www.facebook.com/nonghanhospital" target="_blank" rel="noopener noreferrer" className="rp-contact-card">
              <div className="rp-contact-card-icon rp-contact-card-icon--blue">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="rp-contact-card-text">
                <span className="rp-contact-card-lbl">Facebook เพจหลัก</span>
                <span className="rp-contact-card-val">โรงพยาบาลหนองหาน</span>
              </div>
              <div className="rp-contact-card-arrow">→</div>
            </a>
          </div>

          <div className="rp-footer-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            เวลาทำการศูนย์รับเรื่อง: วันจันทร์ – วันศุกร์ &nbsp;08:00 – 16:30 น. &nbsp;|&nbsp; ระบบออนไลน์รับแจ้งตลอด 24 ชั่วโมง
          </div>
        </div>
      </section>

      {/* ══════════════════════ STYLES ══════════════════════ */}
      <style>{`
        /* ── Imports ── */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700;800&family=Sarabun:wght@300;400;500;600;700&display=swap');

        /* ── Root ── */
        .rp-root {
          min-height: 100vh;
          font-family: 'Noto Sans Thai', 'Sarabun', sans-serif;
          background: #f0f7f4;
          color: #1a202c;
          overflow-x: hidden;
        }

        /* Top utility bar */
        .rp-topbar {
          background: #00241c;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 8px 16px;
        }
        .rp-topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
        }
        .rp-topbar-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a7ffe8;
          font-weight: 700;
        }
        .rp-topbar-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4bffcf;
          box-shadow: 0 0 8px #4bffcf;
        }
        .rp-topbar-links {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .rp-topbar-link {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .rp-topbar-link:hover {
          color: white;
        }
        .rp-topbar-link--btn {
          color: #00382b;
          background: #4bffcf;
          padding: 3px 12px;
          border-radius: 8px;
          font-weight: 800;
        }

        /* ══════════════════ HERO ══════════════════ */
        .rp-hero {
          position: relative;
          min-height: 600px;
          background: linear-gradient(145deg, #002d24 0%, #004d40 40%, #005C4B 75%, #00796b 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 90px 24px 130px;
          overflow: hidden;
          text-align: center;
        }

        /* Animated blobs */
        .rp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: blobFloat 8s ease-in-out infinite;
        }
        .rp-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #34d399, transparent);
          top: -200px; right: -100px;
          animation-delay: 0s;
        }
        .rp-blob-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #059669, transparent);
          bottom: -150px; left: -100px;
          animation-delay: -3s;
        }
        .rp-blob-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #0d9488, transparent);
          top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -5s;
        }
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        /* Grid overlay */
        .rp-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* Hero inner */
        .rp-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 780px;
          margin: 0 auto;
          animation: fadeSlideUp 0.8s ease both;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Badge */
        .rp-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(12px);
          color: #a7ffe8;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 6px 20px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .rp-badge-dot {
          width: 8px; height: 8px;
          background: #4bffcf;
          border-radius: 50%;
          box-shadow: 0 0 10px #4bffcf;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        /* Hero icon */
        .rp-hero-icon-wrap {
          position: relative;
          width: 90px; height: 90px;
          margin: 0 auto 24px;
        }
        .rp-hero-icon-ring {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 1px solid rgba(75,255,207,0.25);
          animation: ringPulse 3s ease-in-out infinite;
        }
        .rp-hero-icon-ring--2 {
          inset: -20px;
          border-color: rgba(75,255,207,0.12);
          animation-delay: -1s;
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.5; }
        }
        .rp-hero-icon {
          width: 90px; height: 90px;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.06));
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 26px;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 30px rgba(0,40,30,0.3), inset 0 1px 0 rgba(255,255,255,0.3);
        }
        .rp-hero-icon svg { width: 44px; height: 44px; color: #a7ffe8; }

        /* Hero text */
        .rp-hero-title {
          font-size: clamp(2rem, 5.5vw, 3.4rem);
          font-weight: 900;
          color: white;
          margin: 0 0 10px;
          line-height: 1.15;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }
        .rp-hero-sub {
          font-size: 1.05rem;
          color: #a7ffe8;
          margin: 0 0 16px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        .rp-hero-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.85);
          line-height: 1.75;
          margin: 0 auto 32px;
          max-width: 620px;
        }

        .rp-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 26px;
          background: linear-gradient(135deg, #4bffcf, #34d399);
          color: #00382b;
          font-size: 1rem;
          font-weight: 800;
          border-radius: 14px;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(52,211,153,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .rp-hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(52,211,153,0.45);
        }
        .rp-hero-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.25);
          color: white;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 14px;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: background 0.2s;
        }
        .rp-hero-cta-secondary:hover {
          background: rgba(255,255,255,0.2);
        }

        /* Stats */
        .rp-stats {
          display: inline-flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          justify-content: center;
          background: rgba(0,35,27,0.35);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 18px 32px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .rp-stat { text-align: center; }
        .rp-stat-num {
          display: block;
          font-size: 1.15rem;
          font-weight: 800;
          color: white;
        }
        .rp-stat-lbl {
          display: block;
          font-size: 0.74rem;
          color: rgba(200,255,240,0.8);
          margin-top: 2px;
        }
        .rp-stat-sep {
          width: 1px; height: 38px;
          background: rgba(255,255,255,0.18);
        }

        /* Wave */
        .rp-wave {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 90px;
        }
        .rp-wave svg { width: 100%; height: 100%; }

        /* ══════════════════ SHARED ══════════════════ */
        .rp-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .rp-container--rel { position: relative; z-index: 2; }

        .rp-section-label {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #005C4B;
          background: #e6f7f2;
          border: 1px solid #bbf7d0;
          padding: 5px 16px;
          border-radius: 100px;
          margin-bottom: 14px;
        }
        .rp-section-label--light {
          color: #a7ffe8;
          background: rgba(167,255,232,0.15);
          border-color: rgba(167,255,232,0.3);
        }
        .rp-section-title {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 40px;
          letter-spacing: -0.01em;
        }
        .rp-section-title--light { color: white; }

        /* ══════════════════ CARDS SECTION ══════════════════ */
        .rp-cards-section {
          padding: 60px 0 52px;
          background: #f0f7f4;
          text-align: center;
        }
        .rp-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 22px;
          text-align: left;
        }
        .rp-card {
          position: relative;
          background: white;
          border-radius: 22px;
          padding: 32px 26px;
          overflow: hidden;
          border: 1px solid rgba(0, 92, 75, 0.08);
          box-shadow: 0 4px 20px rgba(0, 92, 75, 0.04);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .rp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0, 92, 75, 0.1);
        }
        .rp-card--complaint:hover { border-color: rgba(239,68,68,0.3); }
        .rp-card--suggest:hover   { border-color: rgba(0,121,107,0.3); }
        .rp-card--rights:hover    { border-color: rgba(13,148,136,0.3); }
        .rp-card--praise:hover    { border-color: rgba(217,119,6,0.3); }

        .rp-card-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          border-radius: 22px 22px 0 0;
        }
        .rp-card--complaint .rp-card-glow { background: linear-gradient(90deg, #ef4444, #f97316); }
        .rp-card--suggest   .rp-card-glow { background: linear-gradient(90deg, #00796b, #10b981); }
        .rp-card--rights    .rp-card-glow { background: linear-gradient(90deg, #0d9488, #06b6d4); }
        .rp-card--praise    .rp-card-glow { background: linear-gradient(90deg, #d97706, #fbbf24); }

        .rp-card-icon-wrap {
          width: 54px; height: 54px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
        }
        .rp-card-icon-wrap svg { width: 28px; height: 28px; }
        .rp-card--complaint .rp-card-icon-wrap { background: #fef2f2; color: #dc2626; }
        .rp-card--suggest   .rp-card-icon-wrap { background: #f0fdfa; color: #00796b; }
        .rp-card--rights    .rp-card-icon-wrap { background: #f0fdf4; color: #0d9488; }
        .rp-card--praise    .rp-card-icon-wrap { background: #fffbeb; color: #d97706; }

        .rp-card-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 10px;
        }
        .rp-card-desc {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.7;
          margin: 0 0 18px;
        }
        .rp-card-tag {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
        }
        .rp-card--complaint .rp-card-tag { background: #fef2f2; color: #dc2626; }
        .rp-card--suggest   .rp-card-tag { background: #f0fdfa; color: #00796b; }
        .rp-card--rights    .rp-card-tag { background: #f0fdf4; color: #0d9488; }
        .rp-card--praise    .rp-card-tag { background: #fffbeb; color: #d97706; }

        /* ══════════════════ STEPS SECTION ══════════════════ */
        .rp-steps-section {
          padding: 56px 0 64px;
          background: white;
          text-align: center;
          border-top: 1px solid rgba(0, 92, 75, 0.08);
          border-bottom: 1px solid rgba(0, 92, 75, 0.08);
        }
        .rp-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .rp-step {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #fbfdfc;
          border: 1.5px solid #dcfce7;
          border-radius: 16px;
          padding: 18px 22px;
          min-width: 190px;
          text-align: left;
          transition: all 0.25s ease;
        }
        .rp-step:hover {
          background: #f0fdf4;
          border-color: #005C4B;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 92, 75, 0.08);
        }
        .rp-step-num {
          font-size: 1.4rem;
          font-weight: 900;
          color: #005C4B;
          line-height: 1;
        }
        .rp-step-body h4 {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 3px;
        }
        .rp-step-body p {
          font-size: 0.76rem;
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }
        .rp-step-arrow {
          font-size: 1.3rem;
          color: #a7f3d0;
          font-weight: 300;
        }

        /* ══════════════════ FORM SECTION ══════════════════ */
        .rp-form-section {
          padding: 56px 0 72px;
          background: #f0f7f4;
        }
        .rp-notice {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 14px;
          padding: 16px 22px;
          margin-bottom: 28px;
          font-size: 0.88rem;
          color: #065f46;
          line-height: 1.6;
        }
        .rp-notice-icon {
          flex-shrink: 0;
          width: 36px; height: 36px;
          background: #005C4B;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: white;
        }
        .rp-notice-icon svg { width: 20px; height: 20px; }

        .rp-form-card {
          background: white;
          border-radius: 26px;
          box-shadow: 0 20px 50px rgba(0, 45, 36, 0.06);
          overflow: hidden;
          border: 1px solid rgba(0, 92, 75, 0.1);
        }
        .rp-form-header {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          padding: 30px 36px;
          background: linear-gradient(135deg, #002d24 0%, #004d40 60%, #005C4B 100%);
          position: relative;
          overflow: hidden;
        }
        .rp-form-header::before {
          content: '';
          position: absolute;
          right: -80px; top: -120px;
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(75,255,207,0.12) 0%, transparent 60%);
        }
        .rp-form-header-icon {
          width: 52px; height: 52px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 15px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative; z-index: 1;
        }
        .rp-form-header-icon svg { width: 26px; height: 26px; color: #a7ffe8; }
        .rp-form-header > div:nth-child(2) {
          flex: 1;
          position: relative; z-index: 1;
        }
        .rp-form-header h2 {
          font-size: 1.35rem;
          font-weight: 800;
          color: white;
          margin: 0 0 4px;
        }
        .rp-form-header p {
          font-size: 0.85rem;
          color: rgba(200,255,240,0.85);
          margin: 0;
        }
        .rp-form-header-badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          position: relative; z-index: 1;
        }
        .rp-badge-sm {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 100px;
        }
        .rp-badge-sm--safe { background: rgba(52,211,153,0.22); color: #a7ffe8; border: 1px solid rgba(52,211,153,0.3); }
        .rp-badge-sm--anon { background: rgba(251,191,36,0.2); color: #fde68a; border: 1px solid rgba(251,191,36,0.3); }

        .rp-iframe-wrap { background: white; }
        .rp-iframe {
          width: 100%;
          height: 920px;
          border: none;
          display: block;
        }

        /* ══════════════════ CONTACT SECTION ══════════════════ */
        .rp-contact-section {
          position: relative;
          padding: 72px 0 56px;
          text-align: center;
          overflow: hidden;
        }
        .rp-contact-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #00241c 0%, #00382b 50%, #004d40 100%);
        }
        .rp-contact-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .rp-contact-sub {
          color: rgba(200,255,240,0.8);
          font-size: 0.95rem;
          margin: -24px 0 42px;
        }
        .rp-contact-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          justify-content: center;
        }
        .rp-contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(14px);
          border-radius: 18px;
          padding: 20px 24px;
          text-decoration: none;
          color: white;
          min-width: 260px;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .rp-contact-card:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(0,0,0,0.25);
        }

        .rp-contact-card-icon {
          width: 48px; height: 48px;
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rp-contact-card-icon svg { width: 24px; height: 24px; }
        .rp-contact-card-icon--green { background: rgba(52,211,153,0.22); color: #4bffcf; }
        .rp-contact-card-icon--blue  { background: rgba(59,130,246,0.22); color: #93c5fd; }

        .rp-contact-card-text {
          display: flex; flex-direction: column; flex: 1; text-align: left;
        }
        .rp-contact-card-lbl {
          font-size: 0.72rem;
          color: rgba(200,255,240,0.7);
          font-weight: 500;
          letter-spacing: 0.02em;
          margin-bottom: 2px;
        }
        .rp-contact-card-val {
          font-size: 0.94rem;
          font-weight: 700;
          color: white;
        }
        .rp-contact-card-arrow {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.4);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .rp-contact-card:hover .rp-contact-card-arrow {
          transform: translateX(4px);
          color: #4bffcf;
        }

        .rp-footer-note {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 40px;
          font-size: 0.8rem;
          color: rgba(200,255,240,0.65);
        }

        /* ══════════════════ RESPONSIVE ══════════════════ */
        @media (max-width: 768px) {
          .rp-hero { padding: 70px 20px 110px; }
          .rp-stats { padding: 14px 20px; gap: 14px; }
          .rp-stat-sep { display: none; }
          .rp-steps { flex-direction: column; align-items: stretch; }
          .rp-step-arrow { display: none; }
          .rp-step { min-width: unset; }
          .rp-form-header { padding: 22px 18px; }
          .rp-form-header-badges { display: none; }
          .rp-iframe { height: 1100px; }
          .rp-contact-card { min-width: 100%; }
          .rp-cards-grid { grid-template-columns: 1fr; }
          .rp-section-title { margin-bottom: 28px; }
        }
        @media (max-width: 480px) {
          .rp-hero-title { font-size: 1.85rem; }
          .rp-form-header h2 { font-size: 1.1rem; }
          .rp-notice { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
}
