function handleEvents(selection) {
  selection
    .on("mouseover", function () {
      const node = d3.select(this).select(".the-node");
      const label = d3.select(this).select(".label");

      node
        .transition()
        .duration(400)
        .style("fill", "#0fe1ff9e")
        .attr("r", node.classed("solid") ? 18 : 14)
        .raise();

      label.transition().duration(700).style("fill", "#000000");
    })
    .on("mouseout", function () {
      const node = d3.select(this).select(".the-node");
      const label = d3.select(this).select(".label");

      node
        .transition()
        .duration(400)
        .style(
          "fill",
          node.classed("solid") ? "#696969" : "rgba(255,255,255,0.2)"
        )
        .attr("r", 14);

      label.transition().duration(700).style("fill", "black");
    })
    .on("click", function () {
      const clickedNode = d3.select(this).select(".the-node").datum();
      const highlightedClass = "highlighted";

      d3.selectAll(`.${highlightedClass}`).classed(highlightedClass, false);
      d3.select(this).classed(highlightedClass, true).raise();

      let currentNode = clickedNode;
      while (currentNode.parent) {
        d3.selectAll(`#node${currentNode.data.id}`).classed(
          highlightedClass,
          true
        );
        if (currentNode.parent !== "null") {
          const linkId = `#link${currentNode.parent.data.id}-${currentNode.data.id}`;
          d3.selectAll(linkId).classed(highlightedClass, true);
        }
        currentNode = currentNode.parent;
      }
      d3.selectAll(`#node${currentNode.data.id}`).classed(
        highlightedClass,
        true
      );
    });
}
