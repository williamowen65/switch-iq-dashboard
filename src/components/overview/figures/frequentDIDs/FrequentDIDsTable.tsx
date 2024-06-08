'use client'

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
import FilterStateContext from '@/store/filter-state-context'
import { useContext, useEffect, useState } from 'react'
import SwitchIQContext from '@/store/switchiq-api-context'

export function FrequentDIDsTable(props) {
  const switchContext = useContext(SwitchIQContext)

  const [dummyData, setDummyData] = useState([])
  const renderBy = 2000
  const [dataRenderingLength, setDataRenderingLength] = useState(renderBy)
  const [loadingState, setLoadingState] = useState<boolean>(true)

  useEffect(() => {
    setLoadingState(true)
    setDataRenderingLength(renderBy)
    if (switchContext.frequentDIDs) {
      console.log('setting data', { frequentDIDs: switchContext.frequentDIDs })
      setDummyData(switchContext.frequentDIDs as [])
    }
  }, [switchContext.frequentDIDs])

  // const dummyData = [
  //   {
  //     dids: '(206) 342-8631',
  //     totalCalls: '1,234',
  //     connectivity: '70%',
  //     asrConnected: '65%',
  //   },
  //   {
  //     dids: '(206) 342-8631',
  //     totalCalls: '1,234',
  //     connectivity: '70%',
  //     asrConnected: '65%',
  //   },
  // ]

  function calculateData(rowData) {
    rowData.total_calls = rowData.answered_calls + rowData.connected_calls
    rowData.connectivity = rowData.connected_calls
    rowData.asr_connected = rowData.answered_calls / rowData.connected_calls
    return rowData
  }

  function renderMoreRows(e) {
    const scrolledToBottom =
      Math.abs(
        e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop
      ) <= 1
    if (scrolledToBottom) {
      setDataRenderingLength((curr) => {
        if (curr < switchContext.frequentDIDs.length) {
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
      <h2 className="font-bold pb-3 pl-2">Frequent DIDs</h2>
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
                <TableHeaderCell>DIDs</TableHeaderCell>
                <TableHeaderCell>Total Calls</TableHeaderCell>
                <TableHeaderCell>Connectivity</TableHeaderCell>
                <TableHeaderCell>ASR (Connected)</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dummyData.map(calculateData).map((data, i) => (
                <FrequentDIDsRow data={data} key={i} />
              ))}
            </TableBody>
            <TableFoot>
              <TableRow>
                {/* <TableCell></TableCell> */}
                <TableCell colSpan={7} className="text-center ">
                  {loadingState === true && 'Loading'}
                  {loadingState === false && 'All rows are rendered'}
                </TableCell>
              </TableRow>
            </TableFoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export function FrequentDIDsRow({
  data,
}: {
  data: {
    did: string
    total_calls: string
    connectivity: string
    asr_connected: string
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
      <TableCell>{data.total_calls}</TableCell>
      <TableCell>{data.connectivity}</TableCell>
      <TableCell>{data.asr_connected}</TableCell>
    </TableRow>
  )
}
