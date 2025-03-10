
export default function LoadingEditor() {
    return (
        <div className="p-6 w-full animate-pulse">
          {/* Banner Skeleton */}
          <div className="w-full h-60 mb-6 rounded-3xl bg-gray-200 dark:bg-gray-800" />
  
          {/* Project Info Skeleton */}
          <div className="mb-6 flex items-center gap-4">
            {/* Logo Skeleton */}
            <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-800" />
            
            {/* Title and Description Skeleton */}
            <div className="flex-1 space-y-3">
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-3 w-2/4 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
  
          {/* Editor Card Skeleton */}
          <div className="flex justify-center items-center pb-5 w-full">
            <div className="w-full rounded-lg bg-card">
              <div className="p-4 min-h-[300px] w-full">
                {/* Editor Content Skeleton */}
                <div className="space-y-3">
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-3/5 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-800 rounded" />
                  <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
