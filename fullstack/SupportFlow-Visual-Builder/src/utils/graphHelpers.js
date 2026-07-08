export function getNodeById(nodes, id) {
  if (!Array.isArray(nodes)) return undefined;
  return nodes.find((n) => n.id === id);
}

export function getEdges(nodes) {
  if (!Array.isArray(nodes)) return [];

  const edges = [];

  for (const node of nodes) {
    const options = Array.isArray(node.options) ? node.options : [];
    for (const option of options) {
      edges.push({
        fromId: node.id,
        toId: option.nextId,
        label: option.label,
      });
    }
  }

  return edges;
}

export function findDeadEnds(nodes) {
  if (!Array.isArray(nodes)) return [];

  return nodes
    .filter((node) => node.type === 'question' && Array.isArray(node.options) && node.options.length === 0)
    .map((node) => node.id);
}


