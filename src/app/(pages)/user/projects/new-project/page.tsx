import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import placeholder from "../../../../../../public/images/placeholder.svg"
import { LeftSidebar } from "@/components/left-sidebar"
import { Header } from "@/components/header"
import { RightSidebar } from "@/components/right-sidebar"
import Editor from "@/components/editor"


export  function NewProject() {
  return (
    <div className="p-6">
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
        <CardContent className="p-6">
          <Editor />
        </CardContent>
      </Card>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex">
    <LeftSidebar />
    <div className="flex-1">
      <Header />
      <NewProject />
    </div>
    <RightSidebar />
    
    </div>
  )
}