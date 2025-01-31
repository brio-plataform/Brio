import Editor from "./editor";
import { Card, CardContent } from "./ui/card";
import placeholder from "../../public/images/placeholder.svg"
import Image from "next/image";

export  function NewProject() {
    return (
      <div className="p-6 w-full">
        <div className="relative w-full h-60 mb-6 overflow-hidden rounded-3xl">
          <Image src={placeholder} alt="Brio Platform Banner" layout="fill" objectFit="cover" />
        </div>
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4 mt-4 bg-red">
            <Image src={placeholder} alt="Brio Platform Logo" width={64} height={64} className="rounded-lg" />
            <div>
              <h1 className="text-3xl font-bold">Brio Platform</h1>
              <p className="text-muted-foreground">Estrutura Ampliada do Brio</p>
            </div>
          </div>
        </div>
  
        <Card>
          <CardContent className="p-4">
            <Editor />
          </CardContent>
        </Card>
      </div>
    )
  }