// Define SVG area dimensions:
var svgWidth = 960
var svgHeight = 500

// Define chart margins and dimensions:
var margin = {
    top: 40,
    right: 60,
    bottom: 60,
    left: 60
  }

var chartWidth = svgWidth - margin.left - margin.right
var chartHeight = svgHeight - margin.top - margin.bottom

// Select body, append SVG area to it, and set its dimensions:
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

// Append a group area, then set its margins:
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// Load data from csv file:
d3.csv("assets/data/data.csv").then(function(demoData) {

  // Parse data as numbers:
  console.log(demoData)
  demoData.forEach(function(data) {
    data.poverty = +data.poverty
    data.healthcare = +data.healthcare
  })

  // Create scalar functions:
  var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(demoData, d => d.poverty)])
    .range([0, chartWidth])

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(demoData, d => d.healthcare)])
    .range([chartHeight, 0])

  // Create axis functions:
  var bottomAxis = d3.axisBottom(xLinearScale)
  var leftAxis = d3.axisLeft(yLinearScale)

  // Append axes to the chart:
  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis)

  chartGroup.append("g")
    .call(leftAxis)

  // Create circles to represent markers on chart:
  var circlesGroup = chartGroup.selectAll("circle")
  .data(demoData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.healthcare))
  .attr("r", "15")
  .attr("fill", "pink")
  .attr("opacity", ".5")

  // Add state abbreviations to circles:
  chartGroup.selectAll("null").data(demoData)
  .enter()
  .append("text")
  .text(function(d){
    return d.abbr})
  .attr("x",d => xLinearScale(d.poverty))
  .attr("y", d => yLinearScale(d.healthcare))
  .attr("text-anchor", "middle")
  .attr('fill', 'white')
  .attr('font-size', 10)

  // Create tooltip:
  var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`)
  })

  chartGroup.call(toolTip)

  // Create event listeners to display and hide the tooltip:
  circlesGroup.on("click", function(data) {
    toolTip.show(data, this)
  }).on("mouseout", function(data, index) {
      toolTip.hide(data)
    })

  // Create axes labels:
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Percent of Population Without Adequate Health Insurance")

  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top + 10})`)
    .attr("class", "axisText")
    .text("Percent of Population Experiencing Poverty")

})