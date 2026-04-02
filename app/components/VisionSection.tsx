export default function VisionSection() {
  return (
    <section className="relative w-full bg-white py-20 lg:py-28 overflow-hidden">
      {/* Decorative corporate pattern background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8fafc] transform -skew-x-12 translate-x-16"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        <div className="w-full md:w-5/12">
          <div className="relative">
            {/* Minimalist Graphic Element */}
            <div className="absolute -left-6 -top-6 w-24 h-24 bg-green-50 rounded-full z-0"></div>
            <div className="relative z-10 pl-6 border-l-4 border-green-600">
              <span className="text-sm font-bold tracking-widest text-green-600 uppercase mb-2 block">Our Vision</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0d5934] tracking-tight leading-tight mb-4">
                วิสัยทัศน์ <br/>โรงพยาบาลหนองหาน
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-50 relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-green-100 absolute top-4 left-4 opacity-50 z-0">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1.5.5 1.5 1.5L5 15c0 1.5 1 2.5 3 2.5ZM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1.5.5 1.5 1.5L17 15c0 1.5 1 2.5 3 2.5Z"/>
            </svg>
            <p className="relative z-10 text-xl md:text-2xl font-medium text-gray-700 leading-relaxed italic">
              "โรงพยาบาลหนองหานเป็นโรงพยาบาลแม่ข่ายที่มีคุณภาพ เพื่อประชาชนสุขภาพดี ด้วยมาตรฐานบริการที่เป็นเลิศและนวัตกรรมทางการแพทย์"
            </p>
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="font-bold text-[#0d5934]">คณะผู้บริหารและเจ้าหน้าที่</span>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="w-2 h-2 rounded-full bg-blue-200"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
