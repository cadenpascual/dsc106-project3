import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

async function loadData(fileName) {
  try{
    const parser =  fileName.startsWith("./data/Dexcom") ? parseGlucoseData : parseFoodData;
    const data = await d3.csv(fileName);
    return parser(data);
  }catch(err){
    console.log(err);
  }
}


function parseGlucoseData(glucoseData){
  return glucoseData.map(d => ({
    "timestamp": new Date(d.timestamp),
    "glucose": d.glucose 
  })); 
}

function parseFoodData(foodData){
  return foodData.map(d => ({
    "start": new Date(d.time_begin),
    "food": d.searched_food,
    "calories": d.calorie,
    "sugar": d.sugar,
    "amount": d.amount,
    "unit": d.unit
  }));
}

const width = 1000;
const height = 400;

let xScale;
let yScale;

function createGlucoseScatterplot(glucoseData){

  const svg = d3
      .select('#chart')
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('overflow', 'visible');

  xScale = d3
      .scaleTime()
      .domain(d3.extent(glucoseData, d => d.timestamp))
      .range([0, width])
      .nice();

  yScale = d3.scaleLinear()
      .domain([0, 250])
      .range([height, 0]);


  const margin = { top: 10, right: 10, bottom: 30, left: 20 };

  const usableArea = {
      top: margin.top,
      right: width - margin.right,
      bottom: height - margin.bottom,
      left: margin.left,
      width: width - margin.left - margin.right,
      height: height - margin.top - margin.bottom,
  };

  // Update scales with new ranges
  xScale.range([usableArea.left, usableArea.right]);
  yScale.range([usableArea.bottom, usableArea.top]);

  // Add gridlines BEFORE the axes
  const gridlines = svg
      .append('g')
      .attr('class', 'gridlines')
      .attr('transform', `translate(${usableArea.left}, 0)`);

  // Create gridlines as an axis with no labels and full-width ticks
  gridlines.call(d3.axisLeft(yScale).tickFormat('').tickSize(-usableArea.width));

  // Create the axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Add X axis
  svg
  .append('g')
  .attr('transform', `translate(0, ${usableArea.bottom})`)
  .call(xAxis);

  // Add Y axis
  svg 
  .append('g')
  .attr('transform', `translate(${usableArea.left}, 0)`)
  .call(yAxis);

  const dots = svg.append('g').attr('class', 'dots');

  dots
    .selectAll('circle')
    .data(glucoseData)
    .join('circle')
    .attr('cx', (d) => xScale(d.timestamp))
    .attr('cy', (d) => yScale(d.glucose))
    .attr('r', 2)
    .attr('fill', 'steelblue')
    .style('fill-opacity', 0.7)

}

function createFoodPlot(glucoseData, foodData){
  const svg = d3
      .select('#chart')
      .append('svg')
      .attr('viewBox', `0 0 ${width} 400`)
      .style('overflow', 'visible');

  const margin = { top: 10, right: 10, bottom: 30, left: 20 };

  const usableArea = {
      top: margin.top,
      right: width - margin.right,
      bottom: height - margin.bottom,
      left: margin.left,
      width: width - margin.left - margin.right,
      height: height - margin.top - margin.bottom,
  };

  const gridlines = svg
      .append('g')
      .attr('class', 'gridlines')
      .attr('transform', `translate(${usableArea.left}, 0)`);

  // Create gridlines as an axis with no labels and full-width ticks
  gridlines.call(d3.axisLeft(yScale).tickFormat('').tickSize(-usableArea.width));

  // Create the axes
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  // Add X axis
  svg
  .append('g')
  .attr('transform', `translate(0, ${usableArea.bottom})`)
  .call(xAxis);

  // Add Y axis
  svg 
  .append('g')
  .attr('transform', `translate(${usableArea.left}, 0)`)
  .call(yAxis);

  const dots = svg.append('g').attr('class', 'dots');

  dots
    .selectAll('circle')
    .data(foodData)
    .join('circle')
    .attr('cx', (d) => xScale(d.start))
    .attr('cy', 350)
    .attr('r', 3)
    .attr('fill', 'green')
    .style('fill-opacity', 0.7)
}

async function main(){
  
  let glucoseData = await loadData('./data/Dexcom_009.csv');
  let foodData = await loadData("./data/Food_Log_009.csv");
  console.log(glucoseData);
  createGlucoseScatterplot(glucoseData);
  createFoodPlot(glucoseData,foodData);

}

main();