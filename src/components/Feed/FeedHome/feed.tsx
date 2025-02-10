import { CreatePost } from "@/components/CreatePost/createPost"
import { BannerCarousel } from "../../Banner/banner"
import { FeedItem } from "../../FeedItem/feedItem"
import { ColumnFeed } from "../../ColumnFeed/columnFeed"
import { MOCK_FEED_ITEMS } from './mockData'

export function Feed() {
  return (
    <div className="flex w-full justify-center items-start px-8 py-4 gap-8">
      <div className="flex flex-col w-full justify-center items-center gap-8">
        <BannerCarousel />
        <CreatePost />
        {MOCK_FEED_ITEMS.map((item, index) => (
          <FeedItem key={index} {...item} />
        ))}
      </div>
      <ColumnFeed />
    </div>
  )
}

