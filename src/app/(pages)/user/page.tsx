import { LeftSidebar } from "@/components/Left-SideBar/left-sidebar";
import { Main } from "@/components/Main";
import UserProfile from "@/components/Profile/User/userProfile";

export default function UserPage() {
  return (
      <div className="flex w-full h-full min-h-screen relative">
        <div className="sticky top-0 h-screen">
          <LeftSidebar />
        </div>
        <div className="flex-1 transition-all duration-300">
          <Main>
            <UserProfile />
          </Main>
        </div>
      </div>
  )
}