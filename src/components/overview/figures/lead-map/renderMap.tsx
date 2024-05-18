import * as d3 from 'd3'
import { statesGeoJson } from './data/state-10m'
export default function renderMap() {
  let projection = d3.geoAlbers().scale(700).translate([300, 190])
  const geoGenerator = d3.geoPath().projection(projection)
  let statesMap = getMapSelection()
  let stateInitialsMap = getMapSelection()

  console.log({ statesMap })

  function getMapSelection() {
    return (
      d3
        .select('svg')
        // .append('text').text('Hellloooo').attr('x', 123)
        .select('g.map')
        .selectAll() // path, text
        .data(statesGeoJson.features)
    )
  }

  const group = statesMap.enter().append('g')
  group
    .attr('class', (d) => d.properties.stateInitials)
    .append('path')
    .attr('d', geoGenerator)
    .call(handleTooltip)

  group
    .insert('text')
    .attr('class', 'stateLabels')
    .text((d) => d.properties.stateInitials)
    .call((selection) => handleStateInitials(selection, geoGenerator))

  function handleTooltip(selection) {
    selection.append('title').text((d) => d.properties.name)
    return selection
  }

  function handleStateInitials(selection, path) {
    const pointerCorrections = {
      HI: {
        x: 0,
        y: 0,
      },
      VT: {
        x: 0,
        y: -25,
      },
      NH: {
        x: 30,
        y: 0,
      },
      MA: {
        x: 30,
        y: 0,
      },
      RI: {
        x: 25,
        y: 6,
      },
      CT: {
        x: 17,
        y: 10,
      },
      NJ: {
        x: 20,
        y: 0,
      },
      DE: {
        x: 20,
        y: 0,
      },
      MD: {
        x: 30,
        y: 10,
      },
      FL: {
        x: 13,
        y: 0,
      },
    }

    selection
      .each((d) => {
        d.center = geoGenerator.centroid(d)
        d.corrections = pointerCorrections[d.properties.stateInitials]
      })
      .style('fill', (d) => {
        // White is defined in  (Global css)
        if (d.corrections && d.properties.stateInitials !== 'FL') return 'black'
      })
      // .each((d) => console.log({ d }))
      .attr('x', (d) => {
        let initialPoint = d.center[0] - 10
        if (d.corrections) {
          return initialPoint + d.corrections.x
        } else {
          return initialPoint
        }
      })
      .attr('y', (d) => {
        let initialPoint = d.center[1] + 5
        if (d.corrections) {
          return initialPoint + d.corrections.y
        } else {
          return initialPoint
        }
      })
      .call(handleTooltip)

    return selection
  }

  //   console.log(stateInitialsMap)
}
