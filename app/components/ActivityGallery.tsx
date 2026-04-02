import Image from "next/image";
import Link from "next/link";

export default function ActivityGallery() {
  const activities = [
    {
      title: "โครงการบริจาคโลหิตและอวัยวะ",
      date: "15 ต.ค. 2567",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "กิจกรรมส่งเสริมสุขภาพชุมชนเชิงรุก",
      date: "02 ต.ค. 2567",
      image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "การอบรมพัฒนาศักยภาพบุคลากรทางการแพทย์",
      date: "20 ก.ย. 2567",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127d09e?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "พิธีทำบุญครบรอบวันสถาปนาโรงพยาบาล",
      date: "09 ก.ย. 2567",
      image: "https://images.unsplash.com/photo-1542884748-2b87b00f3652?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-[#f8fafc] border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-[#116e41] tracking-tight mb-3 border-l-4 border-green-600 pl-4">
              ภาพกิจกรรม
            </h2>
            <p className="text-gray-500 max-w-xl text-lg pl-5">
              ประมวลภาพกิจกรรม โครงการต่างๆ และความเคลื่อนไหวของโรงพยาบาล
            </p>
          </div>
          <Link href="#" className="flex-shrink-0 text-[#116e41] hover:text-[#0b4d2d] font-bold flex items-center gap-2 group">
            ดูภาพกิจกรรมทั้งหมด 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, idx) => (
            <Link href="#" key={idx} className="group relative h-64 md:h-72 w-full rounded-2xl overflow-hidden shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_-5px_rgba(17,110,65,0.2)] transition-all duration-300 transform group-hover:-translate-y-1">
              <Image 
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#116e41]/95 via-[#116e41]/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                <span className="text-green-100 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 opacity-90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  {activity.date}
                </span>
                <h3 className="text-white font-bold text-lg leading-snug drop-shadow-lg group-hover:text-green-100 transition-colors line-clamp-3">
                  {activity.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
