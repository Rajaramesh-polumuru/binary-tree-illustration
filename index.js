document.getElementById("submitButton").addEventListener("click", (e) => {
  e.preventDefault();

  const inputArray = document
    .getElementById("inputArray")
    .value.split(",")
    .map(Number);

  const graphContainer = document.getElementById("graph-container");
  graphContainer.innerHTML = '<g class="links"></g><g class="nodes"></g>';

  const treeData = createBinaryTreeFromArray(inputArray);
  const root = d3.hierarchy(treeData);

  const treeLayout = d3.tree().size([400, 200]);
  treeLayout(root);

  const tree = d3.select("#tree");

  const treeNodes = tree
    .select("g.nodes")
    .selectAll("g.node")
    .data(root.descendants())
    .enter()
    .append("g")
    .classed("node", true)
    .call(handleEvents);

  treeNodes
    .append("circle")
    .classed("the-node solid", true)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 14)
    .attr("id", (d) => "node" + d.data.id)
    .style("fill", "#696969");

  treeNodes
    .append("text")
    .attr("class", "label")
    .attr("dx", (d) => d.x)
    .attr("dy", (d) => d.y + 4)
    .text((d) => d.data.name);

  const treeLinks = tree
    .select("g.links")
    .selectAll("line.link")
    .data(root.links())
    .enter()
    .append("line")
    .classed("link", true)
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y)
    .attr("id", (d) => "link" + d.source.data.id + "-" + d.target.data.id)
    .style("stroke", "#5f5f5f");

  d3.select("#graph-container").style(
    "transform",
    "translate(calc(50% - 190px),20px)"
  );
});
