'use client'

import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue,
  Divider,
} from '@tremor/react'
import moment from 'moment'
import React, { useState } from 'react'

export function DataFilter(props) {
  const [value, setValue] = useState<DateRangePickerValue | null>(null)

  function handleSelection(val) {
    console.log({ val })
    if (val.selectValue == 'Custom') {
      // Open the picker
      setValue(null)
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
      setValue(val)
    }
  }
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const minutes5 = new Date()
  minutes5.setMinutes(today.getMinutes() - 5)
  const minutes10 = new Date()
  minutes5.setMinutes(today.getMinutes() - 10)
  const minutes30 = new Date()
  minutes5.setMinutes(today.getMinutes() - 30)
  const hour1 = new Date()
  hour1.setHours(today.getHours() - 1)
  const hour2 = new Date()
  hour2.setHours(today.getHours() - 2)
  const hour6 = new Date()
  hour6.setHours(today.getHours() - 6)
  const hour24 = new Date()
  hour24.setHours(today.getHours() - 24)
  const days7 = new Date()
  days7.setDate(today.getDate() - 7)
  const days30 = new Date()
  days30.setDate(today.getDate() - 30)

  return (
    <DateRangePicker
      value={value}
      onValueChange={handleSelection}
      style={{
        marginLeft: 'auto',
      }}
      className="tremor-date-picker"
    >
      <DateRangePickerItem value="today" from={today} to={today}>
        Today ({moment().format('MMM Do')})
      </DateRangePickerItem>
      <DateRangePickerItem value="yesterday" from={yesterday} to={yesterday}>
        Yesterday
      </DateRangePickerItem>
      <Divider className="my-0" />
      <DateRangePickerItem value="5 minutes" to={today} from={minutes5}>
        5 minutes
      </DateRangePickerItem>
      <DateRangePickerItem value="10 minutes" to={today} from={minutes10}>
        10 minutes
      </DateRangePickerItem>
      <DateRangePickerItem value="30 minutes" to={today} from={minutes30}>
        30 minutes
      </DateRangePickerItem>
      <Divider className="my-0" />
      <DateRangePickerItem value="1 hour" to={today} from={hour1}>
        1 hour
      </DateRangePickerItem>
      <DateRangePickerItem value="2 hours" to={today} from={hour2}>
        2 hours
      </DateRangePickerItem>
      <DateRangePickerItem value="6 hours" to={today} from={hour6}>
        6 hours
      </DateRangePickerItem>
      <DateRangePickerItem value="24 hours" to={today} from={hour24}>
        24 hours
      </DateRangePickerItem>
      <Divider className="my-0" />
      <DateRangePickerItem value="7 Days" to={today} from={days7}>
        7 days
      </DateRangePickerItem>
      <DateRangePickerItem value="30 Days" to={today} from={days30}>
        30 days
      </DateRangePickerItem>
      <Divider className="my-0" />
      <DateRangePickerItem value="Custom">Custom</DateRangePickerItem>
    </DateRangePicker>
  )
}
