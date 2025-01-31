import { NewProject } from "./newProject";
import { Header } from "./header";

export function Main() {
  return (
    <div className="flex flex-col w-full max-w-7xl">
        <div className="flex w-full fixed top-0 max-w-7xl z-10">
            <Header />
        </div>
        <div className="flex w-full pt-48">
            <NewProject />
        </div>
    </div>
  )
}