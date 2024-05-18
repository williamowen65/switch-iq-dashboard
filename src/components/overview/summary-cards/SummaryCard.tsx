import { Card } from '@tremor/react'
import React from 'react'
import classes from './SummaryCard.module.css'

export default function SummaryCard({
  //   children,
  data,
}: {
  //   children: React.ReactNode
  data: {
    title: string
    value: string
    subValue?: string
  }
}) {
  return (
    <Card
      className={`custom-top-margin sm:custom-right-margin p-2 ${classes.summaryCard}`}
    >
      <div className="flex items-end justify-between">
        <div className="">
          <div className="text-xs">{data.title}</div>
          <div className="font-bold">{data.value}</div>
        </div>
        <div className="text-xs">{data.subValue}</div>
      </div>
    </Card>
  )
}
