import { CreatePost } from "@/components/CreatePost/createPost"
import { FeedItem } from "../../FeedItem/feedItem"
import { ColumnFeed } from "../../ColumnFeed/columnFeed"
import { ForumHeader } from "../../Header/ForumHeader/forumHeader"
import { MOCK_FEED_ITEMS } from "../../FeedItem/mockData"
import { MOCK_FORUM_HEADER } from "../../Header/ForumHeader/mockData"
import type { FeedItemProps } from "../../FeedItem/types"

export function FeedForum() {
  return (
    <div className="flex w-full justify-center items-start px-8 py-4 gap-8">
      <div className="flex flex-col w-full justify-center items-center gap-8">
        <ForumHeader {...MOCK_FORUM_HEADER} />
        <CreatePost />
        {MOCK_FEED_ITEMS.map((item: FeedItemProps, index: number) => (
          <FeedItem key={index} {...item} />
        ))}
      </div>
      <ColumnFeed />
    </div>
  )
}

