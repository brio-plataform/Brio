import InstitutionalProfile from "@/components/institutionProfile";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";


export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex-1">
        <LeftSidebar />
      </div>
      <div className="flex-2 w-full max-w-7xl">
        <InstitutionalProfile />
      </div>
      <div className="flex-1">
        <RightSidebar />
      </div>
    </div>
  )
}