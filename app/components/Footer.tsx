import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full mt-auto font-sans bg-[#094025] text-green-50">
      {/* Upper Footer (Premium Dark Blue 5-column layout) */}
      <div className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-sm">
            
            {/* Column 1: Hospital Contact */}
            <div className="space-y-4 lg:pr-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 flex-shrink-0 bg-white/10 rounded-full p-1 border border-white/20 backdrop-blur-sm shadow-inner transition-transform hover:scale-110 duration-300">
                  <Image 
                    src="/nhh.png" 
                    alt="Nong Han Hospital Logo" 
                    fill 
                    className="object-contain p-1"
                  />
                </div>
                <h3 className="font-bold text-lg text-white tracking-tight">โรงพยาบาลหนองหาน</h3>
              </div>
              <div className="space-y-2 text-green-100/80 leading-relaxed font-light">
                <p>378 หมู่ 6 ต.หนองหาน อ.หนองหาน<br/>จ.อุดรธานี 41130</p>
                <p className="flex items-center gap-2 pt-2"><strong className="text-white font-medium">โทรศัพท์ :</strong> 042-261135-6</p>
                <p className="flex items-center gap-2"><strong className="text-white font-medium">โทรสาร :</strong> 042-261135-6 ต่อ 252</p>
                <p className="flex items-start gap-2 break-all"><strong className="text-white font-medium whitespace-nowrap">email :</strong> nonghanhospital.11018@gmail.com</p>
                <p className="flex items-center gap-2"><strong className="text-white font-medium">Line OA :</strong> @027gcoyi</p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Link href="https://www.facebook.com/nonghanhospital" target="_blank" className="w-9 h-9 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </Link>
                <Link href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#094025"/></svg>
                </Link>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 space-y-2.5 text-green-100/80 font-light">
                <Link href="#" className="block hover:text-white transition-colors">แสดงความคิดเห็นเกี่ยวกับโรงพยาบาล</Link>
                <Link href="#" className="block hover:text-white transition-colors">กลุ่มงานภายใน</Link>
                <Link href="#" className="block hover:text-white transition-colors">บุคลากรทั้งหมด</Link>
                <Link href="#" className="block hover:text-white transition-colors">ช่องทางการติดต่อและแผนที่</Link>
                <Link href="#" className="block hover:text-white transition-colors">สถิติผู้เข้าชมเว็บไซต์</Link>
              </div>
            </div>

            {/* Column 2: News */}
            <div>
              <h3 className="font-bold text-base text-white mb-6 tracking-wide">ข่าวสาร โรงพยาบาลหนองหาน</h3>
              <ul className="space-y-3 font-light text-green-100/70">
                <li><Link href="#" className="hover:text-white transition-colors block">รวมข่าวทุกประเภท</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ประชาสัมพันธ์ทั่วไป</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ประกาศรับสมัครงาน</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ประกาศจัดซื้อจัดจ้าง</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">บริการประชาชน</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">คลังความรู้</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ประมวลผลระบบ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">กิจกรรม</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">เอกสารเผยแพร่</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ชมรมจริยธรรม</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">จริยธรรมการวิจัยในมนุษย์</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">งานวิจัยในโรงพยาบาลและเครือข่าย/นวัตกรรม</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block leading-relaxed">เกณฑ์จริยธรรมการจัดซื้อจัดหาและการส่งเสริมการขายยาและเวชภัณฑ์ที่มิใช่ยา</Link></li>
              </ul>
            </div>

            {/* Column 3: Internal Systems */}
            <div>
              <h3 className="font-bold text-base text-white mb-6 tracking-wide">ระบบงานภายใน</h3>
              <ul className="space-y-3 font-light text-green-100/70">
                <li><Link href="#" className="hover:text-white transition-colors block">SmartRefer</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ISOnline</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ระบบความสี่ยง รพ.หนองหาน</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">แบบสำรวจวัฒนธรรมความปลอดภัย</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ระบบเงินเดือนออนไลน์</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ระบบแจ้งซ่อมออนไลน์</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ระบบขอใช้งานโสตทัศนศึกษา</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block leading-relaxed">ระบบบริการคนพิการแบบเบ็ดเสร็จ : Nawang Model</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ระบบนัดออนไลน์</Link></li>
              </ul>
            </div>

            {/* Column 4: External Agencies */}
            <div>
              <h3 className="font-bold text-base text-white mb-6 tracking-wide">หน่วยงานภายนอก</h3>
              <ul className="space-y-3 font-light text-green-100/70">
                <li><Link href="#" className="hover:text-white transition-colors block">กระทรวงสาธารณสุข</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">กรมควบคุมโรค</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">กรมสนับสนุนบริการสุขภาพ</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">กองบริหารการสาธารณสุข</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">กองยุทธศาสตร์และแผนงาน</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">สำนักงานเขตสุขภาพที่ 8</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">สปสช. เขต 8 อุดรธานี</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">MyMOPH กระทรวงสาธารณสุข</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block leading-relaxed">ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร กระทรวงสาธารณสุข</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">สำนักงานสาธารณสุขจังหวัดอุดรธานี</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ข้อมูลบุคลากรรายบุคคล NonHR</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">Financial Data Hub</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block">ระบบเงินเดือนข้าราชการ</Link></li>
              </ul>
            </div>

            {/* Column 5: Mohpromt */}
            <div>
              <h3 className="font-bold text-base text-white mb-6 tracking-wide">หมอพร้อม</h3>
              <ul className="space-y-3 font-light text-green-100/70">
                <li><Link href="#" className="hover:text-white transition-colors block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> MOPH Immunization Center
                </Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> หมอพร้อม IDP
                </Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> หมอพร้อม PHR
                </Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> หมอพร้อม DID
                </Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> MOPH Claim
                </Link></li>
                <li><Link href="#" className="hover:text-white transition-colors block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> หมอพร้อม Station
                </Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar (Darker Blue) */}
      <div className="bg-[#062917] text-green-200/50 py-6 text-xs">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">
            พัฒนางานโดย นายศุภชัย สุนารักษ์ ตำแหน่ง นักวิชาการสถิติ กลุ่มงานสุขภาพดิจิทัล โรงพยาบาลหนองหาน <br className="md:hidden" />
            <span className="hidden md:inline"> | </span> Copyright 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
