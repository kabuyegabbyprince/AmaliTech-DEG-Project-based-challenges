import React from 'react';

export default function ValidatorBadge() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 10px',
        borderRadius: 999,
        border: '1px solid rgba(0,0,0,0.15)',
        fontSize: 13,
        background: 'rgba(255,255,255,0.6)',
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 999, background: '#22c55e' }} />
      Valid
    </span>
  );
}

