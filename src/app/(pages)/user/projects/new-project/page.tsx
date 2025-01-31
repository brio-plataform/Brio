import { LeftSidebar } from "@/components/left-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { Main } from "@/components/Main"


export default function Home() {
  return (
    <div className="flex w-full h-full justify-center items-center">
        <LeftSidebar />
        <Main />
        <RightSidebar />
    </div>
  )
}