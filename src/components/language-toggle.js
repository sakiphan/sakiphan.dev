'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

export const LanguageToggle = ({ hasTranslation, onToggle }) => {
  const [lang, setLang] = useState('en')

  if (!hasTranslation) return null

  const switchTo = (next) => {
    if (next === lang) return
    setLang(next)
    onToggle?.(next)
  }

  return (
    <div className="inline-flex shrink-0 items-center rounded-md border bg-gray-50 p-0.5">
      <button
        onClick={() => switchTo('en')}
        className={cn(
          'rounded-sm px-2 py-0.5 text-xs font-medium transition-colors duration-200',
          lang === 'en' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchTo('tr')}
        className={cn(
          'rounded-sm px-2 py-0.5 text-xs font-medium transition-colors duration-200',
          lang === 'tr' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
        )}
      >
        TR
      </button>
    </div>
  )
}
