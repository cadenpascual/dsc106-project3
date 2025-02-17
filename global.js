import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

async function loadData(fileName) {
  try{
    let data = await d3.csv(fileName);
    console.log(data);
  }catch(err){
    console.log(err);
  }
}


loadData('./data/Food_Log_009.csv');