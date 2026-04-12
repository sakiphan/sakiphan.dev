'use cache'

import { cacheLife } from 'next/cache'
import NextLink from 'next/link'
import { Suspense } from 'react'

import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { ScrollArea } from '@/components/scroll-area'
import { Button } from '@/components/ui/button'
import { WritingList } from '@/components/writing-list'
import { getAllPosts } from '@/lib/contentful'
import { getItemsByYear, getSortedPosts } from '@/lib/utils'

async function fetchData() {
  'use cache'

  const allPosts = await getAllPosts()
  const sortedPosts = getSortedPosts(allPosts)
  const items = getItemsByYear(sortedPosts)
  return { items }
}

export default async function Home() {
  cacheLife('max')
  const { items } = await fetchData()

  return (
    <ScrollArea useScrollAreaId>
      <FloatingHeader scrollTitle="Sakıp Han Dursun" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Home" className="lg:hidden" />
          <p>
            Hi 👋 I'm Sakıp Han, a DevOps Team Lead based in Ankara, Turkey. I build and maintain infrastructure that
            handles 60-100M+ requests per month.
          </p>
          <p>
            At OCTAPULL, I lead the DevOps team where I architect CI/CD pipelines, manage multi-environment Kubernetes
            clusters, and run monitoring stacks with Grafana, Prometheus, and Zabbix. I've built GPU-accelerated MLOps
            environments, automated infrastructure with Terraform and Ansible, and designed systems for high availability
            and zero-downtime deployments.
          </p>
          <p>
            Previously, I worked at CloudSpade LLC on AWS infrastructure and microservices, and I concurrently manage
            on-premise infrastructure at Alpata Teknoloji. I also build open-source tools — CUDA Sentinel for GPU
            management and a Terraform Flask deployer with 1800+ downloads.
          </p>
          <Button asChild variant="link" className="inline px-0">
            <NextLink href="/writing">
              <h2 className="mt-8 mb-4">Writing</h2>
            </NextLink>
          </Button>
          <Suspense fallback={<ScreenLoadingSpinner />}>
            <WritingList items={items} header="Writing" />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
