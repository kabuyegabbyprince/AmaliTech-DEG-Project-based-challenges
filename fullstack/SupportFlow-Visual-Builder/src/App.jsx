import React from 'react';
import { FlowProvider, useFlow } from './context/FlowContext';
import './style.css';

import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import PreviewRunner from './components/PreviewRunner';
import EditPanel from './components/EditPanel';

function AppInner() {
  const { mode } = useFlow();

  return (
    <div className="app">
      <Toolbar />

      {mode === 'editor' ? <Canvas /> : <PreviewRunner />}

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




