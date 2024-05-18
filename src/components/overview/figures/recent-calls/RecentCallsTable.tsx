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

export function RecentCalls(props) {
  const dummyData = [
    {
      callTime: '2024-05-18T21:27:39.194Z',
      sourceIp: '151.218.9.255',
      did: '(206) 342-8631',
      dnis: '(717) 550-1675',
      sipCode: 574,
      sipMessage: 'OK',
    },
    {
      callTime: '2024-05-18T21:27:39.194Z',
      sourceIp: '151.218.9.255',
      did: '(206) 342-8631',
      dnis: '(717) 550-1675',
      sipCode: 574,
      sipMessage: 'OK',
    },
  ]

  return (
    <div className="custom-top-padding">
      <h2 className="font-bold pb-3 pl-2">Recent Calls</h2>
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
              <TableHeaderCell>Call Time</TableHeaderCell>
              <TableHeaderCell>Source IP</TableHeaderCell>
              <TableHeaderCell>DID</TableHeaderCell>
              <TableHeaderCell>DNIS</TableHeaderCell>
              <TableHeaderCell>SIP Code</TableHeaderCell>
              <TableHeaderCell>SIP Message</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dummyData.map((recentCall, i) => (
              <CallRow data={recentCall} key={i} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function CallRow({
  data,
}: {
  data: {
    callTime: string
    sourceIp: string
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
      <TableCell>{data.callTime}</TableCell>
      <TableCell>{data.sourceIp}</TableCell>
      <TableCell>{data.did}</TableCell>
      <TableCell>{data.dnis}</TableCell>
      <TableCell>{data.sipCode}</TableCell>
      <TableCell>{data.sipMessage}</TableCell>
    </TableRow>
  )
}
