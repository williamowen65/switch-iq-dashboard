// @ts-nocheck
import * as d3 from 'd3'

interface Tooltip {
  label: string
  value: string
}

interface GeoJSONFeature {
  center: [number, number]
  properties: {
    stateInitials: string
    name: string
    tooltip: {
      totalCalls: Tooltip
      connected: Tooltip
      answered: Tooltip
    }
  }
  initialsPositionCorrection: Object
  tooltipPositionCorrection: Object
  type: string
  geometry: Object
}

/**
 * This GeoJSON may be updated to have filtered info
 */
export default function renderMap(statesGeoJson) {
  // Create projection and path generator
  let projection = d3.geoAlbers().scale(700).translate([300, 190])

  const geoGenerator = d3.geoPath().projection(projection)

  // Mouse event for hiding the tooltip
  d3.select('svg#leadsMap').on('mouseover', (e) => {
    const element = e.target.nodeName
    if (element == 'svg') {
      // Remove any existing tooltip
      document.querySelector('g.tooltip')?.remove()
    }
  })

  // Initializing object to append SVGs
  let statesMap = d3
    .select('svg#leadsMap')
    .select('g.map')
    .selectAll() // path, text
    .data(statesGeoJson.features as GeoJSONFeature[])

  // Appending a tooltip group after all other paths, so tooltips appear on top
  let toolTipMap = d3.select('svg#leadsMap').select('g.mapToolTip')

  // Adding the state paths to the SVG
  const group = statesMap.enter().append('g')
  group
    .attr('class', (d) => d.properties.stateInitials)
    .append('path')
    .attr('d', geoGenerator)
    .style('fill', applyHeat)
    .call(setToolTipListener)

  function applyHeat(d) {
    const heat = d.properties.heat
    if (heat > 70) return '#4d5255'
    else if (heat > 50) return '#5d6165'
    else if (heat > 30) return '#878d92'
    else return '#e4e7eb'
  }

  // Set listener to show one tooltip at a time
  function setToolTipListener(selection) {
    selection.on('mouseover', showToolTip)

    function showToolTip(e) {
      // Remove any existing tooltip
      document.querySelector('g.tooltip')?.remove()

      const stateData = e.target.__data__
      const toolTip = toolTipMap
        .append('g')
        .data([stateData])
        .attr('class', (d) => `tooltip tooltip-${d.properties.stateInitials}`)
        .append('g')
        .attr('class', 'tooltip')
        .attr('data-state', (d) => d.properties.stateInitials)
        .call((selection) => centerItemOnState(selection, geoGenerator))

      toolTip
        .append('rect')
        .attr('width', 200)
        .attr('height', 100)
        .attr('fill', 'white')
        .attr('stroke', 'black')

      const padding = 5

      toolTip
        .append('text')
        .text((d) => d.properties.name)
        .attr('x', 10)
        .attr('y', 20 + padding)
        .style('font-weight', 'bold')

      const tooltipValues = Object.values(stateData.properties.tooltip)

      // const longestLabelLength = tooltipValues.reduce((acc, curr) => {
      //   const label = curr.label
      //   if (label.length > acc) acc = label.length
      //   return acc
      // }, 0)

      // console.log({ longestLabelLength })

      tooltipValues.forEach(
        (entry: { label: string; value: string }, i: number) => {
          toolTip
            .append('text')
            .text((d) => `${entry.label}: ${entry.value}`)
            .attr('x', 10)
            .attr('y', 40 + 20 * i + padding)
        }
      )
    }
  }

  // Adding the state initials on top of states
  group
    .insert('text')
    .attr('class', 'stateLabels')
    .text((d) => d.properties.stateInitials)
    .call((selection) => centerItemOnState(selection, geoGenerator))
    .call(setToolTipListener)

  // Helper function for centering items
  // Applies corrections needed for initials and tooltips
  function centerItemOnState(selection, path) {
    // Handling tooltips and stateInitials below with this variable
    const selectionType = selection._groups[0][0].className.baseVal

    // Corrections for items (Some were flowing off the svg and some "centers" of states were odd b/c of the state shape)
    const stateInitialPositionCorrections = getStateInitialPositionCorrections()
    const stateToolTipPositionCorrections = getStateToolTipPositionCorrections()

    // For all stateInitialPositionCorrections, we color them black, but not these ones
    const forceWhiteInitials: string[] = ['FL', 'MI']

    // Assigning extra properties to GeoJSON features GeoPermissibleObjects
    selection.each((d: GeoJSONFeature) => {
      d.center = geoGenerator.centroid(d) // Where is the center of the state on the SVG?
      d.initialsPositionCorrection = // Possibly undefined, correct position info
        stateInitialPositionCorrections[d.properties.stateInitials]
      d.tooltipPositionCorrection = // Possibly undefined, correct position info
        stateToolTipPositionCorrections[d.properties.stateInitials]
    })

    // State initials
    if (selectionType == 'stateLabels') {
      selection
        .style('fill', (d) => {
          // White is defined in  (Global css)
          if (
            d.initialsPositionCorrection &&
            !forceWhiteInitials.includes(d.properties.stateInitials)
          )
            return 'black'
        })
        .attr('x', (d) => {
          let initialPoint = d.center[0] - 10
          if (d.initialsPositionCorrection) {
            return initialPoint + d.initialsPositionCorrection.x
          } else {
            return initialPoint
          }
        })
        .attr('y', (d) => {
          let initialPoint = d.center[1] + 5
          if (d.initialsPositionCorrection) {
            return initialPoint + d.initialsPositionCorrection.y
          } else {
            return initialPoint
          }
        })
    }

    // Tooltip
    if (selectionType == 'tooltip') {
      selection.attr('transform', (d) => {
        let initialPointX =
          d.center[0] -
          100 +
          (d.tooltipPositionCorrection ? d.tooltipPositionCorrection.x : 0)
        let initialPointY =
          d.center[1] -
          120 +
          (d.tooltipPositionCorrection ? d.tooltipPositionCorrection.y : 0)
        return `translate(${initialPointX}, ${initialPointY})`
      })
    }

    return selection
  }
}

function getStateToolTipPositionCorrections() {
  return {
    ME: { x: -100, y: 130 },
    NH: { x: -50, y: 130 },
    MA: { x: -50, y: 0 },
    RI: { x: -50, y: 0 },
    CT: { x: -50, y: 0 },
    NJ: { x: -50, y: 0 },
    DE: { x: -50, y: 0 },
    MD: { x: -50, y: 0 },
    WA: { x: 0, y: 130 },
    OR: { x: 0, y: 60 },
    ID: { x: 0, y: 130 },
    MT: { x: 0, y: 130 },
    ND: { x: 0, y: 130 },
    MN: { x: 0, y: 130 },
    WI: { x: 0, y: 130 },
    MI: { x: 0, y: 130 },
    NY: { x: 0, y: 130 },
    VT: { x: 0, y: 130 },
    SD: { x: 0, y: 30 },
  }
}

function getStateInitialPositionCorrections() {
  return {
    HI: { x: 0, y: 0 },
    VT: { x: 0, y: -25 },
    NH: { x: 30, y: 0 },
    MA: { x: 30, y: 0 },
    RI: { x: 25, y: 6 },
    CT: { x: 17, y: 10 },
    NJ: { x: 20, y: 0 },
    DE: { x: 20, y: 0 },
    MD: { x: 30, y: 10 },
    FL: { x: 13, y: 0 },
    MI: { x: 10, y: 10 },
  }
}
