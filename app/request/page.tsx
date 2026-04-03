'use client';

export const dynamic = 'force-static';

export default function RequestPage() {
  return (
    <div className="rp-root">
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
            ศูนย์รับเรื่องร้องเรียนและเสนอแนะ
          </div>

          {/* Icon */}
          <div className="rp-hero-icon-wrap">
            <div className="rp-hero-icon-ring" />
            <div className="rp-hero-icon-ring rp-hero-icon-ring--2" />
            <div className="rp-hero-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
          </div>

          <h1 className="rp-hero-title">ร้องเรียนและเสนอแนะ</h1>
          <p className="rp-hero-sub">โรงพยาบาลหนองหาน &nbsp;·&nbsp; จังหวัดอุดรธานี</p>
          <p className="rp-hero-desc">
            เราพร้อมรับฟังทุกเสียงของท่าน เพื่อพัฒนาคุณภาพการบริการ<br />
            ให้ดียิ่งขึ้นอย่างต่อเนื่องและโปร่งใส
          </p>

          {/* Stats row */}
          <div className="rp-stats">
            <div className="rp-stat">
              <span className="rp-stat-num">24 ชม.</span>
              <span className="rp-stat-lbl">ตอบสนองภายใน</span>
            </div>
            <div className="rp-stat-sep" />
            <div className="rp-stat">
              <span className="rp-stat-num">100%</span>
              <span className="rp-stat-lbl">ปลอดภัย</span>
            </div>
            <div className="rp-stat-sep" />
            <div className="rp-stat">
              <span className="rp-stat-num">ไม่ระบุตัวตน</span>
              <span className="rp-stat-lbl">ได้หากต้องการ</span>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="rp-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z" fill="#f0f4f8" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INFO CARDS
      ══════════════════════════════════════ */}
      <section className="rp-cards-section">
        <div className="rp-container">
          <div className="rp-section-label">ประเภทเรื่องที่รับ</div>
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
              <p className="rp-card-desc">แจ้งปัญหาการบริการ พฤติกรรมการให้บริการ หรือสิ่งที่ไม่เป็นไปตามมาตรฐานที่กำหนด</p>
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
              <p className="rp-card-desc">แบ่งปันความคิดเห็นและข้อเสนอแนะเพื่อพัฒนาคุณภาพ การให้บริการของโรงพยาบาล</p>
              <div className="rp-card-tag">Suggestion</div>
            </div>

            {/* Card 3 */}
            <div className="rp-card rp-card--praise">
              <div className="rp-card-glow" />
              <div className="rp-card-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="rp-card-title">ชมเชย</h3>
              <p className="rp-card-desc">ยกย่องบุคลากรที่มีจิตบริการและการให้บริการที่ดีเยี่ยม เพื่อเป็นกำลังใจในการปฏิบัติงาน</p>
              <div className="rp-card-tag">Compliment</div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROCESS STEPS
      ══════════════════════════════════════ */}
      <section className="rp-steps-section">
        <div className="rp-container">
          <div className="rp-section-label">ขั้นตอนการดำเนินการ</div>
          <h2 className="rp-section-title">กระบวนการรับเรื่อง</h2>
          <div className="rp-steps">
            <div className="rp-step">
              <div className="rp-step-num">01</div>
              <div className="rp-step-body">
                <h4>ยื่นเรื่อง</h4>
                <p>กรอกแบบฟอร์มออนไลน์หรือยื่นโดยตรง</p>
              </div>
            </div>
            <div className="rp-step-arrow">→</div>
            <div className="rp-step">
              <div className="rp-step-num">02</div>
              <div className="rp-step-body">
                <h4>ตรวจสอบ</h4>
                <p>ทีมงานรับและตรวจสอบความครบถ้วน</p>
              </div>
            </div>
            <div className="rp-step-arrow">→</div>
            <div className="rp-step">
              <div className="rp-step-num">03</div>
              <div className="rp-step-body">
                <h4>ดำเนินการ</h4>
                <p>ส่งต่อหน่วยงานที่เกี่ยวข้องแก้ไข</p>
              </div>
            </div>
            <div className="rp-step-arrow">→</div>
            <div className="rp-step">
              <div className="rp-step-num">04</div>
              <div className="rp-step-body">
                <h4>แจ้งผล</h4>
                <p>แจ้งผลการดำเนินการภายใน 15 วัน</p>
              </div>
            </div>
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
            <p>ข้อมูลของท่านจะถูกเก็บรักษาไว้เป็นความลับอย่างเคร่งครัดตามมาตรฐานการคุ้มครองข้อมูลส่วนบุคคล</p>
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
                <h2>กรอกแบบฟอร์มออนไลน์</h2>
                <p>สามารถระบุตัวตนหรือไม่ก็ได้ ข้อมูลทุกอย่างปลอดภัย</p>
              </div>
              <div className="rp-form-header-badges">
                <span className="rp-badge-sm rp-badge-sm--safe">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  เข้ารหัส SSL
                </span>
                <span className="rp-badge-sm rp-badge-sm--anon">ไม่ระบุตัวตนได้</span>
              </div>
            </div>

            <div className="rp-iframe-wrap">
              <iframe
                src="https://script.google.com/macros/s/AKfycby-JuW0klvr5MwG5xeqJm7dEGcDswArcGF3U82bRIq0xfxnOYWDfBtT8z7SEDjvXsjQiQ/exec"
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
          <div className="rp-section-label rp-section-label--light">ติดต่อเรา</div>
          <h2 className="rp-section-title rp-section-title--light">ช่องทางติดต่ออื่น ๆ</h2>
          <p className="rp-contact-sub">หากต้องการติดต่อโดยตรง สามารถใช้ช่องทางด้านล่างได้เลย</p>

          <div className="rp-contact-grid">
            <a href="tel:042-391030" className="rp-contact-card">
              <div className="rp-contact-card-icon rp-contact-card-icon--green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="rp-contact-card-text">
                <span className="rp-contact-card-lbl">โทรศัพท์</span>
                <span className="rp-contact-card-val">042-391030</span>
              </div>
              <div className="rp-contact-card-arrow">→</div>
            </a>

            <a href="https://www.facebook.com/nhhospital" target="_blank" rel="noopener noreferrer" className="rp-contact-card">
              <div className="rp-contact-card-icon rp-contact-card-icon--blue">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="rp-contact-card-text">
                <span className="rp-contact-card-lbl">Facebook</span>
                <span className="rp-contact-card-val">โรงพยาบาลหนองหาน</span>
              </div>
              <div className="rp-contact-card-arrow">→</div>
            </a>

            <div className="rp-contact-card rp-contact-card--static">
              <div className="rp-contact-card-icon rp-contact-card-icon--teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="rp-contact-card-text">
                <span className="rp-contact-card-lbl">ที่อยู่</span>
                <span className="rp-contact-card-val">ต.หนองหาน อ.หนองหาน จ.อุดรธานี</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="rp-footer-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            เวลาทำการ จันทร์–ศุกร์ &nbsp;08:00–16:30 น. &nbsp;|&nbsp; ไม่รวมวันหยุดนักขัตฤกษ์
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
          background: #f0f4f8;
          color: #1a202c;
          overflow-x: hidden;
        }

        /* ══════════════════ HERO ══════════════════ */
        .rp-hero {
          position: relative;
          min-height: 640px;
          background: linear-gradient(135deg, #0c3b6e 0%, #1565a8 40%, #0e8aba 80%, #06bfb4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px 140px;
          overflow: hidden;
          text-align: center;
        }

        /* Animated blobs */
        .rp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.35;
          animation: blobFloat 8s ease-in-out infinite;
        }
        .rp-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, #4fc3f7, transparent);
          top: -200px; right: -100px;
          animation-delay: 0s;
        }
        .rp-blob-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #06bfb4, transparent);
          bottom: -150px; left: -100px;
          animation-delay: -3s;
        }
        .rp-blob-3 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #818cf8, transparent);
          top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -5s;
        }
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .rp-blob-3 {
          animation: blobFloat3 8s ease-in-out infinite;
          animation-delay: -5s;
        }
        @keyframes blobFloat3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, calc(-50% - 20px)) scale(1.08); }
        }

        /* Grid overlay */
        .rp-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Hero inner */
        .rp-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin: 0 auto;
          animation: fadeSlideUp 0.8s ease both;
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
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
          color: #b3f0ff;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 6px 18px;
          border-radius: 100px;
          margin-bottom: 32px;
        }
        .rp-badge-dot {
          width: 7px; height: 7px;
          background: #4bffea;
          border-radius: 50%;
          box-shadow: 0 0 8px #4bffea;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        /* Hero icon */
        .rp-hero-icon-wrap {
          position: relative;
          width: 100px; height: 100px;
          margin: 0 auto 28px;
        }
        .rp-hero-icon-ring {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          animation: ringPulse 3s ease-in-out infinite;
        }
        .rp-hero-icon-ring--2 {
          inset: -24px;
          border-color: rgba(255,255,255,0.08);
          animation-delay: -1s;
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.5; }
        }
        .rp-hero-icon {
          width: 100px; height: 100px;
          background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08));
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 28px;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3);
        }
        .rp-hero-icon svg { width: 48px; height: 48px; color: white; }

        /* Hero text */
        .rp-hero-title {
          font-size: clamp(2.2rem, 6vw, 4rem);
          font-weight: 800;
          color: white;
          margin: 0 0 12px;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 24px rgba(0,0,0,0.25);
        }
        .rp-hero-sub {
          font-size: 1.1rem;
          color: rgba(180,235,255,0.9);
          margin: 0 0 20px;
          font-weight: 400;
          letter-spacing: 0.02em;
        }
        .rp-hero-desc {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.8;
          margin: 0 auto 44px;
          max-width: 580px;
        }

        /* Stats */
        .rp-stats {
          display: inline-flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          justify-content: center;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 22px 36px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        .rp-stat { text-align: center; }
        .rp-stat-num {
          display: block;
          font-size: 1.15rem;
          font-weight: 700;
          color: white;
          letter-spacing: -0.01em;
        }
        .rp-stat-lbl {
          display: block;
          font-size: 0.75rem;
          color: rgba(200,240,255,0.7);
          margin-top: 3px;
        }
        .rp-stat-sep {
          width: 1px; height: 44px;
          background: rgba(255,255,255,0.2);
        }

        /* Wave */
        .rp-wave {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 120px;
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
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #1565a8;
          background: rgba(21,101,168,0.1);
          border: 1px solid rgba(21,101,168,0.2);
          padding: 4px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .rp-section-label--light {
          color: #7dd3f8;
          background: rgba(125,211,248,0.15);
          border-color: rgba(125,211,248,0.25);
        }
        .rp-section-title {
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 48px;
          letter-spacing: -0.02em;
        }
        .rp-section-title--light { color: white; }

        /* ══════════════════ CARDS SECTION ══════════════════ */
        .rp-cards-section {
          padding: 72px 0 56px;
          background: #f0f4f8;
          text-align: center;
        }
        .rp-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
          text-align: left;
        }
        .rp-card {
          position: relative;
          background: white;
          border-radius: 24px;
          padding: 36px 32px;
          overflow: hidden;
          border: 1px solid transparent;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .rp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.12);
        }
        .rp-card--complaint:hover { border-color: rgba(239,68,68,0.25); }
        .rp-card--suggest:hover   { border-color: rgba(14,148,136,0.25); }
        .rp-card--praise:hover    { border-color: rgba(250,204,21,0.35); }

        /* Card glow strip at top */
        .rp-card-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          border-radius: 24px 24px 0 0;
        }
        .rp-card--complaint .rp-card-glow { background: linear-gradient(90deg, #ef4444, #f97316); }
        .rp-card--suggest   .rp-card-glow { background: linear-gradient(90deg, #0ea5e9, #0d9488); }
        .rp-card--praise    .rp-card-glow { background: linear-gradient(90deg, #f59e0b, #fbbf24); }

        .rp-card-icon-wrap {
          width: 60px; height: 60px;
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .rp-card-icon-wrap svg { width: 30px; height: 30px; }
        .rp-card--complaint .rp-card-icon-wrap { background: #fef2f2; color: #ef4444; }
        .rp-card--suggest   .rp-card-icon-wrap { background: #f0fdf9; color: #0d9488; }
        .rp-card--praise    .rp-card-icon-wrap { background: #fffbeb; color: #d97706; }

        .rp-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 12px;
        }
        .rp-card-desc {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.75;
          margin: 0 0 20px;
        }
        .rp-card-tag {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
        }
        .rp-card--complaint .rp-card-tag { background: #fef2f2; color: #ef4444; }
        .rp-card--suggest   .rp-card-tag { background: #f0fdf9; color: #0d9488; }
        .rp-card--praise    .rp-card-tag { background: #fffbeb; color: #d97706; }

        /* ══════════════════ STEPS SECTION ══════════════════ */
        .rp-steps-section {
          padding: 56px 0 64px;
          background: white;
          text-align: center;
          border-top: 1px solid #e8edf5;
          border-bottom: 1px solid #e8edf5;
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
          background: #f8faff;
          border: 1px solid #e2e8f8;
          border-radius: 16px;
          padding: 20px 24px;
          min-width: 180px;
          text-align: left;
          transition: all 0.3s ease;
        }
        .rp-step:hover {
          background: #eef2ff;
          border-color: #1565a8;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(21,101,168,0.12);
        }
        .rp-step-num {
          font-size: 1.4rem;
          font-weight: 800;
          color: #1565a8;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .rp-step-body h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 4px;
        }
        .rp-step-body p {
          font-size: 0.78rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }
        .rp-step-arrow {
          font-size: 1.4rem;
          color: #94a3b8;
          font-weight: 300;
        }

        /* ══════════════════ FORM SECTION ══════════════════ */
        .rp-form-section {
          padding: 64px 0 80px;
          background: #f0f4f8;
        }
        .rp-notice {
          display: flex;
          align-items: center;
          gap: 14px;
          background: linear-gradient(135deg, #eff6ff, #e0f2fe);
          border: 1px solid #bfdbfe;
          border-radius: 14px;
          padding: 16px 24px;
          margin-bottom: 32px;
          font-size: 0.88rem;
          color: #1e40af;
          line-height: 1.6;
        }
        .rp-notice-icon {
          flex-shrink: 0;
          width: 36px; height: 36px;
          background: #1565a8;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: white;
        }
        .rp-notice-icon svg { width: 20px; height: 20px; }

        .rp-form-card {
          background: white;
          border-radius: 28px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.08);
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .rp-form-header {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          padding: 32px 40px;
          background: linear-gradient(135deg, #0c3b6e 0%, #1565a8 60%, #0e8aba 100%);
          position: relative;
          overflow: hidden;
        }
        .rp-form-header::before {
          content: '';
          position: absolute;
          right: -80px; top: -120px;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%);
        }
        .rp-form-header-icon {
          width: 56px; height: 56px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative; z-index: 1;
          backdrop-filter: blur(8px);
        }
        .rp-form-header-icon svg { width: 28px; height: 28px; color: white; }
        .rp-form-header > div:nth-child(2) {
          flex: 1;
          position: relative; z-index: 1;
        }
        .rp-form-header h2 {
          font-size: 1.4rem;
          font-weight: 800;
          color: white;
          margin: 0 0 6px;
        }
        .rp-form-header p {
          font-size: 0.88rem;
          color: rgba(200,235,255,0.85);
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
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 100px;
        }
        .rp-badge-sm--safe { background: rgba(74,222,128,0.25); color: #bbf7d0; border: 1px solid rgba(74,222,128,0.3); }
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
          padding: 80px 0 60px;
          text-align: center;
          overflow: hidden;
        }
        .rp-contact-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #0c3b6e 0%, #1565a8 50%, #0e8aba 100%);
        }
        .rp-contact-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .rp-contact-sub {
          color: rgba(180,230,255,0.8);
          font-size: 1rem;
          margin: -28px 0 48px;
        }
        .rp-contact-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .rp-contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 22px 28px;
          text-decoration: none;
          color: white;
          min-width: 260px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .rp-contact-card:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.25);
        }
        .rp-contact-card--static { cursor: default; }
        .rp-contact-card--static:hover { transform: none; box-shadow: none; }

        .rp-contact-card-icon {
          width: 50px; height: 50px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rp-contact-card-icon svg { width: 24px; height: 24px; }
        .rp-contact-card-icon--green { background: rgba(52,211,153,0.25); color: #5eead4; }
        .rp-contact-card-icon--blue  { background: rgba(96,165,250,0.25); color: #93c5fd; }
        .rp-contact-card-icon--teal  { background: rgba(45,212,191,0.25); color: #67e8f9; }

        .rp-contact-card-text {
          display: flex; flex-direction: column; flex: 1;
        }
        .rp-contact-card-lbl {
          font-size: 0.72rem;
          color: rgba(180,230,255,0.7);
          font-weight: 500;
          letter-spacing: 0.04em;
          margin-bottom: 3px;
        }
        .rp-contact-card-val {
          font-size: 0.95rem;
          font-weight: 600;
          color: white;
        }
        .rp-contact-card-arrow {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.5);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .rp-contact-card:hover .rp-contact-card-arrow {
          transform: translateX(4px);
          color: white;
        }

        .rp-footer-note {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 48px;
          font-size: 0.82rem;
          color: rgba(180,220,255,0.65);
        }

        /* ══════════════════ RESPONSIVE ══════════════════ */
        @media (max-width: 768px) {
          .rp-hero { padding: 80px 20px 120px; min-height: unset; }
          .rp-stats { padding: 16px 24px; gap: 16px; }
          .rp-stat-sep { display: none; }
          .rp-steps { flex-direction: column; align-items: stretch; }
          .rp-step-arrow { display: none; }
          .rp-step { min-width: unset; }
          .rp-form-header { padding: 24px 20px; }
          .rp-form-header-badges { display: none; }
          .rp-iframe { height: 1100px; }
          .rp-contact-card { min-width: 100%; }
          .rp-cards-grid { grid-template-columns: 1fr; }
          .rp-section-title { margin-bottom: 32px; }
        }
        @media (max-width: 480px) {
          .rp-hero-title { font-size: 2rem; }
          .rp-form-header h2 { font-size: 1.1rem; }
          .rp-notice { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
}
