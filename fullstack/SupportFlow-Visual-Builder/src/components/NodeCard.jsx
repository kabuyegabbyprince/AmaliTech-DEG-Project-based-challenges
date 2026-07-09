import React, { useCallback, useEffect, useRef } from 'react';
import { useFlow } from '../context/FlowContext';

export default function NodeCard({ node, deadEnds = [] }) {
  const { selectNode, selectedNodeId, moveNode } = useFlow();

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

  const dragRef = useRef(null);

  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      selectNode(node.id);

      const startX = e.clientX;
      const startY = e.clientY;
      const startPos = node.position;

      dragRef.current = {
        id: node.id,
        startX,
        startY,
        startPosX: startPos.x,
        startPosY: startPos.y,
      };
    },
    [node.id, node.position, selectNode]
  );

  useEffect(() => {
    function onMove(e) {
      if (!dragRef.current) return;
      const { id, startX, startY, startPosX, startPosY } = dragRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      moveNode(id, startPosX + dx, startPosY + dy);
    }

    function onUp() {
      dragRef.current = null;
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [moveNode]);


  return (
    <div
      className={`node-card ${nodeTypeClass} ${selectedClass} ${brokenClass}`.trim()}
      style={{ left: `${node.position.x}px`, top: `${node.position.y}px` }}
      onClick={() => selectNode(node.id)}
      onMouseDown={onMouseDown}
    >
      <span className="node-type-label">{node.type.toUpperCase()}</span>
      <div>{node.text}</div>
    </div>
  );
}




