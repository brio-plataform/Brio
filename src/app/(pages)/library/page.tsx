
import { Books } from "@/components/Books/books";
import { Main } from "@/components/Main";

export default function InstitutionalPage() {
  return (
      <div className="flex-1 transition-all duration-300 overflow-auto scrollbar-none">
        <Main>
           <Books />
        </Main>
      </div>
  )
}