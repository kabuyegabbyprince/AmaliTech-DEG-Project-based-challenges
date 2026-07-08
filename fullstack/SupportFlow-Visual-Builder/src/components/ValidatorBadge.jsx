import React from 'react';
import { useFlow } from '../context/FlowContext';
import { findDeadEnds } from '../utils/graphHelpers';

export default function ValidatorBadge() {
  const { nodes } = useFlow();

  const deadEnds = findDeadEnds(nodes);

  if (deadEnds.length === 0) return null;

  return (
    <div className="validator-banner">
      ⚠ {deadEnds.length} node(s) lead nowhere — check your flow
    </div>
  );
}


