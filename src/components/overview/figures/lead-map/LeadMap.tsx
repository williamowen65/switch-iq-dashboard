'use client'

import * as d3 from 'd3'
import { statesGeoJson } from './data/state-10m'
import { useEffect, useRef } from 'react'
import renderMap from './renderMap'

export default function LeadMap(props) {
  const content = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (content.current) {
      // console.log({ content: content.current })
      statesGeoJson.features.forEach((feat) => {
        const randomNumber = Math.floor(Math.random() * 100)
        feat.properties.heat = randomNumber
        feat.properties.tooltip = {
          totalCalls: {
            label: 'Total Calls',
            value: '23,344',
          },
          connected: {
            label: 'Connected',
            value: '23,432 (94%)',
          },
          answered: {
            label: 'Answered',
            value: '23,445 (67%)',
          },
        }
      })

      renderMap(statesGeoJson)
    }
  }, [content])

  return (
    <figure className="leadsMap custom-top-margin sm:custom-right-margin bg-white">
      <h2 className="font-bold title-indent">Leads Map</h2>
      <div id="content">
        <svg
          id="leadsMap"
          width="100%"
          height="400px"
          viewBox="0 0 570 400"
          ref={content}
        >
          {/* <svg
          width="600px"
          height="400px"
          viewBox="-100 -500 500 1000"
          ref={content}
        > */}
          <g className="map"></g>
          <g className="mapToolTip"></g>
        </svg>
      </div>
    </figure>
  )
}
