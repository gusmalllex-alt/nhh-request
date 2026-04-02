import Link from "next/link";

export default function ServiceLinks() {
  const centers = [
    {
      title: "ศูนย์หัวใจ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      )
    },
    {
      title: "ศูนย์กระดูกและข้อ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12.5 17.5 4 4a2.5 2.5 0 0 0 3.5-3.5l-4-4"/><path d="m11 15-4-4"/><path d="m17.5 12.5-4-4"/><path d="m5 6.5-1.5-1.5a2.5 2.5 0 0 1 3.5-3.5L8.5 3"/><path d="M5 6.5 6.5 5"/><path d="M11 15 8.5 17.5a2.5 2.5 0 0 1-3.5-3.5L6.5 12.5"/></svg>
      )
    },
    {
      title: "ศูนย์สมองและระบบประสาท",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
      )
    },
    {
      title: "ศูนย์มะเร็ง",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
      )
    },
    {
      title: "ศูนย์ทางเดินอาหาร",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M3 12a9 9 0 1 1 18 0"/></svg>
      )
    },
    {
      title: "ศูนย์กุมารเวชกรรม",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-extrabold text-[#116e41] tracking-tight">
            ศูนย์และคลินิก
          </h2>
          <Link href="#" className="hidden md:flex text-[#116e41] hover:text-[#0b4d2d] font-bold items-center gap-2 group">
            ดูทั้งหมด 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>
        
        {/* Exact BGH Style Circular Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {centers.map((center, idx) => (
            <Link 
              href="#" 
              key={idx} 
              className="group flex flex-col items-center justify-start text-center"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-4 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] text-[#116e41] group-hover:border-[#116e41] group-hover:shadow-[0_10px_25px_-5px_rgba(17,110,65,0.2)] group-hover:bg-[#116e41] group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">
                {center.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base leading-tight px-2 group-hover:text-[#116e41] transition-colors">
                {center.title}
              </h3>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="#" className="inline-block border border-[#116e41] text-[#116e41] font-bold py-2.5 px-8 hover:bg-[#116e41] hover:text-white transition-colors">
            ดูทั้งหมด
          </Link>
        </div>

      </div>
    </section>
  );
}
