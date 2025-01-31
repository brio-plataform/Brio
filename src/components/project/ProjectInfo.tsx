"use client"

import { ImagePlus } from "lucide-react";
import { useQueryState } from 'nuqs';

export function ProjectInfo() {
  const [projectName, setProjectName] = useQueryState("name", {
    defaultValue: "New Project",
    parse: (value) => value || "New Project"
  });
  
  const [projectDescription, setProjectDescription] = useQueryState("description", {
    defaultValue: "New Project Description",
    parse: (value) => value || "New Project Description"
  });

  const [projectImage, setProjectImage] = useQueryState("logo", {
    defaultValue: "",
    parse: (value) => value || ""
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProjectImage(imageUrl);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4 mt-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden group cursor-pointer">
        {projectImage ? (
          <img src={projectImage} alt="Project" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500" />
        )}
        
        <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <ImagePlus className="w-6 h-6 text-white" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
      <div>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="text-3xl font-bold bg-transparent border-none focus:outline-none w-full"
        />
        <input
          type="text"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="text-muted-foreground bg-transparent border-none focus:outline-none w-full"
        />
      </div>
    </div>
  );
} 