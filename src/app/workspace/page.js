'use cache'

import { cacheLife } from 'next/cache'
import { FloatingHeader } from '@/components/floating-header'
import { GradientBg4 } from '@/components/gradient-bg'
import { Link } from '@/components/link'
import { PageTitle } from '@/components/page-title'
import { ScrollArea } from '@/components/scroll-area'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { WORKSPACE_ITEMS } from '@/lib/constants'
import { getPageSeo } from '@/lib/contentful'
import { isExternalLink } from '@/lib/utils'

export default async function Workspace() {
  cacheLife('max')

  return (
    <ScrollArea>
      <GradientBg4 />
      <FloatingHeader title="Workspace" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Workspace" />
          <div className="overflow-hidden rounded-lg border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[300px] px-4">Product</TableHead>
                  <TableHead className="min-w-[300px] px-4">Specs</TableHead>
                  <TableHead className="min-w-[70px] px-4 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WORKSPACE_ITEMS.map((item, itemIndex) => {
                  const isExternal = isExternalLink(item.url)

                  return (
                    <TableRow key={`workspace-item-${itemIndex}`}>
                      <TableCell className="px-4 py-3 font-medium">{item.title}</TableCell>
                      <TableCell className="px-4 py-3">{item.specs}</TableCell>
                      <TableCell className="px-4 py-3 font-medium">
                        <Link href={item.url}>{isExternal ? 'Buy' : 'Read'}</Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export async function generateMetadata() {
  const seoData = await getPageSeo('workspace')
  if (!seoData) return null

  const {
    seo: { title, description }
  } = seoData
  const siteUrl = '/workspace'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
