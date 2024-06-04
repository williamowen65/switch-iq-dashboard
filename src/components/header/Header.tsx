'use client'

import { Tab, TabGroup, TabList, Badge, DateRangePicker } from '@tremor/react'

import Link from 'next/link'
import { useState } from 'react'
import { DataFilter } from './DataFilter'
import classes from './Header.module.css'

export default function Header(props) {
  const [index, setIndex] = useState(0)
  return (
    <>
      <header>
        <div className="flex items-baseline justify-between">
          <Link href="/overview" onClick={() => setIndex(0)}>
            <h1 className="text-4xl">SwitchIQ</h1>
          </Link>
        </div>

        <TabGroup className="" index={index} onIndexChange={setIndex}>
          <div className="flex justify-between items-baseline flex-wrap">
            <TabList variant="line" defaultValue="1">
              <Link href="/overview">
                <Tab className={classes.tab} value="1">
                  Overview
                </Tab>
              </Link>
              <Link href="/bad-leads">
                <Tab className={classes.tab} value="2">
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
                <Tab className={classes.tab} value="3">
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
                <Tab className={classes.tab} value="3">
                  Clients
                </Tab>
              </Link>

              <Tab className={classes.tab} value="3">
                ...
              </Tab>
            </TabList>
            <DataFilter />
          </div>
        </TabGroup>
      </header>
    </>
  )
}
