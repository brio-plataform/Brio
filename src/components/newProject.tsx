import { Card, CardContent } from "./ui/card";
import { ProjectBanner } from "./project/ProjectBanner";
import { ProjectInfo } from "./project/ProjectInfo";
import Editor from "./Editor";

export function NewProject() {

  return (
    <div className="p-6 w-full">
      <ProjectBanner />

      <div className="mb-6">
        <ProjectInfo />
      </div>

      <div className="flex justify-center items-center pb-5 w-full">
        <Card className="w-full">
          <CardContent className="p-4 min-h-[300px] w-full">
            <Editor />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}