'use client';

import Link from 'next/link';

export const dynamic = 'force-static';

export default function RequestPage() {
  return (
    <div className="request-page">
      {/* Hero Banner */}
      <section className="request-hero">
        <div className="request-hero-overlay" />
        <div className="request-hero-content">
          <div className="request-hero-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <div className="request-hero-badge">ศูนย์รับเรื่อง</div>
          <h1 className="request-hero-title">ร้องเรียนและเสนอแนะ</h1>
          <p className="request-hero-subtitle">โรงพยาบาลหนองหาน จังหวัดอุดรธานี</p>
          <p className="request-hero-desc">
            เราพร้อมรับฟังทุกข้อเสนอแนะและข้อร้องเรียนของท่าน <br />
            เพื่อพัฒนาการบริการให้ดียิ่งขึ้น
          </p>
          <div className="request-hero-stats">
            <div className="stat-item">
              <span className="stat-number">24 ชม.</span>
              <span className="stat-label">ตอบสนองภายใน</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">ปลอดภัย</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">ไม่ระบุตัวตน</span>
              <span className="stat-label">ได้หากต้องการ</span>
            </div>
          </div>
        </div>
        <div className="request-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Info Cards */}
      <section className="request-info-section">
        <div className="request-container">
          <div className="info-cards-grid">
            <div className="info-card info-card--blue">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-2.215-.601-4.288-1.643-6.065M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3>เรื่องร้องเรียน</h3>
              <p>แจ้งปัญหาการบริการ พฤติกรรมบริการ หรือสิ่งที่ไม่เป็นไปตามมาตรฐาน</p>
            </div>
            <div className="info-card info-card--teal">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3>ข้อเสนอแนะ</h3>
              <p>แบ่งปันความคิดเห็นและข้อเสนอแนะเพื่อพัฒนาคุณภาพการให้บริการ</p>
            </div>
            <div className="info-card info-card--purple">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3>ชมเชย</h3>
              <p>ยกย่องการบริการที่ดี บุคลากรที่มีจิตบริการ เพื่อเป็นกำลังใจในการปฏิบัติงาน</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="request-form-section">
        <div className="request-container">
          <div className="form-wrapper">
            <div className="form-header">
              <div className="form-header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
              <div>
                <h2>กรอกแบบฟอร์ม</h2>
                <p>ข้อมูลของท่านจะถูกเก็บรักษาไว้เป็นความลับ</p>
              </div>
            </div>
            <div className="google-form-container">
              <iframe
                src="https://script.google.com/macros/s/AKfycby-JuW0klvr5MwG5xeqJm7dEGcDswArcGF3U82bRIq0xfxnOYWDfBtT8z7SEDjvXsjQiQ/exec"
                className="google-form-iframe"
                frameBorder="0"
                title="แบบฟอร์มร้องเรียนและเสนอแนะ"
                allowFullScreen
                scrolling="yes"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="request-contact-section">
        <div className="request-container">
          <h2 className="contact-title">ช่องทางติดต่ออื่น ๆ</h2>
          <p className="contact-subtitle">หากต้องการติดต่อโดยตรง สามารถใช้ช่องทางด้านล่างได้เลย</p>
          <div className="contact-cards">
            <a href="tel:042-391030" className="contact-card">
              <div className="contact-card-icon contact-card-icon--green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-card-label">โทรศัพท์</span>
                <span className="contact-card-value">042-391030</span>
              </div>
            </a>
            <a href="https://www.facebook.com/nhhospital" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-card-icon contact-card-icon--blue">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-card-label">Facebook</span>
                <span className="contact-card-value">โรงพยาบาลหนองหาน</span>
              </div>
            </a>
            <div className="contact-card">
              <div className="contact-card-icon contact-card-icon--teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="contact-card-info">
                <span className="contact-card-label">ที่อยู่</span>
                <span className="contact-card-value">ต.หนองหาน อ.หนองหาน จ.อุดรธานี</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .request-page {
          min-height: 100vh;
          font-family: 'Noto Sans Thai', 'Sarabun', sans-serif;
        }

        /* Hero */
        .request-hero {
          position: relative;
          background: linear-gradient(135deg, #1e6c93 0%, #0d4a6b 40%, #0a3552 100%);
          padding: 80px 20px 100px;
          overflow: hidden;
          text-align: center;
        }
        .request-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(100,200,255,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(34,110,147,0.3) 0%, transparent 50%);
        }
        .request-hero-overlay {
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .request-hero-content {
          position: relative;
          z-index: 1;
          max-width: 700px;
          margin: 0 auto;
        }
        .request-hero-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
        }
        .request-hero-icon svg {
          width: 40px;
          height: 40px;
          color: white;
        }
        .request-hero-badge {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          color: #a8dfff;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 30px;
          margin-bottom: 16px;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .request-hero-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          color: white;
          margin: 0 0 12px;
          line-height: 1.1;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        .request-hero-subtitle {
          font-size: 1.25rem;
          color: #e0f2fe;
          margin: 0 0 24px;
          font-weight: 500;
        }
        .request-hero-desc {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.85);
          line-height: 1.7;
          margin: 0 0 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .request-hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 16px;
          padding: 20px 32px;
          display: inline-flex;
        }
        .stat-item { text-align: center; }
        .stat-number {
          display: block;
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
        }
        .stat-label {
          display: block;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.65);
          margin-top: 2px;
        }
        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.2);
        }
        .request-hero-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
        }
        .request-hero-wave svg {
          width: 100%;
          height: 100%;
        }

        /* Info Cards */
        .request-info-section {
          padding: 60px 20px 40px;
          background: white;
        }
        .request-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .info-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .info-card {
          padding: 32px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .info-card--blue { background: linear-gradient(135deg, #e8f4fd, #cce7f7); }
        .info-card--teal { background: linear-gradient(135deg, #e0f7f4, #b2ede6); }
        .info-card--purple { background: linear-gradient(135deg, #f3e8ff, #e0c3fc); }
        .info-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .info-card--blue .info-card-icon { background: #1e6c93; color: white; }
        .info-card--teal .info-card-icon { background: #0d9488; color: white; }
        .info-card--purple .info-card-icon { background: #7c3aed; color: white; }
        .info-card-icon svg { width: 28px; height: 28px; color: white; }
        .info-card h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1a202c;
          margin: 0 0 10px;
        }
        .info-card p {
          font-size: 0.9rem;
          color: #4a5568;
          line-height: 1.7;
          margin: 0;
        }

        /* Form Section */
        .request-form-section {
          padding: 40px 20px 80px;
          background: #f8fafc;
        }
        .form-wrapper {
          background: white;
          border-radius: 28px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          overflow: hidden;
          border: 1px solid rgba(226, 232, 240, 0.8);
          position: relative;
        }
        .form-header {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 32px 40px;
          background: linear-gradient(135deg, #1e6c93 0%, #174b6a 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }
        .form-header::after {
          content: '';
          position: absolute;
          right: -50px;
          top: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
          border-radius: 50%;
        }
        .form-header-icon {
          width: 56px;
          height: 56px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 1;
        }
        .form-header-icon svg { width: 30px; height: 30px; color: white; }
        .form-header h2 {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 6px;
          z-index: 1;
          position: relative;
        }
        .form-header p {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.8);
          margin: 0;
          z-index: 1;
          position: relative;
        }
        .google-form-container {
          padding: 0;
          background: white;
        }
        .google-form-iframe {
          width: 100%;
          height: 900px;
          border: none;
          display: block;
        }

        /* Contact Section */
        .request-contact-section {
          padding: 60px 20px;
          background: white;
          border-top: 1px solid #e2e8f0;
        }
        .contact-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a202c;
          text-align: center;
          margin: 0 0 8px;
        }
        .contact-subtitle {
          text-align: center;
          color: #718096;
          margin: 0 0 40px;
          font-size: 1rem;
        }
        .contact-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }
        .contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px 28px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          min-width: 240px;
        }
        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border-color: #1e6c93;
        }
        .contact-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .contact-card-icon svg { width: 24px; height: 24px; }
        .contact-card-icon--green { background: #d1fae5; color: #059669; }
        .contact-card-icon--blue { background: #dbeafe; color: #1d4ed8; }
        .contact-card-icon--teal { background: #ccfbf1; color: #0d9488; }
        .contact-card-info { display: flex; flex-direction: column; }
        .contact-card-label { font-size: 0.75rem; color: #718096; font-weight: 500; }
        .contact-card-value { font-size: 0.95rem; color: #1a202c; font-weight: 600; margin-top: 2px; }

        @media (max-width: 640px) {
          .request-hero { padding: 60px 16px 80px; }
          .request-hero-stats { padding: 16px 20px; gap: 16px; }
          .stat-divider { display: none; }
          .form-header { padding: 20px 20px; }
          .google-form-iframe { height: 1100px; }
          .contact-card { min-width: 100%; }
        }
      `}</style>
    </div>
  );
}
