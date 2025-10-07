import React, { useState } from 'react'

export default function PretButton({ onClick, className = '', children = 'Prêt' }) {
  const [isReady, setIsReady] = useState(false)
  
  const handleClick = (e) => {
    setIsReady(true)
    console.log('Button clicked! isReady changed to:', true)
    if (onClick) onClick(e)
  }
  
  return (
    <button
      type="button"
      aria-label="Prêt"
      onClick={handleClick}
      className={`
        group relative inline-flex items-center justify-center gap-2
        px-6 py-3 rounded-xl select-none
        font-semibold uppercase tracking-[0.18em]
        shadow-[inset_0_0_0_2px_rgba(202,138,4,0.9),0_10px_20px_-5px_rgba(0,0,0,0.35)]
        transition-all duration-200 ease-out
        hover:-translate-y-0.5
        active:translate-y-0 active:brightness-[0.98]
        focus:outline-none focus:ring-4 focus:ring-amber-400/30
        before:absolute before:inset-[2px] before:rounded-[10px]
        before:bg-gradient-to-b before:from-white/15 before:to-black/10
        before:pointer-events-none
        ${!isReady 
          ? 'bg-gradient-to-br from-yellow-500 via-amber-400 to-yellow-600 text-slate-900 ring-1 ring-yellow-700/40 hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500'
          : 'bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 text-white ring-1 ring-emerald-700/40 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500' 
        }
        ${className}
      `}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`h-5 w-5 drop-shadow-[0_1px_0_rgba(255,255,255,0.25)] ${!isReady ? 'text-yellow-950/60' : 'text-emerald-950/60'}`}
      >
        <path
          fill="currentColor"
          d="M11.3 3.2c-.9 2.1-2.7 3.4-4.7 4.2 1 .6 2 1.4 2.6 2.5-2.4-.1-4.2-1.2-5.7-3 .2 2.8 1.6 4.9 3.9 6.1-1.6.6-3.3.5-5-.1 1.3 2.5 3.3 4 6 4.4-.9.8-2 1.3-3.4 1.6 2.7 1.3 5.3 1 7.7-.8 2.4 1.8 5 2.1 7.7.8-1.4-.3-2.5-.8-3.4-1.6 2.7-.4 4.7-1.9 6-4.4-1.7.6-3.4.7-5 .1 2.3-1.2 3.7-3.3 3.9-6.1-1.5 1.8-3.3 2.9-5.7 3 .6-1.1 1.6-1.9 2.6-2.5-2-.8-3.8-2.1-4.7-4.2-.4.9-.8 1.6-1.4 2.3-.6.6-1.3 1.1-2.2 1.5-.9-.4-1.6-.9-2.2-1.5-.6-.7-1-1.4-1.4-2.3Z"
        />
      </svg>

      <span className="drop-shadow-[0_1px_0_rgba(255,255,255,0.35)]">{children}</span>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`h-5 w-5 rotate-180 drop-shadow-[0_1px_0_rgba(255,255,255,0.25)] ${!isReady ? 'text-yellow-950/60' : 'text-emerald-950/60'}`}
      >
        <path
          fill="currentColor"
          d="M11.3 3.2c-.9 2.1-2.7 3.4-4.7 4.2 1 .6 2 1.4 2.6 2.5-2.4-.1-4.2-1.2-5.7-3 .2 2.8 1.6 4.9 3.9 6.1-1.6.6-3.3.5-5-.1 1.3 2.5 3.3 4 6 4.4-.9.8-2 1.3-3.4 1.6 2.7 1.3 5.3 1 7.7-.8 2.4 1.8 5 2.1 7.7.8-1.4-.3-2.5-.8-3.4-1.6 2.7-.4 4.7-1.9 6-4.4-1.7.6-3.4.7-5 .1 2.3-1.2 3.7-3.3 3.9-6.1-1.5 1.8-3.3 2.9-5.7 3 .6-1.1 1.6-1.9 2.6-2.5-2-.8-3.8-2.1-4.7-4.2-.4.9-.8 1.6-1.4 2.3-.6.6-1.3 1.1-2.2 1.5-.9-.4-1.6-.9-2.2-1.5-.6-.7-1-1.4-1.4-2.3Z"
        />
      </svg>

      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-xl ${!isReady ? 'ring-2 ring-yellow-900/20' : 'ring-2 ring-emerald-900/20'}`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-1 rounded-[10px] ${!isReady ? 'ring-1 ring-yellow-50/40' : 'ring-1 ring-emerald-50/40'}`}
      />
    </button>
  )
}


        
  