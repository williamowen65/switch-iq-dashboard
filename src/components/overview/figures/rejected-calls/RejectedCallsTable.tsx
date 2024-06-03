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

export function RejectedCallsTable(props) {
  const dummyData = [
    {
      did: '(206) 342-8631',
      dnis: '(221) 334-1432',
      sipCode: 574,
      sipMessage: 'Blocked Caller ID',
    },
    {
      did: '(206) 342-8631',
      dnis: '(221) 334-1432',
      sipCode: 574,
      sipMessage: 'Blocked Caller ID',
    },
  ]

  return (
    <div className="custom-top-padding">
      <h2 className="font-bold pb-3 pl-2">Rejected Calls</h2>
      <div className="border ring-0 border-gray-400">
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
              <TableHeaderCell>DID</TableHeaderCell>
              <TableHeaderCell>DNIS</TableHeaderCell>
              <TableHeaderCell>SIP Code</TableHeaderCell>
              <TableHeaderCell>SIP Message</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dummyData.map((data, i) => (
              <RejectedCallsRow data={data} key={i} />
            ))}
          </TableBody>
        </Table>
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
      <TableCell>{data.sipCode}</TableCell>
      <TableCell>{data.sipMessage}</TableCell>
    </TableRow>
  )
}
