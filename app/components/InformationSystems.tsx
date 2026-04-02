import Link from "next/link";

export default function InformationSystems() {
  const systems = [
    { title: "ระบบนัดออนไลน์", subtitle: "Online Appointment", color: "bg-green-600" },
    { title: "RLU NONGHAN HOSPITAL", subtitle: "กลุ่มงานเทคนิคการแพทย์", color: "bg-indigo-600" },
    { title: "ระบบเงินเดือนออนไลน์", subtitle: "(ข้าราชการ)", color: "bg-teal-600" },
    { title: "ระบบความเสี่ยง", subtitle: "โรงพยาบาลหนองหาน", color: "bg-rose-600" },
    { title: "ระบบเงินเดือนออนไลน์", subtitle: "(Payroll)", color: "bg-emerald-600" },
    { title: "ระบบแจ้งซ่อมออนไลน์", subtitle: "Repair Online", color: "bg-amber-600" },
    { title: "ระบบบริการคนพิการแบบเบ็ดเสร็จ", subtitle: "One-Stop Service", color: "bg-purple-600" },
    { title: "SMART REFER", subtitle: "ระบบส่งต่อผู้ป่วย", color: "bg-cyan-600" },
    { title: "ISOnline / PHER+ / nRefer", subtitle: "ระบบสารสนเทศ", color: "bg-[#116e41]" }
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-[#116e41] tracking-tight mb-4">
            ระบบสารสนเทศและบริการออนไลน์
          </h2>
          <p className="text-gray-500 text-lg">
            ช่องทางการเข้าถึงระบบงานภายในและบริการอิเล็กทรอนิกส์ของโรงพยาบาลหนองหาน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((sys, idx) => (
            <Link 
              href="#" 
              key={idx}
              className="group flex items-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-[0_10px_25px_-5px_rgba(17,110,65,0.15)] hover:border-[#116e41]/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-inner mr-5 ${sys.color} group-hover:scale-110 transition-transform duration-300`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1 truncate group-hover:text-[#116e41] transition-colors">
                  {sys.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {sys.subtitle}
                </p>
              </div>
              <div className="text-gray-300 group-hover:text-[#116e41] transition-colors ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
