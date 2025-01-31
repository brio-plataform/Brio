import InstitutionalProfile from "@/components/institutionProfile";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";


export default function ProfilePage() {
  return (
    <div className="flex w-full h-full min-h-screen relative">
    <div className="sticky top-0 h-screen">
      <LeftSidebar />
    </div>
    <div className="flex-1 transition-all duration-300">
      <InstitutionalProfile />
    </div>
    <div className="sticky top-0 h-screen">
      <RightSidebar />
    </div>
  </div>
  )
}