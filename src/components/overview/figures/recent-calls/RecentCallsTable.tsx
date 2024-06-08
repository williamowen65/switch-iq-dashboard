'use client'

import SwitchIQContext from '@/store/switchiq-api-context'
import { selectAll } from '@/utils/common'
import {
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import { useContext, useEffect, useState } from 'react'

export function RecentCalls(props) {
  const switchContext = useContext(SwitchIQContext)

  const [recentCalls, setRecentCalls] = useState([])
  const renderBy = 2000
  const [dataRenderingLength, setDataRenderingLength] = useState(renderBy)
  const [loadingState, setLoadingState] = useState<boolean>(true)

  useEffect(() => {
    setLoadingState(true)
    setDataRenderingLength(renderBy)
    if (switchContext.callRecords) {
      console.log('setting data', { callRecords: switchContext.callRecords })
      setRecentCalls(switchContext.callRecords as [])
    }
  }, [switchContext.callRecords])

  function renderMoreRows(e) {
    const scrolledToBottom =
      Math.abs(
        e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop
      ) <= 1
    if (scrolledToBottom) {
      setDataRenderingLength((curr) => {
        if (curr < switchContext.callRecords.length) {
          curr += renderBy
          return curr
        } else {
          setLoadingState(false)
          // console.log({ dataRenderingLength: curr })
          return curr
        }
      })
    }
  }

  // If the user scrolls near the bottom of the table, we can render more data

  return (
    <div className="custom-top-padding ">
      <h2 className="font-bold pb-3 pl-2">Recent Calls</h2>
      <div className=" border ring-0 border-gray-400">
        {/* showing: {dataRenderingLength} */}
        <div
          className="tremor-Table-root"
          style={{ overflowY: 'scroll', height: '50vh' }}
          onScroll={renderMoreRows}
        >
          <table className="tremor-Table-table w-full text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <TableHead
              style={{ position: 'sticky', top: 0, background: '#dee2e3' }}
            >
              <TableRow>
                <TableHeaderCell>
                  <input
                    type="checkbox"
                    id="selectAll"
                    className=""
                    style={{
                      boxShadow: 'none',
                    }}
                    onChange={selectAll}
                  />
                </TableHeaderCell>
                <TableHeaderCell>Call Time</TableHeaderCell>
                <TableHeaderCell>Source IP</TableHeaderCell>
                <TableHeaderCell>DID</TableHeaderCell>
                <TableHeaderCell>DNIS</TableHeaderCell>
                <TableHeaderCell>SIP Code</TableHeaderCell>
                <TableHeaderCell>SIP Message</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentCalls
                .slice(0, dataRenderingLength)
                .map((recentCall, i) => (
                  <CallRow data={recentCall} key={i} />
                ))}
            </TableBody>
            <TableFoot>
              <TableRow>
                {/* <TableCell></TableCell> */}
                <TableCell
                  colSpan={7}
                  className="text-center recentCalls-Loading"
                >
                  {loadingState ? 'Loading' : ''}
                </TableCell>
              </TableRow>
            </TableFoot>
          </table>
        </div>
      </div>
    </div>
  )
}

function CallRow({
  data,
}: {
  data: {
    timestamp: string
    source_ip: string
    did: string
    dnis: string
    sip_code: number
    sip_message: string
  }
}) {
  return (
    <TableRow>
      <TableCell>
        <input
          type="checkbox"
          style={{
            boxShadow: 'none',
          }}
        />
      </TableCell>
      <TableCell>{data.timestamp}</TableCell>
      <TableCell>{data.source_ip}</TableCell>
      <TableCell>{data.did}</TableCell>
      <TableCell>{data.dnis}</TableCell>
      <TableCell>{data.sip_code}</TableCell>
      <TableCell>{data.sip_message}</TableCell>
    </TableRow>
  )
}
