import React, { createContext, useMemo, useState } from 'react';

export const FlowContext = createContext(null);

export function FlowProvider({ children }) {
  // Minimal placeholder state so future UI can consume it safely.
  const [flow, setFlow] = useState(null);

  const value = useMemo(() => ({
    flow,
    setFlow,
  }), [flow]);

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

