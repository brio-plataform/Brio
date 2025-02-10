import { ForumHeader } from "@/components/Header/ForumHeader/forumHeader";
import { LeftSidebar } from "@/components/Left-SideBar/left-sidebar";
import { Main } from "@/components/Main";
import { FeedForum } from "@/components/Feed/FeedForum/feedForum";


export default function ForumPage() {

  return (
    <div className="flex w-full h-full min-h-screen relative">
    <div className="sticky top-0 h-screen">
      <LeftSidebar />
    </div>
    
    <div className="flex-1 transition-all duration-300">
      <Main>
        <FeedForum />
      </Main>
    </div>
  </div>
  


);
}
