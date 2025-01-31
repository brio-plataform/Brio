import { LeftSidebar } from "@/components/left-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { Main } from "@/components/Main"
import { Header } from "@/components/header"
import { NewProject } from "@/components/newProject"

export default function Home() {
  return (
    <div className="flex w-full h-full min-h-screen relative">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      <div className="flex-1 transition-all duration-300">
        <Main>
          <Header />
          <NewProject />
        </Main>
      </div>
      <div className="sticky top-0 h-screen">
        <RightSidebar />
      </div>
    </div>
  )
}