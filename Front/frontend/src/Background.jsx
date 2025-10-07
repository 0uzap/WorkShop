export const Background = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#DDD1BC] flex items-center justify-center p-6">
     
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,115,85,0.05),transparent_50%)] opacity-40"></div>
      
      {children}
    </div>
  )
}

export default Background
