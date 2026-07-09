import React from 'react';
import { useFlow } from '../context/FlowContext';

export default function Toolbar() {
  const { mode, setMode, resetPreview } = useFlow();

  return (
    <div className="toolbar">
      <h1>SupportFlow Visual Builder</h1>
      <div className="toolbar-actions">
        {mode === 'editor' ? (
          <button
            className="btn btn-primary"
            onClick={() => setMode('preview')}
            type="button"
          >
            ▶ Play
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => setMode('editor')}
            type="button"
          >
            ↺ Reset
          </button>
        )}
      </div>
    </div>
  );
}


