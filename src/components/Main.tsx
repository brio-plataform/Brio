import { NewProject } from "./newProject";
import { Header } from "./header";

export function Main() {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <NewProject />
    </div>
  )
}