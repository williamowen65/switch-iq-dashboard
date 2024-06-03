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
      className={`custom-top-margin p-2 px-4 ${classes.summaryCard} border ring-0 border-gray-400`}
    >
      <div className="flex items-end justify-between">
        <div className="">
          <div className="text-xs text-nowrap">{data.title}</div>
          <div className="font-bold text-lg">{data.value}</div>
        </div>
        <div className="text-xs">{data.subValue}</div>
      </div>
    </Card>
  )
}
