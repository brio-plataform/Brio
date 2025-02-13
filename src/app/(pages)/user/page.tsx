import { Main } from "@/components/Main";
import UserProfile from "@/components/Profile/User/userProfile";

export default function UserPage() {
  return (
        <div className="flex-1 transition-all duration-300">
          <Main>
            <UserProfile />
          </Main>
        </div>
  )
}