import React from 'react';
import { useFlow } from '../context/FlowContext';
import NodeCard from './NodeCard';
import ConnectorLayer from './ConnectorLayer';

export default function Canvas() {
  const { nodes, meta } = useFlow();

  if (!meta) {
    return <div className="canvas-wrapper">Loading...</div>;
  }

  return (
    <div className="canvas-wrapper">
      <div
        className="canvas"
        style={{
          width: `${meta.canvas_size?.w}px`,
          height: `${meta.canvas_size?.h}px`,
        }}
      >
        <ConnectorLayer />
        {nodes.map((node) => (
          <NodeCard node={node} key={node.id} />
        ))}
      </div>
    </div>
  );
}



