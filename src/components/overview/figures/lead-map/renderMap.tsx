import * as d3 from 'd3'

export default function renderMap(statesGeoJson) {
  console.log({ statesGeoJson })
  let projection = d3.geoAlbers().scale(700).translate([300, 190])
  const geoGenerator = d3.geoPath().projection(projection)
  let statesMap = d3
    .select('svg')
    .select('g.map')
    .selectAll() // path, text
    .data(statesGeoJson.features)

  let toolTipMap = d3.select('svg').select('g.mapToolTip')
  // .selectAll() // path, text
  // .data(statesGeoJson.features)

  console.log({ statesMap })

  const group = statesMap.enter().append('g')
  group
    .attr('class', (d) => d.properties.stateInitials)
    .append('path')
    .attr('d', geoGenerator)
    .call(setToolTipListener)

  function setToolTipListener(selection) {
    selection.on('mouseover', showToolTip)
    // selection.on('mouseleave', hideToolTip)

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

      toolTip
        .append('text')
        .text((d) => d.properties.name)
        .attr('x', 10)
        .attr('y', 20)
        .style('font-weight', 'bold')

      Object.values(stateData.properties.tooltip).forEach(
        (entry: { label: string; value: string }, i: number) => {
          toolTip
            .append('text')
            .text((d) => `${entry.label}: ${entry.value}`)
            .attr('x', 10)
            .attr('y', 40 + 20 * i)
        }
      )
    }
  }

  group
    .insert('text')
    .attr('class', 'stateLabels')
    .text((d) => d.properties.stateInitials)
    .call((selection) => centerItemOnState(selection, geoGenerator))
    .call(setToolTipListener)

  // const tooltip = toolTipMap
  //   .enter()
  //   .append('g')
  //   .attr('class', 'tooltip')
  //   .attr('data-state', (d) => d.properties.stateInitials)
  //   .call((selection) => centerItemOnState(selection, geoGenerator))
  //   .call(handleTooltip)

  // function setOnHover(selection) {

  // }

  function handleTooltip(selection) {
    // selection.append('title').text((d) => d.properties.name)

    selection.append('text').text((d) => d.properties.name)
    return selection
  }

  function centerItemOnState(selection, path) {
    const selectionType = selection._groups[0][0].className.baseVal //.nodeName

    // console.log({ selection, selectionType })

    const stateInitialPositionCorrections = getStateInitialPositionCorrections()
    const stateToolTipPositionCorrections = getStateToolTipPositionCorrections()

    const forceWhiteInitials: string[] = ['FL', 'MI']

    /**
     * Create interface for  GeoPermissibleObjects plus extra properties
     */

    selection.each((d: d3.GeoPermissibleObjects) => {
      d.center = geoGenerator.centroid(d)
      d.initialsPositionCorrection =
        stateInitialPositionCorrections[d.properties.stateInitials]
      d.tooltipPositionCorrection =
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
        // .each((d) => console.log({ d }))
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
        console.log({ d })
        // let initialPointX = d.center[0] - 100 + 0
        // let initialPointY = d.center[1] - 120 + 0
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

  //   console.log(stateInitialsMap)
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
    MI: {
      x: 10,
      y: 10,
    },
  }
}
