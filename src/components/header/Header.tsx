'use client'

import { Tab, TabGroup, TabList, Badge } from '@tremor/react'

import Link from 'next/link'
import { useState } from 'react'

export default function Header(props) {
  const [index, setIndex] = useState(0)
  return (
    <header>
      <Link href="/overview" onClick={() => setIndex(0)}>
        <h1 className="text-4xl">SwitchIQ</h1>
      </Link>

      <TabGroup className="w-max" index={index} onIndexChange={setIndex}>
        <TabList variant="line" defaultValue="1">
          <Link href="/overview">
            <Tab className="mr-0" value="1">
              Overview
            </Tab>
          </Link>
          <Link href="/bad-leads">
            <Tab className="mr-0" value="2">
              Bad Leads
              <Badge
                size="xs"
                className="rounded-tremor-full ml-2 bg-[#686f76] text-white"
              >
                270
              </Badge>
            </Tab>
          </Link>
          <Link href="/degraded-dids">
            <Tab className="mr-0" value="3">
              Degraded DIDs
              <Badge
                size="xs"
                className="rounded-tremor-full ml-2 bg-[#686f76] text-white"
              >
                23
              </Badge>
            </Tab>
          </Link>
          <Link href="/clients">
            <Tab className="mr-0" value="3">
              Clients
            </Tab>
          </Link>

          <Tab value="3">...</Tab>
        </TabList>
      </TabGroup>
    </header>
  )
}
