import React from 'react';
import { useFlow } from '../context/FlowContext';
import { getEdges, getNodeById } from '../utils/graphHelpers';

export default function ConnectorLayer() {
  const { nodes, meta } = useFlow();

  if (!meta) return null;

  const edges = getEdges(nodes);

  const w = meta.canvas_size?.w;
  const h = meta.canvas_size?.h;

  return (
    <svg
      className="connector-layer"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="8"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L10,3.5 L0,7 Z" fill="currentColor" />
        </marker>
      </defs>

      {edges.map((edge) => {
        const from = getNodeById(nodes, edge.fromId);
        const to = getNodeById(nodes, edge.toId);

        if (!from || !to) return null;

        const x1 = from.position.x + 110;
        const y1 = from.position.y + 80;
        const x2 = to.position.x + 110;
        const y2 = to.position.y;

        const dx = Math.abs(x2 - x1);
        const curve = Math.max(40, dx * 0.35);
        const c1x = x1 + (x2 >= x1 ? curve : -curve);
        const c1y = y1;
        const c2x = x2 - (x2 >= x1 ? curve : -curve);
        const c2y = y2;

        const d = `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        const key = `${edge.fromId}-${edge.toId}`;

        return (
          <React.Fragment key={key}>
            <path
              className="connector-line"
              d={d}
              markerEnd="url(#arrowhead)"
            />
            <text className="connector-label" x={midX} y={midY - 6} textAnchor="middle">
              {edge.label}
            </text>
          </React.Fragment>
        );
      })}
    </svg>
  );
}


