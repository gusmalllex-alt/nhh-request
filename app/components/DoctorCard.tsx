import Image from "next/image";
import Link from "next/link";

interface DoctorCardProps {
  name: string;
  department: string;
  imageSrc: string;
  availability: string;
  hospital?: string;
}

export default function DoctorCard({ name, department, imageSrc, availability, hospital = "โรงพยาบาลหนองหาน" }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 group flex flex-col h-full border border-gray-100">
      {/* Image Area */}
      <div className="relative h-64 w-full bg-slate-50 overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={`Photo of ${name}`} 
          fill 
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-in-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Department Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-[#0d5934] shadow-sm">
          {department}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-gray-500 mb-1 tracking-wide">{hospital}</p>
        <h3 className="text-xl font-bold text-[#0d5934] mb-4 leading-tight group-hover:text-green-600 transition-colors">{name}</h3>
        
        {/* Doctor Details */}
        <div className="space-y-3 mb-6 mt-auto">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-[#0d5934]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/></svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">ความเชี่ยวชาญ</p>
              <p className="text-sm font-semibold text-gray-800">{department}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-[#0d5934]">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">ตารางออกตรวจ</p>
              <p className="text-sm font-semibold text-gray-800">{availability}</p>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
          <Link href="#" className="flex justify-center items-center py-2.5 px-4 rounded-xl border border-[#0d5934] text-[#0d5934] text-sm font-semibold hover:bg-gray-50 transition-colors">
            ดูประวัติแพทย์
          </Link>
          <Link href="#" className="flex justify-center items-center py-2.5 px-4 rounded-xl bg-[#0d5934] text-white text-sm font-semibold hover:bg-[#1a4484] transition-colors shadow-md hover:shadow-lg">
            ทำนัดหมาย
          </Link>
        </div>
      </div>
    </div>
  );
}
