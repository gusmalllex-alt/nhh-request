import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-[#f8fafc] py-6 md:py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-5 h-auto lg:h-[480px]">
          
          {/* Left Side: Quick Actions Card Grid */}
          <div className="w-full lg:w-[360px] flex flex-col gap-4 flex-shrink-0">
            
            {/* Top Auth Banner */}
            <Link href="#" className="bg-white rounded-[20px] p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 flex justify-between items-center group transition-shadow hover:shadow-md">
               <div>
                 <p className="text-[11px] text-gray-500 mb-1 tracking-wider">ระบบบริการผู้ป่วย (Smart Hospital)</p>
                 <h4 className="font-bold text-[#116e41] flex items-center gap-2 text-sm group-hover:text-green-700 transition-colors">
                   ลงทะเบียน / เข้าสู่ระบบ 
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
                 </h4>
               </div>
               <div className="w-10 h-10 rounded-full bg-green-50 flex flex-col items-center justify-center border border-green-100 shadow-inner group-hover:bg-green-100 transition-colors">
                  <span className="text-[#116e41] font-extrabold text-lg leading-none">B</span>
                  <span className="text-[8px] text-[#116e41] font-bold uppercase mt-0.5">Point</span>
               </div>
            </Link>

            {/* 2x2 Grid Actions */}
            <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 flex-1 grid grid-cols-2 grid-rows-2 relative overflow-hidden">
               {/* Vertical Divider */}
               <div className="absolute left-1/2 top-4 bottom-4 w-px bg-gray-100"></div>
               {/* Horizontal Divider */}
               <div className="absolute top-1/2 left-4 right-4 h-px bg-gray-100"></div>

               {/* 1. ค้นหาแพทย์ */}
               <Link href="/find-doctor" className="flex flex-col items-center justify-center p-6 gap-3 hover:bg-gray-50/80 transition-colors group z-10">
                 <div className="text-red-600 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="opacity-90"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><line x1="19" y1="8" x2="19" y2="14" stroke="currentColor" strokeWidth="2"/><line x1="16" y1="11" x2="22" y2="11" stroke="currentColor" strokeWidth="2"/></svg>
                 </div>
                 <span className="font-bold text-[#116e41] text-sm group-hover:text-green-700">ค้นหาแพทย์</span>
               </Link>

               {/* 2. ทำนัด */}
               <Link href="#" className="flex flex-col items-center justify-center p-6 gap-3 hover:bg-gray-50/80 transition-colors group z-10">
                 <div className="text-[#116e41] group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><circle cx="12" cy="15" r="2" fill="currentColor"/></svg>
                 </div>
                 <span className="font-bold text-[#116e41] text-sm group-hover:text-green-700">ทำนัด</span>
               </Link>

               {/* 3. แพ็กเกจ */}
               <Link href="#" className="flex flex-col items-center justify-center p-6 gap-3 hover:bg-gray-50/80 transition-colors group z-10">
                 <div className="text-[#116e41] group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"><rect width="16" height="13" x="4" y="8" rx="2" ry="2"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M12 11h.01"/><path d="M12 11v3"/></svg>
                 </div>
                 <span className="font-bold text-[#116e41] text-sm group-hover:text-green-700">แพ็กเกจ</span>
               </Link>

               {/* 4. ติดต่อเรา */}
               <Link href="#" className="flex flex-col items-center justify-center p-6 gap-3 hover:bg-gray-50/80 transition-colors group z-10">
                 <div className="text-gray-400 group-hover:text-gray-600 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="opacity-80"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10" stroke="white" strokeWidth="2"/><line x1="12" y1="7" x2="12" y2="13" stroke="white" strokeWidth="2"/></svg>
                 </div>
                 <span className="font-bold text-gray-500 text-sm group-hover:text-gray-700">ติดต่อเรา</span>
               </Link>
            </div>

            {/* Bottom Link Segment */}
             <Link href="#" className="bg-white rounded-[16px] p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100 flex justify-between items-center group transition-shadow hover:shadow-md">
                 <h4 className="font-extrabold text-[#116e41] text-xs">ไปยังหน้า บริการประชาชน (ศูนย์รับเรื่องราวฯ)</h4>
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#116e41] transform group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
             </Link>
          </div>

          {/* Right Side: Main Banner Slider */}
          <div className="flex-1 relative rounded-[20px] overflow-hidden shadow-[0_4px_25px_-5px_rgba(0,0,0,0.1)] h-[350px] lg:h-full bg-black group cursor-pointer">
            <Image 
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2000&auto=format&fit=crop"
              alt="Hospital Main Banner"
              fill
              className="object-cover opacity-90 relative z-0 transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              priority
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-[#116e41]/60 via-[#116e41]/20 to-transparent z-10"></div>

            <div className="absolute inset-0 z-20 container mx-auto px-10 flex flex-col justify-center">
              <div className="max-w-xl">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                  การรับรองคุณภาพมาตรฐานระดับสากล
                </h1>
                <p className="text-base md:text-xl text-white/90 font-light drop-shadow-md">
                  ยกระดับบริการทางการแพทย์ <br/>เพื่อการดูแลที่ครอบคลุมและปลอดภัยที่สุด
                </p>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              <button className="w-10 h-1.5 bg-white rounded-full transition-all shadow-sm"></button>
              <button className="w-4 h-1.5 bg-white/40 hover:bg-white/70 rounded-full transition-all"></button>
              <button className="w-4 h-1.5 bg-white/40 hover:bg-white/70 rounded-full transition-all"></button>
              <button className="w-4 h-1.5 bg-white/40 hover:bg-white/70 rounded-full transition-all"></button>
              <button className="w-4 h-1.5 bg-white/40 hover:bg-white/70 rounded-full transition-all"></button>
            </div>
            
            {/* Arrows */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-30 backdrop-blur-sm opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-all z-30 backdrop-blur-sm opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
