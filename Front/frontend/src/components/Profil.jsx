import profilImg from '../assets/profil.png'

const Profil = ({ size = 'md', className = '', name = '', showBorder = true }) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32'
  }

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
            <img 
          src={profilImg} 
          alt={name || "User profile"} 
          className="w-full h-full object-cover"  style={{ width: '20%', height:'20%' }}
        />
     
      {name && (
        <p className="mt-2 text-sm font-medium text-slate-800">{name}</p>
      )}
    </div>
  )
}

export default Profil
