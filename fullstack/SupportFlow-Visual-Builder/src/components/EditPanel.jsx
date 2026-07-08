import React from 'react';
import { useFlow } from '../context/FlowContext';

export default function EditPanel() {
  const { nodes, selectedNodeId, updateNodeText, selectNode } = useFlow();

  if (!selectedNodeId) return null;

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  if (!selectedNode) return null;

  return (
    <div className="edit-panel">
      <h3>Edit Node</h3>

      <textarea
        value={selectedNode.text ?? ''}
        onChange={(e) => updateNodeText(selectedNodeId, e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <button className="btn" onClick={() => selectNode(null)} type="button">
          Close
        </button>
      </div>
    </div>
  );
}


