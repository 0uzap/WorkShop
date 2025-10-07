import columnImg from '../assets/column.webp'

const GreekColumn = ({ size = 'md', className = '' }) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  }

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`inline-block ${className}`}>
      <div className={`${sizes[size]} mx-auto bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30`}>
        <img 
          src={columnImg} 
          alt="Greek column decoration" 
          className={`${iconSizes[size]} object-contain`}
          style={{ width: '50%', height: '50%' }}
        />
      </div>
    </div>
  )
}

export default GreekColumn

