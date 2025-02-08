import { FeedExplore } from "@/components/Feed/FeedExplore/feedExplore";
import { LeftSidebar } from "@/components/Left-SideBar/left-sidebar";
import { Main } from "@/components/Main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Explore - Brio',
  description: 'Explore estudos, debates e ideias nas mais diversas áreas do conhecimento.',
}

export default function ExplorePage() {
  return (
    <div className="flex w-full h-full min-h-screen relative">
      <div className="sticky top-0 h-screen">
        <LeftSidebar />
      </div>
      <div className="flex-1 transition-all duration-300 overflow-auto scrollbar-none">
        <Main>
          <FeedExplore />
        </Main>
      </div>
    </div>
  )
}