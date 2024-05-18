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
      MI: {
        x: 10,
        y: 10,
      },
    }

    const forceWhiteInitials: string[] = ['FL', 'MI']

    /**
     * Create interface for  GeoPermissibleObjects plus extra properties
     */

    selection.each((d: d3.GeoPermissibleObjects) => {
      d.center = geoGenerator.centroid(d)
      d.corrections = pointerCorrections[d.properties.stateInitials]
    })

    // State initials
    if (selectionType == 'stateLabels') {
      selection
        .style('fill', (d) => {
          // White is defined in  (Global css)
          if (
            d.corrections &&
            !forceWhiteInitials.includes(d.properties.stateInitials)
          )
            return 'black'
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
    }

    // Tooltip
    if (selectionType == 'tooltip') {
      selection.attr('transform', (d) => {
        let initialPointX = d.center[0] - 100
        let initialPointY = d.center[1] - 120
        return `translate(${initialPointX}, ${initialPointY})`
      })
    }

    return selection
  }

  //   console.log(stateInitialsMap)
}
