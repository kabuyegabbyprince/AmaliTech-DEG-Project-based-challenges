import React from 'react';
import { useFlow } from '../context/FlowContext';

export default function PreviewRunner() {
  const { nodes, currentPreviewNodeId, goToNode, resetPreview } = useFlow();

  const currentNode = nodes.find((n) => n.id === currentPreviewNodeId);

  if (!currentNode) {
    return <div className="preview-runner">Loading...</div>;
  }

  const isEnd = currentNode.type === 'end';

  return (
    <div className="preview-runner">
      <div className="chat-bubble">{currentNode.text}</div>

      {!isEnd ? (
        <div className="chat-options">
          {(currentNode.options || []).map((option) => (
            <button
              key={`${currentNode.id}-${option.nextId}-${option.label}`}
              className="chat-option-btn"
              onClick={() => goToNode(option.nextId)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : (
        <button className="btn btn-primary" onClick={resetPreview} type="button">
          Restart
        </button>
      )}
    </div>
  );
}


