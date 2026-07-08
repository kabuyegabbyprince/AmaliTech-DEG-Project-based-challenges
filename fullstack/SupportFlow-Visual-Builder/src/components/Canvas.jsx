import React from 'react';

export default function Canvas() {
  return (
    <div
      style={{
        border: '1px dashed rgba(0,0,0,0.2)',
        borderRadius: 8,
        minHeight: 320,
        padding: 12,
      }}
    >
      <strong>Canvas</strong>
      <div style={{ opacity: 0.8, marginTop: 8 }}>Flow will be rendered here.</div>
    </div>
  );
}

