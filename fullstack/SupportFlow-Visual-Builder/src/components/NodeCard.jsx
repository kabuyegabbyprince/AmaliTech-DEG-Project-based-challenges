import React from 'react';

export default function NodeCard() {
  return (
    <div
      style={{
        border: '1px solid rgba(0,0,0,0.15)',
        borderRadius: 8,
        padding: 10,
        background: 'rgba(255,255,255,0.6)',
      }}
    >
      <strong>Node Card</strong>
      <div style={{ opacity: 0.8, marginTop: 6 }}>Node details will appear here.</div>
    </div>
  );
}

