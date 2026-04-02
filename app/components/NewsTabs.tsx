import Image from "next/image";
import Link from "next/link";

export default function NewsTabs() {
  const newsItems = [
    {
      title: "ประกาศรับสมัครพนักงานกระทรวงสาธารณสุขทั่วไปและลูกจ้างชั่วคราว (รายวัน) ตำแหน่ง พยาบาลวิชาชีพ ปีงบประมาณ 2567",
      date: "01 ต.ค. 2567",
      category: "รับสมัครงาน",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "รายงานผลการประกวดราคาซื้อเครื่องอัลตราซาวนด์ชนิดหิ้วได้ สำหรับแผนกฉุกเฉิน",
      date: "28 ก.ย. 2567",
      category: "จัดซื้อจัดจ้าง",
      image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "กิจกรรมรณรงค์ล้างมือเนื่องในวันล้างมือโลก ประจำปี 2567 สร้างสุขนิสัยร่วมกัน",
      date: "10 ก.ย. 2567",
      category: "ข่าวกิจกรรม",
      image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0d5934] tracking-tight mb-3 border-l-4 border-green-600 pl-4">
              บทความสุขภาพและข่าวสาร
            </h2>
            <p className="text-gray-500 max-w-xl text-lg pl-5">
              อัปเดตสาระน่ารู้ เคล็ดลับการดูแลสุขภาพ และข่าวประชาสัมพันธ์จากโรงพยาบาล
            </p>
          </div>
          <Link href="#" className="flex-shrink-0 bg-gray-50 hover:bg-gray-100 text-[#0d5934] font-bold py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 group border border-gray-200">
            ดูบทความทั้งหมด 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          </Link>
        </div>
        
        {/* Modern Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button className="px-6 py-2.5 bg-[#0d5934] text-white font-bold rounded-full text-sm shadow-md">ทั้งหมด</button>
          <button className="px-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 rounded-full text-sm transition-colors">บทความสุขภาพ</button>
          <button className="px-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 rounded-full text-sm transition-colors">ประกาศรับสมัครงาน</button>
          <button className="px-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 rounded-full text-sm transition-colors">ประกาศจัดซื้อจัดจ้าง</button>
        </div>

        {/* Premium News Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((news, idx) => (
            <Link href="#" key={idx} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(15,46,96,0.12)] transition-all duration-300">
              
              {/* Image Area */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image 
                  src={news.image} 
                  alt={news.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  sizes="(max-width: 768px) 100vw, 33vw" 
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm z-10 uppercase tracking-widest">
                  {news.category}
                </div>
              </div>
              
              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  {news.date}
                </div>
                
                <h3 className="text-xl font-bold text-[#0d5934] mb-4 leading-snug group-hover:text-green-600 transition-colors line-clamp-3">
                  {news.title}
                </h3>
                
                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-green-600 font-bold text-sm group-hover:gap-2 transition-all">
                  อ่านเพิ่มเติม 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>

            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
