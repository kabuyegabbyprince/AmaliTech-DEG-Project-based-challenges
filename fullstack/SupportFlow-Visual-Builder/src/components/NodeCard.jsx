import React from 'react';
import { useFlow } from '../context/FlowContext';

export default function NodeCard({ node, deadEnds = [] }) {
  const { selectNode, selectedNodeId } = useFlow();

  const nodeTypeClass =
    node.type === 'start'
      ? 'node-start'
      : node.type === 'question'
        ? 'node-question'
        : node.type === 'end'
          ? 'node-end'
          : '';

  const selectedClass = node.id === selectedNodeId ? 'node-selected' : '';
  const brokenClass = deadEnds.includes(node.id) ? 'node-broken' : '';

  return (
    <div
      className={`node-card ${nodeTypeClass} ${selectedClass} ${brokenClass}`.trim()}
      style={{ left: `${node.position.x}px`, top: `${node.position.y}px` }}
      onClick={() => selectNode(node.id)}
    >
      <span className="node-type-label">{node.type.toUpperCase()}</span>
      <div>{node.text}</div>
    </div>
  );
}



