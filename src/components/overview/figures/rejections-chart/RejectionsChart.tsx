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
  const categories = [
    'Blocked Caller ID',
    'Area Code Not Found',
    'Federal DNC',
    'Invalid DNIS',
    'Easter Egg',
  ]

  const valueFormatter = (number: number) => {
    return `$ ${Intl.NumberFormat('us').format(number).toString()}`
  }

  return (
    // The height used here matches the height of the heat map svg src\components\overview\figures\lead-map\LeadMap.tsx
    <figure className="custom-top-margin bg-white border ring-0 border-gray-400">
      <h2 className="font-bold title-indent">Rejections</h2>
      <div className="flex items-center justify-center space-x-6 h-full py-[50px] px-1">
        <DonutChart
          data={sales}
          category="sales"
          index="name"
          valueFormatter={valueFormatter}
          colors={colorTheme}
          className="w-40"
          showLabel={false}
        />
        <table>
          <tbody>
            {categories.map((category, i) => (
              <tr
                key={category}
                className=" items-baseline"
                style={{ border: 'none' }}
              >
                <td>
                  <div
                    className={`rounded-full w-2 h-2 bg-[${colorTheme[i]}] mr-2`}
                    style={{ verticalAlign: 'middle' }}
                  ></div>
                </td>
                <td className="text-nowrap">{category}</td>
                <td className="font-light px-4">100</td>
                <td className="font-bold">1.5%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
