import { BookDetails } from "@/components/Books/BookDetatails/bookDetails"
import { Main } from "@/components/Main"

export default function BookPage() {
  return (
    <div className="flex-1 transition-all duration-300 overflow-auto scrollbar-none">
      <Main>
        <BookDetails />
      </Main>
    </div>
  )
}
