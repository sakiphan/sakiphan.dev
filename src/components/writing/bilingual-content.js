'use client'

import { useState } from 'react'

import { RichText } from '@/components/contentful/rich-text'
import { LanguageToggle } from '@/components/language-toggle'

export const BilingualContent = ({ content, contentTr, title, titleTr, dateString, postDate }) => {
  const [lang, setLang] = useState('en')
  const hasTranslation = !!contentTr

  const activeContent = lang === 'tr' && hasTranslation ? contentTr : content
  const activeTitle = lang === 'tr' && titleTr ? titleTr : title

  return (
    <>
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h1 style={{ textWrap: 'balance' }}>{activeTitle}</h1>
          <LanguageToggle hasTranslation={hasTranslation} onToggle={setLang} />
        </div>
        <time dateTime={postDate} className="text-gray-400">
          {dateString}
        </time>
      </div>
      <RichText content={activeContent} />
    </>
  )
}
