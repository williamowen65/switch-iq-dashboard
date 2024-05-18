'use client'

import * as d3 from 'd3'
import { statesGeoJson } from './data/state-10m'
import { useEffect, useRef } from 'react'
import renderMap from './renderMap'

export default function LeadMap(props) {
  const content = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (content.current) {
      renderMap()
    }
  }, [content.current])

  return (
    <figure className="leadsMap custom-top-margin sm:custom-right-margin">
      <h2>Leads Map</h2>
      <div id="content">
        {/* <svg width="600px" height="400px" ref={content}> */}
        <svg width="100%" height="400px" viewBox="0 0 570 400" ref={content}>
          {/* <svg
          width="600px"
          height="400px"
          viewBox="-100 -500 500 1000"
          ref={content}
        > */}
          <g className="map"></g>
        </svg>
      </div>
    </figure>
  )
}
