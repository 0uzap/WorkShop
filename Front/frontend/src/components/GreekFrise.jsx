import friseImg from '../assets/frise-grecque-classique-removebg-preview.png'

const GreekFrise = ({ position = 'top', opacity = 50, className = '' }) => {
  const positions = {
    top: 'absolute top-0 left-0 right-0',
    bottom: 'absolute bottom-0 left-0 right-0',
    both: 'absolute inset-x-0'
  }

  if (position === 'both') {
    return (
      <>
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-${opacity} ${className}`}>
          <img 
            src={friseImg} 
            alt="Greek frise decoration" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-${opacity} ${className}`}>
          <img 
            src={friseImg} 
            alt="Greek frise decoration" 
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      </>
    )
  }

  return (
    <div className={`${positions[position]} h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-${opacity} ${className}`}>
      <img 
        src={friseImg} 
        alt="Greek frise decoration" 
        className="w-full h-full object-cover opacity-70"
      />
    </div>
  )
}

export default GreekFrise

