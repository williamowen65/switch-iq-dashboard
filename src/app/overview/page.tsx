import { FrequentDIDsTable } from '@/components/overview/figures/frequentDIDs/FrequentDIDsTable'
import LeadMap from '@/components/overview/figures/lead-map/LeadMap'
import { RecentCalls } from '@/components/overview/figures/recent-calls/RecentCallsTable'
import { RejectedCallsTable } from '@/components/overview/figures/rejected-calls/RejectedCallsTable'
import RejectionsChart from '@/components/overview/figures/rejections-chart/RejectionsChart'
import QuickFilters from '@/components/overview/quick-filters/QuickFilters'
import SummaryCards from '@/components/overview/summary-cards/SummaryCards'
import classes from './page.module.css'
import { DateRangePicker } from '@tremor/react'

export default function Overview(props) {
  return (
    <>
      <main>
        <QuickFilters />
        <SummaryCards />
        <section>
          <RecentCalls suppressHydrationWarning={true} />
        </section>
        <section className={classes['grid-column-2']}>
          <LeadMap />
          <RejectionsChart />
        </section>
        <section className={classes['grid-column-2']}>
          <FrequentDIDsTable />
          <RejectedCallsTable />
        </section>
      </main>
    </>
  )
}
