import { Main } from "@/components/Main";
import InstitutionalProfile from "@/components/Profile/Instiitutional/institutionProfile";

export default function InstitutionalPage() {
  return (
      <div className="flex-1 transition-all duration-300 overflow-auto scrollbar-none">
        <Main>
          <InstitutionalProfile />
        </Main>
      </div>
  )
}