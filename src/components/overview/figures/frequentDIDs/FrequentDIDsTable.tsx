'use client'

import { selectAll } from '@/utils/common'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import FilterStateContext from '@/store/filter-state-context'
import { useContext } from 'react'

export function FrequentDIDsTable(props) {
  const dummyData = [
    {
      dids: '(206) 342-8631',
      totalCalls: '1,234',
      connectivity: '70%',
      asrConnected: '65%',
    },
    {
      dids: '(206) 342-8631',
      totalCalls: '1,234',
      connectivity: '70%',
      asrConnected: '65%',
    },
  ]

  return (
    <div className="custom-top-padding">
      <h2 className="font-bold pb-3 pl-2">Frequent DIDs</h2>
      <div className="">
        <Table>
          <TableHead>
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
            {dummyData.map((data, i) => (
              <FrequentDIDsRow data={data} key={i} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export function FrequentDIDsRow({
  data,
}: {
  data: {
    dids: string
    totalCalls: string
    connectivity: string
    asrConnected: string
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
      <TableCell>{data.dids}</TableCell>
      <TableCell>{data.totalCalls}</TableCell>
      <TableCell>{data.connectivity}</TableCell>
      <TableCell>{data.asrConnected}</TableCell>
    </TableRow>
  )
}
