import React, { createContext, useCallback, useEffect, useReducer, useContext } from 'react';

export const FlowContext = createContext(null);

const initialState = {
  meta: null, // will hold { theme, canvas_size }
  nodes: [], // array of node objects from flow_data.json
  mode: 'editor', // "editor" or "preview"
  selectedNodeId: null,
  currentPreviewNodeId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_FLOW': {
      const { meta, nodes, startNodeId } = action.payload;
      return {
        ...state,
        meta: meta ?? null,
        nodes: Array.isArray(nodes) ? nodes : [],
        currentPreviewNodeId: startNodeId ?? null,
      };
    }
    case 'UPDATE_NODE_TEXT': {
      const { id, newText } = action.payload;
      return {
        ...state,
        nodes: state.nodes.map((n) => (n.id === id ? { ...n, text: newText } : n)),
      };
    }
    case 'SET_MODE': {
      return {
        ...state,
        mode: action.payload.mode,
      };
    }
    case 'SELECT_NODE': {
      return {
        ...state,
        selectedNodeId: action.payload.id,
      };
    }
    case 'GO_TO_NODE': {
      return {
        ...state,
        currentPreviewNodeId: action.payload.id,
      };
    }
    case 'RESET_PREVIEW': {
      const startNodeId = state.nodes.find((n) => n.type === 'start')?.id ?? null;
      return {
        ...state,
        currentPreviewNodeId: startNodeId,
      };
    }
    default:
      return state;
  }
}

export function FlowProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/flow_data.json');
        const data = await res.json();

        const meta = data?.meta ?? null;
        const nodes = data?.nodes ?? [];
        const startNodeId = Array.isArray(nodes) ? nodes.find((n) => n.type === 'start')?.id : null;

        if (!cancelled) {
          dispatch({
            type: 'LOAD_FLOW',
            payload: { meta, nodes, startNodeId },
          });
        }
      } catch (e) {
        // Keep app usable even if loading fails.
        if (!cancelled) {
          dispatch({
            type: 'LOAD_FLOW',
            payload: { meta: null, nodes: [], startNodeId: null },
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateNodeText = useCallback((id, newText) => {
    dispatch({ type: 'UPDATE_NODE_TEXT', payload: { id, newText } });
  }, []);

  const setMode = useCallback((mode) => {
    dispatch({ type: 'SET_MODE', payload: { mode } });
  }, []);

  const selectNode = useCallback((id) => {
    dispatch({ type: 'SELECT_NODE', payload: { id: id ?? null } });
  }, []);

  const goToNode = useCallback((id) => {
    dispatch({ type: 'GO_TO_NODE', payload: { id } });
  }, []);

  const resetPreview = useCallback(() => {
    dispatch({ type: 'RESET_PREVIEW' });
  }, []);

  const value = {
    ...state,
    updateNodeText,
    setMode,
    selectNode,
    goToNode,
    resetPreview,
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  return useContext(FlowContext);
}


