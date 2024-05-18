'use client'

import * as d3 from 'd3'
import { statesGeoJson } from './data/state-10m'
import { useEffect, useRef } from 'react'
import renderMap from './renderMap'

export default function LeadMap(props) {
  //   console.log(d3)
  //   console.log({ statesGeoJson })
  const content = useRef<SVGSVGElement>(null)

  useEffect(() => {
    console.log('test', content.current)
    if (content.current) {
      renderMap()
      //   const map = d3.select('svg')

      //   map.append('text').text('Hellloooo').attr('x', 123)

      //   console.log({ map })

      //   content.current.append()
    }

    // svg.append('text').text('hi').attr('x', 20)
    // console.log({ svg })
    // renderMap(content.current)u
  }, [content.current])

  return (
    <figure className="leadsMap custom-top-margin custom-right-margin">
      <h2>Leads Map</h2>
      <div id="content">
        <svg width="600px" height="400px" ref={content}>
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
