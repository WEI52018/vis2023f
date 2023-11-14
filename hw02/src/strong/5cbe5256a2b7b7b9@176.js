function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data@1.json").json()
)}

function _starSign(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "魔羯座", "水瓶座", "雙魚座"]
)}

function _yCounts(){return(
[]
)}

function _Constellations(data){return(
data.map(item => item.Constellation)
)}

function _6(yCounts,starSign,data)
{
  yCounts.length = 0; //將yCounts清空
  for (var i = 0; i <= 11; i++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({sign:starSign[i], gender:"male", count:0}); 
    //Object包含：1. 星座，2.男性，3.人數(設為0)
    yCounts.push({sign:starSign[i], gender:"female", count:0}); 
    //Object包含：1. 星座，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = x.Constellation*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return yCounts
}


function _plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _8(Plot,plot1,yCounts,starSign){return(
Plot.plot({
  marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,
  width:840,
  
  y: {grid: true, 
      label: "count"},  
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "sign", y: "count", tip: true , sort: {x: {starSign}}, fill:"gender"}),
  ]
})
)}

function _9(Plot,plot1,data,starSign){return(
Plot.plot({  
  marginTop: plot1.mt, 
	marginRight: plot1.mr, 
	marginBottom: plot1.mb, 
	marginLeft: plot1.ml,
  width:840,
  
	y: {grid: true, 
      label: "count"},  
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true ,})),
    Plot.axisX({tickFormat: i => starSign[i]}), 
    //D3.js axis.tickFormat() Function, https://www.geeksforgeeks.org/d3-js-axis-tickformat-function/
		Plot.gridY([0])
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data@1.json", {url: new URL("./data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("starSign")).define("starSign", _starSign);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("Constellations")).define("Constellations", ["data"], _Constellations);
  main.variable(observer()).define(["yCounts","starSign","data"], _6);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot1","yCounts","starSign"], _8);
  main.variable(observer()).define(["Plot","plot1","data","starSign"], _9);
  return main;
}
