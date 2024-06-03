'use client'

import classes from './QuickFilters.module.css'
import FilterStateContext from '@/store/filter-state-context'
import { useContext } from 'react'

export default function QuickFilters(props) {
  const filterContext = useContext(FilterStateContext)

  const activeFilterStatus = filterContext.filterStatus

  return (
    <>
      {/* Testing the filter global store */}
      {/* <div>Active Filter = {JSON.stringify(activeFilterStatus)}</div> */}
      <div className="sm:flex flex-wrap hidden border ring-0 border-gray-400 w-fit">
        <div className={`${classes.filters} ${classes['always-selected']}`}>
          Quick Filters
        </div>
        <div className={classes.filters}>Client</div>
        <div className={classes.filters}>Call ID</div>
        <div className={classes.filters}>Source IP</div>
        <div className={classes.filters}>DID</div>
        <div className={classes.filters}>DNIS</div>
        <div className={classes.filters}>SIP Code</div>
        <div className={classes.filters}>SIP Message</div>
      </div>
    </>
  )
}
