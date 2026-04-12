'use cache'

import { cacheLife } from 'next/cache'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { ClientOnly } from '@/components/client-only'
import { FloatingHeader } from '@/components/floating-header'
import { ScrollArea } from '@/components/scroll-area'
import { BilingualContent } from '@/components/writing/bilingual-content'
import { WritingViews } from '@/components/writing-views'
import { getAllPostSlugs, getPost, getWritingSeo } from '@/lib/contentful'
import { getDateTimeFormat, isDevelopment } from '@/lib/utils'

export async function generateStaticParams() {
  const allPosts = await getAllPostSlugs()
  const posts = allPosts.map((post) => ({ slug: post.slug }))
  return posts.length > 0 ? posts : [{ slug: '__placeholder' }]
}

async function fetchData(slug) {
  'use cache'

  const { isEnabled } = await draftMode()
  const data = await getPost(slug, isDevelopment ? true : isEnabled)
  if (!data) notFound()

  return {
    data
  }
}

export default async function WritingSlug(props) {
  cacheLife('max')
  const params = await props.params
  const { slug } = params
  const { data } = await fetchData(slug)

  const {
    title,
    titleTr,
    date,
    seo: { title: seoTitle, description: seoDescription },
    content,
    contentTr,
    sys: { firstPublishedAt, publishedAt: updatedAt }
  } = data

  const postDate = date || firstPublishedAt
  const dateString = getDateTimeFormat(postDate)
  const datePublished = new Date(postDate).toISOString()
  const dateModified = new Date(updatedAt).toISOString()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: seoTitle,
    description: seoDescription,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: 'Sakıp Han Dursun'
    },
    url: `https://sakiphan.dev/writing/${slug}`
  }

  return (
    <>
      <ScrollArea className="bg-white" useScrollAreaId>
        <FloatingHeader scrollTitle={title} goBackLink="/writing">
          <WritingViews slug={slug} />
        </FloatingHeader>
        <div className="content-wrapper @container/writing">
          <article className="content">
            <BilingualContent
              content={content}
              contentTr={contentTr}
              title={title}
              titleTr={titleTr}
              dateString={dateString}
              postDate={postDate}
            />
          </article>
        </div>
      </ScrollArea>
      <ClientOnly>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }} />
      </ClientOnly>
    </>
  )
}

export async function generateMetadata(props) {
  const params = await props.params
  const { slug } = params
  const seoData = await getWritingSeo(slug)
  if (!seoData) return null

  const {
    date,
    seo: { title, description, keywords },
    sys: { firstPublishedAt, publishedAt: updatedAt }
  } = seoData

  const siteUrl = `/writing/${slug}`
  const postDate = date || firstPublishedAt
  const publishedTime = new Date(postDate).toISOString()
  const modifiedTime = new Date(updatedAt).toISOString()

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      ...(updatedAt && {
        modifiedTime
      }),
      url: siteUrl,
      images: siteUrl + '/og.png'
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
