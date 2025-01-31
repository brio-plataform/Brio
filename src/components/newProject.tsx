import { Card, CardContent } from "./ui/card";
import Editor from "./editor";
import { ProjectBanner } from "./project/ProjectBanner";
import { ProjectInfo } from "./project/ProjectInfo";

export function NewProject() {
  return (
    <div className="p-6 w-full">
      <ProjectBanner />

      <div className="mb-6">
        <ProjectInfo />
      </div>
  
      <Card>
        <CardContent className="p-4">
          <Editor />
        </CardContent>
      </Card>
    </div>
  );
}