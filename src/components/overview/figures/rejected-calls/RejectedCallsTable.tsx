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

export function RejectedCallsTable(props) {
  const switchContext = useContext(SwitchIQContext)

  const [rejectedCallRecords, setRejectedCallsData] = useState([])
  const renderBy = 2000
  const [dataRenderingLength, setDataRenderingLength] = useState(renderBy)
  const [loadingState, setLoadingState] = useState<boolean>(true)

  useEffect(() => {
    setLoadingState(true)
    setDataRenderingLength(renderBy)
    if (switchContext.rejectedCallRecords) {
      console.log('setting data', {
        rejectedCallRecords: switchContext.rejectedCallRecords,
      })
      setRejectedCallsData(switchContext.rejectedCallRecords as [])
      if (switchContext.rejectedCallRecords.length == 0) {
        setLoadingState(false)
      }
    }
  }, [switchContext.rejectedCallRecords])

  function renderMoreRows(e) {
    const scrolledToBottom =
      Math.abs(
        e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop
      ) <= 1
    if (scrolledToBottom) {
      setDataRenderingLength((curr) => {
        if (curr < switchContext.rejectedCallRecords.length) {
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

  return (
    <div className="custom-top-padding">
      <h2 className="font-bold pb-3 pl-2">Rejected Calls</h2>
      <div className="border ring-0 border-gray-400">
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
                <TableHeaderCell>DID</TableHeaderCell>
                <TableHeaderCell>DNIS</TableHeaderCell>
                <TableHeaderCell>SIP Code</TableHeaderCell>
                <TableHeaderCell>SIP Message</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rejectedCallRecords
                .slice(0, dataRenderingLength)
                .map((data, i) => (
                  <RejectedCallsRow data={data} key={i} />
                ))}
            </TableBody>
            <TableFoot>
              <TableRow>
                {/* <TableCell></TableCell> */}
                <TableCell
                  colSpan={7}
                  className="text-center recentCalls-Loading"
                >
                  {loadingState
                    ? 'Loading'
                    : `All rows are rendered (${rejectedCallRecords.length} rows)`}
                </TableCell>
              </TableRow>
            </TableFoot>
          </table>
        </div>
      </div>
    </div>
  )
}

function RejectedCallsRow({
  data,
}: {
  data: {
    did: string
    dnis: string
    sipCode: number
    sipMessage: string
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
      <TableCell>{data.did}</TableCell>
      <TableCell>{data.dnis}</TableCell>
      <TableCell>{data.sip_code}</TableCell>
      <TableCell>{data.sip_message}</TableCell>
    </TableRow>
  )
}
