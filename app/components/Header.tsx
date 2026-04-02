import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white relative z-50 font-sans shadow-sm">
      {/* Top Utility Bar - Exact BGH Style */}
      <div className="bg-[#f0f2f5] border-b border-gray-100 flex justify-end items-stretch text-xs h-9">
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
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 flex-shrink-0 group">
            <div className="relative w-14 h-14 md:w-16 md:h-16 transform group-hover:scale-105 transition-transform duration-300">
              <Image 
                src="/nhh.png" 
                alt="Nong Han Hospital Logo" 
                fill 
                className="object-contain drop-shadow-sm"
                sizes="(max-width: 768px) 56px, 64px"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-extrabold text-[#116e41] tracking-tight leading-none mb-1">
                โรงพยาบาลหนองหาน
              </h1>
              <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest">Nong Han Hospital</span>
            </div>
          </Link>

          {/* Desktop Nav Links - Right Aligned like BGH */}
          <nav className="hidden xl:flex items-center h-full gap-1">
            <Link href="/" className="flex items-center h-full px-4 text-[15px] font-bold text-gray-700 hover:text-[#116e41] transition-colors relative group">
              หน้าหลัก
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#116e41] opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>

            {/* About Navigation with Dropdown */}
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

            {/* News Navigation with Dropdown */}
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
            
            {/* Search Icon */}
            <button className="ml-4 w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-[#116e41] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="xl:hidden w-10 h-10 flex items-center justify-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
