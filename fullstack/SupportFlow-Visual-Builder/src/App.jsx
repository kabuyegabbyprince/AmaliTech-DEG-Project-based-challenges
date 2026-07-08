import React from 'react';
import { FlowProvider, useFlow } from './context/FlowContext';
import './style.css';

import Canvas from './components/Canvas';
import EditPanel from './components/EditPanel';

function AppInner() {
  const { mode } = useFlow();

  return (
    <div className="app">
      {/* toolbar placeholder */}
      <div className="toolbar">Toolbar</div>

      {mode === 'preview' ? (
        <div className="preview-runner">Preview runner goes here</div>
      ) : (
        <Canvas />
      )}

      <EditPanel />
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


