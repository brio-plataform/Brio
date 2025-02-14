import { Main } from "@/components/Main";
import MenagerProjects from "@/components/MenagerProjects/menagerProjects";

export default function ProjectPage() {

  return (
      <div className="flex-1 transition-all duration-300">
        <Main>
          <MenagerProjects />
        </Main>
      </div>
  );
}