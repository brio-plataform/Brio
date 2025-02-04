import { LeftSidebar } from "@/components/Left-SideBar/left-sidebar";
import { Main } from "@/components/Main";
import InstitutionalProfile from "@/components/Profile/Instiitutional/institutionProfile";

export default function InstitutionalPage() {
  return (
    <div className="flex w-full h-full min-h-screen relative">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      <div className="flex-1 transition-all duration-300 overflow-auto scrollbar-none">
        <Main>
          <InstitutionalProfile />
        </Main>
      </div>
    </div>
  )
}