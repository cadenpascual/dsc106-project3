// index.js
// import the d3 library
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

// Load the data from the CSV file
d3.csv("Food_Log_009.csv").then(data => {
    // Parse the data
    data.forEach(d => {
        d.time = d3.timeParse("%H:%M:%S")(d.time);
    });

    // Group data by time and calculate average total_carb
    const averageCarbByTime = d3.rollup(data, v => d3.mean(v, d => d.calorie), d => d.time.getHours());

    // Convert the map to an array
    const averageCarbArray = Array.from(averageCarbByTime, ([time, avgCarb]) => ({ time, avgCarb }));
    console.log(averageCarbArray);

    // Set up the SVG canvas dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const x = d3.scaleBand()
        .domain([0,2,4,6,8,10,12,14,16,18,20,22])
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(averageCarbArray, d => d.avgCarb)])
        .nice()
        .range([height, 0]);

    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the bars
    svg.selectAll(".bar")
        .data(averageCarbArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.time))
        .attr("y", d => y(d.avgCarb))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.avgCarb))
        .attr("fill", "steelblue");

    // Add x-axis label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", (width + margin.left + margin.right)/2  - 20)
        .attr("y", height + margin.bottom - 5)
        .text("Time (hours)");

    // Add y-axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -margin.left)
        .attr("y", -margin.top - 30)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Avg Calories");
});

d3.csv("Food_Log_009.csv").then(data => {
    // Parse the data
    data.forEach(d => {
        d.time = d3.timeParse("%H:%M:%S")(d.time);
    });

    // Group data by time and calculate average total_carb
    const averageCarbByTime = d3.rollup(data, v => d3.mean(v, d => d.total_carb), d => d.time.getHours());

    // Convert the map to an array
    const averageCarbArray = Array.from(averageCarbByTime, ([time, avgCarb]) => ({ time, avgCarb }));
    console.log(averageCarbArray);

    // Set up the SVG canvas dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const x = d3.scaleBand()
        .domain([0,2,4,6,8,10,12,14,16,18,20,22])
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(averageCarbArray, d => d.avgCarb)])
        .nice()
        .range([height, 0]);

    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the bars
    svg.selectAll(".bar")
        .data(averageCarbArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.time))
        .attr("y", d => y(d.avgCarb))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.avgCarb))
        .attr("fill", "rgb(210, 42, 42)");

    // Add x-axis label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", (width + margin.left + margin.right)/2  - 20)
        .attr("y", height + margin.bottom - 5)
        .text("Time (hours)");

    // Add y-axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -margin.left)
        .attr("y", -margin.top - 30)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Avg Carbs (grams)");
});

d3.csv("Food_Log_009.csv").then(data => {
    // Parse the data
    data.forEach(d => {
        d.time = d3.timeParse("%H:%M:%S")(d.time);
    });

    // Group data by time and calculate average total_carb
    const averageCarbByTime = d3.rollup(data, v => d3.mean(v, d => d.sugar), d => d.time.getHours());

    // Convert the map to an array
    const averageCarbArray = Array.from(averageCarbByTime, ([time, avgCarb]) => ({ time, avgCarb }));
    console.log(averageCarbArray);

    // Set up the SVG canvas dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 100 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const x = d3.scaleBand()
        .domain([0,2,4,6,8,10,12,14,16,18,20,22])
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(averageCarbArray, d => d.avgCarb)])
        .nice()
        .range([height, 0]);

    // Add the x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the bars
    svg.selectAll(".bar")
        .data(averageCarbArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.time))
        .attr("y", d => y(d.avgCarb))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.avgCarb))
        .attr("fill", "rgb(15, 104, 50)");

    // Add x-axis label
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", (width + margin.left + margin.right)/2  - 20)
        .attr("y", height + margin.bottom - 5)
        .text("Time (hours)");

    // Add y-axis label
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -margin.left)
        .attr("y", -margin.top - 30)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Avg Sugar (grams)");
});