// Define SVG area dimensions:
var svgWidth = 960
var svgHeight = 500

// Define chart margins and dimensions:
var margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
  }

var chartWidth = svgWidth - margin.left - margin.right
var chartHeight = svgHeight - margin.top - margin.bottom

// Select body, append SVG area to it, and set its dimensions:
var svg = d3.select("scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

// Append a group area, then set its margins:
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from csv file:
d3.csv("../data/data.csv").then(function(forceData) {

    console.log(forceData)



})