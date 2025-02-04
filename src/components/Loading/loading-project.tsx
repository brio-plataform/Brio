
export default function LoadingProject() {
    return (
        <div className="flex w-full h-full min-h-screen relative">
          {/* Left Sidebar Skeleton */}
          <div className="sticky top-0 h-screen w-[250px] border-r animate-pulse">
            <div className="p-4 space-y-6">
              {/* Logo Area */}
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
              
              {/* Menu Items */}
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Content Skeleton */}
          <div className="flex-1 transition-all duration-300">
            {/* Header Skeleton */}
            <div className="h-16 border-b animate-pulse">
              <div className="p-4 flex justify-between items-center">
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
  
            {/* Project Content Skeleton */}
            <div className="p-6 animate-pulse">
              {/* Banner */}
              <div className="w-full h-60 mb-6 rounded-3xl bg-gray-200 dark:bg-gray-800" />
              
              {/* Project Info */}
              <div className="mb-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-2/4 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              </div>
  
              {/* Editor Area */}
              <div className="rounded-lg bg-card">
                <div className="p-4 min-h-[300px] space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-3 bg-gray-200 dark:bg-gray-800 rounded" 
                      style={{ width: `${Math.random() * 40 + 60}%` }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
  
          {/* Right Sidebar Skeleton */}
          <div className="sticky top-0 h-screen w-[250px] border-l animate-pulse">
            <div className="p-4 space-y-6">
              {/* Settings Section */}
              <div className="space-y-4">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
    );
}
