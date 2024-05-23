'use client'

import { DonutChart, Legend } from '@tremor/react'
import colors from 'tailwindcss/colors'

export default function RejectionsChart(props) {
  const sales = [
    {
      name: 'Blocked Caller ID',
      sales: 980,
    },
    {
      name: 'Area Code Not Found',
      sales: 456,
    },
    {
      name: 'Federal DNC',
      sales: 390,
    },
    {
      name: 'Invalid DNIS',
      sales: 240,
    },
    {
      name: 'Easter Egg',
      sales: 190,
    },
  ]
  const colorTheme = ['#697077', '#697077', '#878d96', '#a3aab1', '#c1c7cd']

  const valueFormatter = (number: number) => {
    return `$ ${Intl.NumberFormat('us').format(number).toString()}`
  }

  return (
    // The height used here matches the height of the heat map svg src\components\overview\figures\lead-map\LeadMap.tsx
    <figure className="custom-top-margin bg-white">
      <h2 className="font-bold title-indent">Rejections</h2>
      <div className="flex items-center justify-center space-x-6 h-full py-[50px]">
        <DonutChart
          data={sales}
          category="sales"
          index="name"
          valueFormatter={valueFormatter}
          colors={colorTheme}
          className="w-40"
          showLabel={false}
        />
        <Legend
          categories={[
            'Blocked Caller ID',
            'Area Code Not Found',
            'Federal DNC',
            'Invalid DNIS',
            'Easter Egg',
          ]}
          colors={colorTheme}
          className="w-48"
          style={{
            zIndex: 0,
          }}
        />
      </div>
    </figure>
  )
}
