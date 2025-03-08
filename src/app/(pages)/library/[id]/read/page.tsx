import { BookReader } from "@/components/Books/BookReader/BookReader"
import { Main } from "@/components/Main"

export default function BookPage({ params }: { params: { id: string[] } }) {
  const [bookId, readerId] = params.id
  
  return (
    <div className="flex-1 transition-all duration-300 overflow-auto scrollbar-none">
      <Main>
        <BookReader bookId={bookId} />
      </Main>
    </div>
  )
}
