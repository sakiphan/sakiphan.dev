'use cache'

import { cacheLife } from 'next/cache'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { RichText } from '@/components/contentful/rich-text'
import { FloatingHeader } from '@/components/floating-header'
import { GradientBg } from '@/components/gradient-bg'
import { PageTitle } from '@/components/page-title'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { ScrollArea } from '@/components/scroll-area'
import { getAllPageSlugs, getPage, getPageSeo } from '@/lib/contentful'
import { isDevelopment } from '@/lib/utils'

export async function generateStaticParams() {
  const allPages = await getAllPageSlugs()
  const pages = allPages
    .filter((page) => !page.hasCustomPage)
    .map((page) => ({
      slug: page.slug
    }))

  // Return a fallback to satisfy Next.js Cache Components requirement
  return pages.length > 0 ? pages : [{ slug: '__placeholder' }]
}

async function fetchData(slug) {
  'use cache'

  const { isEnabled } = await draftMode()
  const page = await getPage(slug, isDevelopment || isEnabled)
  if (!page) notFound()
  return { page }
}

export default async function PageSlug(props) {
  cacheLife('max')
  const params = await props.params
  const { slug } = params
  const {
    page: { title, content }
  } = await fetchData(slug)

  return (
    <ScrollArea useScrollAreaId>
      <GradientBg />
      <FloatingHeader scrollTitle={title} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={title} />
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <RichText content={content} />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}

export async function generateMetadata(props) {
  const params = await props.params
  const { slug } = params
  const seoData = await getPageSeo(slug)
  if (!seoData) return null

  const {
    seo: { title, description, keywords }
  } = seoData
  const siteUrl = `/${slug}`

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: siteUrl,
      images: siteUrl + '/og.png'
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
