import { Main } from "@/components/Main";
import { FeedForum } from "@/components/Feed/FeedForum/feedForum";


export default function ForumPage() {

  return (
    <div className="flex-1 transition-all duration-300">
      <Main>
        <FeedForum />
      </Main>
    </div>
);
}
