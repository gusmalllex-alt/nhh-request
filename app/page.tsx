import Hero from "./components/Hero";
import ServiceLinks from "./components/ServiceLinks";
import VisionSection from "./components/VisionSection";
import NewsTabs from "./components/NewsTabs";
import ActivityGallery from "./components/ActivityGallery";
import InformationSystems from "./components/InformationSystems";

// App Router SSG setting
export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />
      <ServiceLinks />
      <VisionSection />
      <NewsTabs />
      <ActivityGallery />
      <InformationSystems />
    </div>
  );
}
