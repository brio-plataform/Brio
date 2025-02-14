export function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      {children}
    </div>
  )
}