function _1(md){return(
md`# HW04 Strong baseline`
)}

function _chart(width,d3,data)
{
  const height = Math.min(width, 1000);
  const radius = Math.min(width, height) / 2;

  const arc = d3.arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

  const pie = d3.pie()
      .padAngle(1 / radius)
      .sort(null)
      .value(d => d.value);

  const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
    .selectAll()
    .data(pie(data))
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
    .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
    .selectAll()
    .data(pie(data))
    .join("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .call(text => text.append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString("en-US")));

  return svg.node();
}


function _3(md){return(
md`<h2>結論</h2>
<h3>
  工作類型與您對於「台灣 2050 淨零排放」政策的瞭解在那個相對位置
  <br>
  <br>
  從上圖中，我們可以看出：
  <ul>
    <li>2050 淨零排放的瞭解程度高於3的並不多</li>
    <li>大部分的人對於2050 淨零排放的瞭解程度都在3或2</li>
  </ul>
</h3>`
)}

function _artist(FileAttachment){return(
FileAttachment("artist.csv").csv()
)}

function _artist_columnKey1(artist){return(
Object.keys(artist[0])[1]
)}

function _artist_columnKey2(artist){return(
Object.keys(artist[0])[9]
)}

function _artist_Column1(artist,artist_columnKey1){return(
artist.map(row => row[artist_columnKey1])
)}

function _artist_Column2(artist,artist_columnKey2){return(
artist.map(row => row[artist_columnKey2])
)}

function _scatterplotData(artist_Column1,artist_Column2){return(
artist_Column1.map((value, index) => {
    return { x: value, y: artist_Column2[index]};
})
)}

function _scatterplotData_counts(scatterplotData){return(
scatterplotData.reduce((counts, point) => {
    const key = `${point.x}-${point.y}`;
    counts[key] = (counts[key] || 0) + 1;
    return counts;
}, {})
)}

function _data(scatterplotData_counts){return(
Object.keys(scatterplotData_counts).map((key) => {
    return { name:key, value: scatterplotData_counts[key] };
})
)}

function _12(data){return(
data.sort((a, b) => {
    // 如果 name 是數字，可以使用 a.name - b.name
    // 如果 name 是字串，可以使用 a.name.localeCompare(b.name)
    return a.name.localeCompare(b.name);
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artist.csv", {url: new URL("./artist.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["width","d3","data"], _chart);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("artist")).define("artist", ["FileAttachment"], _artist);
  main.variable(observer("artist_columnKey1")).define("artist_columnKey1", ["artist"], _artist_columnKey1);
  main.variable(observer("artist_columnKey2")).define("artist_columnKey2", ["artist"], _artist_columnKey2);
  main.variable(observer("artist_Column1")).define("artist_Column1", ["artist","artist_columnKey1"], _artist_Column1);
  main.variable(observer("artist_Column2")).define("artist_Column2", ["artist","artist_columnKey2"], _artist_Column2);
  main.variable(observer("scatterplotData")).define("scatterplotData", ["artist_Column1","artist_Column2"], _scatterplotData);
  main.variable(observer("scatterplotData_counts")).define("scatterplotData_counts", ["scatterplotData"], _scatterplotData_counts);
  main.variable(observer("data")).define("data", ["scatterplotData_counts"], _data);
  main.variable(observer()).define(["data"], _12);
  return main;
}
