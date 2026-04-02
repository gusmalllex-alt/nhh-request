import DoctorCard from "../components/DoctorCard";

export const dynamic = "force-static";

export default function FindDoctor() {
  const doctors = [
    {
      name: "นพ. สมชาย ใจดี",
      department: "ศูนย์หัวใจ",
      availability: "จันทร์, พุธ, ศุกร์ (09:00 - 16:00)",
      imageSrc: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "พญ. หญิงสวย รักษาเก่ง",
      department: "ศูนย์กุมารเวชกรรม",
      availability: "อังคาร, พฤหัส, เสาร์ (08:00 - 15:00)",
      imageSrc: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "นพ. วิทยา พยาบาล",
      department: "ศูนย์ออร์โธปิดิกส์ (กระดูกและข้อ)",
      availability: "พุธ, ศุกร์, อาทิตย์ (10:00 - 18:00)",
      imageSrc: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "พญ. อารี มีเมตตา",
      department: "ศูนย์สูตินรีเวช",
      availability: "จันทร์, อังคาร, พฤหัส (09:00 - 17:00)",
      imageSrc: "https://images.unsplash.com/photo-1594824401569-b50a04943015?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "นพ. เอกพล ชนชาญ",
      department: "ศูนย์อายุรกรรม",
      availability: "ทุกวันทำการ (08:00 - 12:00)",
      imageSrc: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "พญ. นภัสสร สุขเกษม",
      department: "ศูนย์ตา หู คอ จมูก",
      availability: "อังคาร, พุธ, ศุกร์ (13:00 - 19:00)",
      imageSrc: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-[#f8fafc] w-full min-h-screen font-sans">
      {/* Hero Banner Section */}
      <div className="relative bg-[#0d5934] overflow-hidden pt-12 pb-24 md:pt-16 md:pb-32">
        {/* Background Decorative Pattern / Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#094025] to-[#0d5934]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-white/20 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            ค้นหาแพทย์
          </h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            ทีมแพทย์ผู้เชี่ยวชาญของเราพร้อมให้คำปรึกษาและดูแลคุณอย่างใกล้ชิด เพื่อสุขภาพที่ดีของคุณและคนที่คุณรัก
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-20">
        
        {/* Advanced Search Widget Overhanging the Hero Section */}
        <div className="-mt-16 md:-mt-20 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-6 md:p-8 mb-12 transform transition-transform">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <label htmlFor="search-name" className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">ค้นหาแพทย์</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <input 
                  type="text" 
                  id="search-name"
                  placeholder="ชื่อ - นามสกุลแพทย์" 
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d5934] focus:border-[#0d5934] focus:bg-white transition-all text-gray-900 outline-none font-medium placeholder-gray-400"
                />
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="md:col-span-4 relative">
              <label htmlFor="department" className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">ศูนย์ / คลินิก</label>
              <div className="relative">
                <select 
                  id="department"
                  className="w-full pl-4 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d5934] focus:border-[#0d5934] focus:bg-white transition-all text-gray-900 outline-none font-medium appearance-none cursor-pointer"
                >
                  <option value="">ทุกศูนย์/คลินิก</option>
                  <option value="heart">ศูนย์หัวใจ</option>
                  <option value="pediatrics">ศูนย์กุมารเวชกรรม</option>
                  <option value="orthopedics">ศูนย์ออร์โธปิดิกส์</option>
                  <option value="obgyn">ศูนย์สูตินรีเวช</option>
                  <option value="medicine">ศูนย์อายุรกรรม</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-3 flex items-end">
              <button className="w-full bg-[#0d5934] hover:bg-[#1a4484] text-white font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-md hover:shadow-lg flex justify-center items-center gap-2 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                ค้นหาแพทย์
              </button>
            </div>

          </div>
          
          {/* Quick Filters / Alphabet Index (Optional but very BGH style) */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-500 mr-2">ค้นหาตามตัวอักษร:</span>
            <div className="flex flex-wrap gap-2 text-sm">
              <button className="h-8 w-8 rounded-full bg-green-50 text-green-700 font-bold hover:bg-[#0d5934] hover:text-white transition-colors flex items-center justify-center">ก</button>
              <button className="h-8 w-8 rounded-full bg-gray-50 text-gray-600 font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">ข</button>
              <button className="h-8 w-8 rounded-full bg-gray-50 text-gray-600 font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">ค</button>
              <button className="h-8 px-3 rounded-full bg-gray-50 text-gray-600 font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">...</button>
              <button className="h-8 w-8 rounded-full bg-gray-50 text-gray-600 font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">ฮ</button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            พบแพทย์ <span className="text-[#0d5934]">{doctors.length}</span> ท่าน
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-500">เรียงตาม:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-900 font-medium py-2 pl-4 pr-10 rounded-lg cursor-pointer focus:ring-2 focus:ring-[#0d5934] outline-none shadow-sm">
                <option>ความเชี่ยวชาญ (ก-ฮ)</option>
                <option>ชื่อ (ก-ฮ)</option>
                <option>ความพร้อมให้บริการ</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <DoctorCard 
              key={index}
              name={doctor.name}
              department={doctor.department}
              availability={doctor.availability}
              imageSrc={doctor.imageSrc}
            />
          ))}
        </div>
        
        {/* Modern Pagination */}
        <div className="mt-16 flex justify-center">
          <nav className="inline-flex rounded-xl shadow-sm bg-white border border-gray-100 p-1">
            <button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-[#0d5934] hover:bg-green-50 transition-colors disabled:opacity-50" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0d5934] text-white font-bold transition-colors">1</button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-colors">2</button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-colors">3</button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-[#0d5934] hover:bg-green-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </nav>
        </div>

      </div>
    </div>
  );
}
