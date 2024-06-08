'use client'

import { useContext, useEffect, useState } from 'react'
import SummaryCard from './SummaryCard'
import SwitchIQContext from '@/store/switchiq-api-context'

export default function SummaryCards(props) {
  const switchContext = useContext(SwitchIQContext)
  const [summary, setSummary] = useState([])
  const [loadingState, setLoadingState] = useState<boolean>(true)
  useEffect(() => {
    setLoadingState(true)
    if (switchContext.summary) {
      console.log('setting data', { summary: switchContext.summary })
      setSummary(switchContext.summary as [])
    }
  }, [switchContext.summary])

  return (
    <div className=" flex flex-wrap sm:flex-nowrap gap-x-4">
      <SummaryCard
        data={{
          title: 'CPS',
          value: '126*',
        }}
      ></SummaryCard>
      <SummaryCard
        data={{
          title: 'Connectivity',
          value: '93%*',
          subValue: '+1.2%*',
        }}
      ></SummaryCard>
      <SummaryCard
        data={{
          title: 'ASR (Connected)',
          value: `${
            summary[0]
              ? summary[0].total_calls != 0
                ? Math.round(
                    (summary[0].answered_calls / summary[0].connected_calls) *
                      100
                  ) + '%'
                : '0%'
              : 'Loading'
          }`,
          subValue: '+11%*',
        }}
      ></SummaryCard>
      <SummaryCard
        data={{
          title: 'ASR (Global)',
          value: `${
            summary[0]
              ? summary[0].total_calls != 0
                ? Math.round(
                    (summary[0].answered_calls / summary[0].total_calls) * 100
                  ) + '%'
                : '0%'
              : 'Loading'
          }`,
          subValue: '+5.2%*',
        }}
      ></SummaryCard>
    </div>
  )
}
