'use client'

import FilterStateContext from '@/store/filter-state-context'
import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
  Divider,
} from '@tremor/react'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import classes from './Header.module.css'

export function DataFilter(props) {
  // const [activeFilterStatus, filterContext.updateFilter] = useState<DateRangePickerValue | null>(null)

  const filterContext = useContext(FilterStateContext)

  const activeFilterStatus = filterContext.filterStatus

  function handleSelection(val) {
    // console.log({ val })
    if (val.selectValue == 'Custom') {
      // Open the picker instead of setting filterContext
      setTimeout(() => {
        // This set timeout is to work around tremor closing the dropdown on select custom
        const button = document.querySelector(
          '.tremor-date-picker button'
        ) as HTMLButtonElement
        if (button) {
          button.click()
        }
      }, 100)
    } else {
      filterContext.updateFilter(val)
    }
  }

  function getTodayStart() {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    return todayStart
  }
  function getTodayEnd() {
    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)
    return todayEnd
  }

  function getCurrentTime() {
    return new Date()
  }

  const todayStart = getTodayStart()

  const todayEnd = getTodayEnd()
  const currentTime = getCurrentTime()

  const yesterday = getTodayStart()
  yesterday.setDate(currentTime.getDate() - 1)
  const minutes5 = getCurrentTime()
  minutes5.setMinutes(currentTime.getMinutes() - 5)
  const minutes10 = getCurrentTime()
  minutes10.setMinutes(currentTime.getMinutes() - 10)
  const minutes30 = getCurrentTime()
  minutes30.setMinutes(currentTime.getMinutes() - 30)
  const hour1 = getCurrentTime()
  hour1.setHours(currentTime.getHours() - 1)
  const hour2 = getCurrentTime()
  hour2.setHours(currentTime.getHours() - 2)
  const hour6 = getCurrentTime()
  hour6.setHours(currentTime.getHours() - 6)
  const hour24 = getCurrentTime()
  hour24.setHours(currentTime.getHours() - 24)
  const days7 = getCurrentTime()
  days7.setDate(currentTime.getDate() - 7)
  const days30 = getCurrentTime()
  days30.setDate(currentTime.getDate() - 30)

  return (
    <div className="pt-2 flex">
      <DateRangePicker
        value={activeFilterStatus}
        onValueChange={handleSelection}
        style={{
          marginLeft: 'auto',
        }}
        className={'tremor-date-picker'}
      >
        <DateRangePickerItem value="today" from={todayStart} to={todayEnd}>
          Today ({moment().format('MMM Do')})
        </DateRangePickerItem>
        <DateRangePickerItem value="yesterday" from={yesterday} to={todayStart}>
          Yesterday
        </DateRangePickerItem>
        <Divider className="my-0" />
        <DateRangePickerItem value="5 minutes" to={currentTime} from={minutes5}>
          5 minutes
        </DateRangePickerItem>
        <DateRangePickerItem
          value="10 minutes"
          to={currentTime}
          from={minutes10}
        >
          10 minutes
        </DateRangePickerItem>
        <DateRangePickerItem
          value="30 minutes"
          to={currentTime}
          from={minutes30}
        >
          30 minutes
        </DateRangePickerItem>
        <Divider className="my-0" />
        <DateRangePickerItem value="1 hour" to={currentTime} from={hour1}>
          1 hour
        </DateRangePickerItem>
        <DateRangePickerItem value="2 hours" to={currentTime} from={hour2}>
          2 hours
        </DateRangePickerItem>
        <DateRangePickerItem value="6 hours" to={currentTime} from={hour6}>
          6 hours
        </DateRangePickerItem>
        <DateRangePickerItem value="24 hours" to={currentTime} from={hour24}>
          24 hours
        </DateRangePickerItem>
        <Divider className="my-0" />
        <DateRangePickerItem value="7 Days" to={currentTime} from={days7}>
          7 days
        </DateRangePickerItem>
        <DateRangePickerItem value="30 Days" to={currentTime} from={days30}>
          30 days
        </DateRangePickerItem>
        <Divider className="my-0" />
        <DateRangePickerItem value="Custom" to={null} from={null}>
          Custom
        </DateRangePickerItem>
      </DateRangePicker>
      <button className="bg-white px-2 py-1 rounded-md text-lg rounded-l-none border">
        &#8635;
      </button>
    </div>
  )
}
