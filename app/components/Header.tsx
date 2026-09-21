'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  return (
    <header className="w-full bg-white relative z-50 font-sans shadow-sm">
      {/* Top Utility Bar — hidden on small screens */}
      <div className="hidden md:flex bg-[#f0f2f5] border-b border-gray-100 justify-end items-stretch text-xs h-9">
        <div className="flex items-center">
          <Link href="#" className="flex items-center px-4 md:px-6 h-full text-gray-600 hover:text-[#116e41] transition-colors border-l border-gray-200">
            ติดต่อเรา
          </Link>
          <div className="flex items-center px-4 md:px-6 h-full text-gray-600 border-l border-gray-200 gap-2">
            <span className="font-semibold text-[#116e41]">Call Center:</span> 042-261135-6
          </div>
          <Link href="#" className="flex items-center justify-center px-6 h-full bg-[#d62828] text-white font-bold tracking-wider hover:bg-red-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            สายด่วน 1669
          </Link>
          <div className="flex items-center px-4 h-full border-l border-gray-200 uppercase font-bold text-gray-500 text-[10px] gap-2">
            <button className="text-[#116e41]">TH</button>
            <span className="text-gray-300">|</span>
            <button className="hover:text-[#116e41]">EN</button>
          </div>
          <Link href="#" className="flex items-center justify-center px-6 h-full bg-[#116e41] text-white font-bold hover:bg-[#0b4d2d] transition-colors border-l border-[#0b4d2d]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            ผู้ป่วย
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-4 flex-shrink-0 group">
            <div className="relative w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 transform group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/nhh.png" 
                alt="Nong Han Hospital Logo" 
                fill 
                className="object-contain drop-shadow-sm"
                sizes="(max-width: 768px) 40px, (max-width: 1024px) 56px, 64px"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base md:text-xl lg:text-2xl font-extrabold text-[#116e41] tracking-tight leading-none mb-0.5">
                โรงพยาบาลหนองหาน
              </h1>
              <span className="text-[9px] md:text-[10px] lg:text-xs font-semibold text-gray-400 uppercase tracking-widest">Nong Han Hospital</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center h-full gap-1">
            <Link href="/" className="flex items-center h-full px-4 text-[15px] font-bold text-gray-700 hover:text-[#116e41] transition-colors relative group">
              หน้าหลัก
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#116e41] opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>

            <div className="relative group h-full flex items-center">
              <Link href="#" className="flex items-center h-full px-4 text-[15px] font-bold text-gray-700 group-hover:text-[#116e41] transition-colors relative">
                เกี่ยวกับหน่วยงาน <span className="text-[9px] ml-1.5 opacity-50">▼</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#116e41] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
              <div className="absolute left-0 top-full pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="w-64 bg-white border-t-2 border-[#116e41] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] flex flex-col py-2">
                  <Link href="#" className="px-5 py-3 text-sm text-gray-600 hover:text-[#116e41] hover:bg-gray-50 transition-colors">ประวัติหน่วยงาน</Link>
                  <Link href="#" className="px-5 py-3 text-sm text-gray-600 hover:text-[#116e41] hover:bg-gray-50 transition-colors">โครงสร้างหน่วยงาน</Link>
                  <Link href="#" className="px-5 py-3 text-sm text-gray-600 hover:text-[#116e41] hover:bg-gray-50 transition-colors">ผู้บริหารหน่วยงาน</Link>
                  <Link href="#" className="px-5 py-3 text-sm text-gray-600 hover:text-[#116e41] hover:bg-gray-50 transition-colors">วิสัยทัศน์/พันธกิจ/เป้าประสงค์</Link>
                  <Link href="#" className="px-5 py-3 text-sm text-gray-600 hover:text-[#116e41] hover:bg-gray-50 transition-colors">บุคลากรของหน่วยงาน</Link>
                  <Link href="#" className="px-5 py-3 text-sm text-gray-600 hover:text-[#116e41] hover:bg-gray-50 transition-colors">ทีมพัฒนาระบบเว็บไซต์</Link>
                </div>
              </div>
            </div>

            <div className="relative group h-full flex items-center">
              <Link href="#" className="flex items-center h-full px-4 text-[15px] font-bold text-gray-700 group-hover:text-[#116e41] transition-colors relative">
                ข่าวประชาสัมพันธ์ <span className="text-[9px] ml-1.5 opacity-50">▼</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#116e41] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Link>
              <div className="absolute left-0 top-full pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="w-80 bg-white border-t-2 border-[#116e41] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] flex flex-col py-2 overflow-hidden max-h-[70vh] overflow-y-auto">
                  <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 font-bold text-[#116e41] text-sm">ประกาศ / ประชาสัมพันธ์</div>
                  <Link href="#" className="px-5 py-3 text-sm text-gray-600 hover:text-[#116e41] hover:bg-gray-50 transition-colors">ข่าวสาร โรงพยาบาลหนองหาน</Link>
                  <Link href="#" className="px-5 py-2 text-sm text-gray-500 hover:text-[#116e41] hover:bg-gray-50 transition-colors pl-8">รวมข่าวทุกประเภท</Link>
                  <Link href="#" className="px-5 py-2 text-sm text-gray-500 hover:text-[#116e41] hover:bg-gray-50 transition-colors pl-8">ประชาสัมพันธ์ทั่วไป</Link>
                  <Link href="#" className="px-5 py-2 text-sm text-gray-500 hover:text-[#116e41] hover:bg-gray-50 transition-colors pl-8">ประกาศข่าวรับสมัครงาน</Link>
                  <Link href="#" className="px-5 py-2 text-sm text-gray-500 hover:text-[#116e41] hover:bg-gray-50 transition-colors pl-8">ประกาศจัดซื้อจัดจ้าง</Link>
                  <Link href="#" className="px-5 py-2 text-sm text-gray-500 hover:text-[#116e41] hover:bg-gray-50 transition-colors pl-8">บริการประชาชน</Link>
                  <Link href="#" className="px-5 py-2 text-sm text-gray-500 hover:text-[#116e41] hover:bg-gray-50 transition-colors pl-8">คลังความรู้</Link>
                  <Link href="#" className="px-5 py-2 text-sm text-gray-500 hover:text-[#116e41] hover:bg-gray-50 transition-colors pl-8">กิจกรรม</Link>
                  <Link href="#" className="px-5 py-2 text-sm text-gray-500 hover:text-[#116e41] hover:bg-gray-50 transition-colors pl-8">งานวิจัยและนวัตกรรม</Link>
                </div>
              </div>
            </div>

            <Link href="#" className="flex items-center h-full px-4 text-[15px] font-bold text-gray-700 hover:text-[#116e41] transition-colors relative group">
              ระบบสารสนเทศ
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#116e41] opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            <Link href="#" className="flex items-center h-full px-4 text-[15px] font-bold text-gray-700 hover:text-[#116e41] transition-colors relative group">
              ITA
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#116e41] opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            <Link href="#" className="flex items-center h-full px-4 text-[15px] font-bold text-gray-700 hover:text-[#116e41] transition-colors relative group">
              คู่มือ/ดาวน์โหลด
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#116e41] opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            
            <button className="ml-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-[#116e41] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </nav>

          {/* Mobile Right — call button + hamburger */}
          <div className="xl:hidden flex items-center gap-2">
            <a href="tel:1669" className="flex items-center gap-1.5 bg-[#d62828] text-white text-xs font-bold px-3 py-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              1669
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 flex items-center justify-center text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white shadow-lg overflow-y-auto max-h-[80vh]">
          {/* Quick utility strip */}
          <div className="flex items-center justify-between bg-[#f0f2f5] px-4 py-2 text-xs text-gray-600">
            <span><span className="font-semibold text-[#116e41]">Call Center:</span> 042-261135-6</span>
            <div className="flex gap-3 items-center">
              <button className="font-bold text-[#116e41]">TH</button>
              <span className="text-gray-300">|</span>
              <button className="font-medium">EN</button>
              <Link href="#" className="ml-2 bg-[#116e41] text-white font-bold px-3 py-1 rounded-md text-[10px]">ผู้ป่วย</Link>
            </div>
          </div>

          <nav className="px-4 py-3 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 font-bold text-gray-700 hover:text-[#116e41] hover:bg-gray-50 rounded-xl transition-colors">
              หน้าหลัก
            </Link>

            {/* About — accordion */}
            <div>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="w-full flex items-center justify-between px-4 py-3 font-bold text-gray-700 hover:text-[#116e41] hover:bg-gray-50 rounded-xl transition-colors"
              >
                เกี่ยวกับหน่วยงาน
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${aboutOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {aboutOpen && (
                <div className="ml-4 border-l-2 border-green-100 pl-3 space-y-0.5 mt-1">
                  {['ประวัติหน่วยงาน','โครงสร้างหน่วยงาน','ผู้บริหารหน่วยงาน','วิสัยทัศน์/พันธกิจ/เป้าประสงค์','บุคลากรของหน่วยงาน','ทีมพัฒนาระบบเว็บไซต์'].map(item => (
                    <Link key={item} href="#" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-gray-600 hover:text-[#116e41] hover:bg-gray-50 rounded-lg transition-colors">{item}</Link>
                  ))}
                </div>
              )}
            </div>

            {/* News — accordion */}
            <div>
              <button
                onClick={() => setNewsOpen(!newsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 font-bold text-gray-700 hover:text-[#116e41] hover:bg-gray-50 rounded-xl transition-colors"
              >
                ข่าวประชาสัมพันธ์
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${newsOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {newsOpen && (
                <div className="ml-4 border-l-2 border-green-100 pl-3 space-y-0.5 mt-1">
                  {['รวมข่าวทุกประเภท','ประชาสัมพันธ์ทั่วไป','ประกาศรับสมัครงาน','ประกาศจัดซื้อจัดจ้าง','บริการประชาชน','คลังความรู้','กิจกรรม','งานวิจัยและนวัตกรรม'].map(item => (
                    <Link key={item} href="#" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-gray-600 hover:text-[#116e41] hover:bg-gray-50 rounded-lg transition-colors">{item}</Link>
                  ))}
                </div>
              )}
            </div>

            {['ระบบสารสนเทศ','ITA','คู่มือ/ดาวน์โหลด'].map(item => (
              <Link key={item} href="#" onClick={() => setMobileOpen(false)} className="block px-4 py-3 font-bold text-gray-700 hover:text-[#116e41] hover:bg-gray-50 rounded-xl transition-colors">{item}</Link>
            ))}

            {/* CTA row */}
            <div className="flex gap-3 pt-3 pb-2">
              <Link href="/find-doctor" onClick={() => setMobileOpen(false)} className="flex-1 text-center bg-[#116e41] text-white font-bold py-3 rounded-xl text-sm">
                ค้นหาแพทย์
              </Link>
              <Link href="/request" onClick={() => setMobileOpen(false)} className="flex-1 text-center border-2 border-[#116e41] text-[#116e41] font-bold py-3 rounded-xl text-sm">
                ร้องเรียน/เสนอแนะ
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
