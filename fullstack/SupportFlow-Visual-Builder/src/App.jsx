import React from 'react';
import { FlowProvider, useFlow } from './context/FlowContext';
import './style.css';

function AppInner() {
  const { mode } = useFlow();

  return (
    <div className="app">
      {/* toolbar placeholder */}
      <div className="toolbar">Toolbar</div>

      {mode === 'preview' ? (
        <div className="preview-runner">Preview runner goes here</div>
      ) : (
        <div className="canvas-wrapper">Canvas goes here</div>
      )}

      {/* EditPanel placeholder */}
      <div className="edit-panel" style={{ display: 'none' }}>
        Edit panel
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FlowProvider>
      <AppInner />
    </FlowProvider>
  );
}

