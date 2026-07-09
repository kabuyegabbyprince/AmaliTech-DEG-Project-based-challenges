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
    case 'MOVE_NODE': {
      const { id, x, y } = action.payload;
      return {
        ...state,
        nodes: state.nodes.map((n) => (n.id === id ? { ...n, position: { ...n.position, x, y } } : n)),
      };
    }
    case 'ADD_NODE': {
      const { node } = action.payload;
      return {
        ...state,
        nodes: [...state.nodes, node],
      };
    }
    case 'DELETE_NODE': {
      const { id } = action.payload;
      return {
        ...state,
        selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
        nodes: state.nodes
          .filter((n) => n.id !== id)
          .map((n) => ({
            ...n,
            options: Array.isArray(n.options)
              ? n.options.filter((opt) => opt.nextId !== id)
              : n.options,
          })),
      };
    }
    case 'UPDATE_NODE_OPTION_LABEL': {
      const { nodeId, optionIndex, newLabel } = action.payload;
      return {
        ...state,
        nodes: state.nodes.map((n) => {
          if (n.id !== nodeId) return n;
          const options = Array.isArray(n.options) ? n.options : [];
          const nextOptions = options.map((opt, idx) => (idx === optionIndex ? { ...opt, label: newLabel } : opt));
          return { ...n, options: nextOptions };
        }),
      };
    }
    case 'UPDATE_NODE_OPTION_NEXT': {
      const { nodeId, optionIndex, nextId } = action.payload;
      return {
        ...state,
        nodes: state.nodes.map((n) => {
          if (n.id !== nodeId) return n;
          const options = Array.isArray(n.options) ? n.options : [];
          const nextOptions = options.map((opt, idx) => (idx === optionIndex ? { ...opt, nextId } : opt));
          return { ...n, options: nextOptions };
        }),
      };
    }
    case 'ADD_NODE_OPTION': {
      const { nodeId, option } = action.payload;
      return {
        ...state,
        nodes: state.nodes.map((n) => {
          if (n.id !== nodeId) return n;
          const options = Array.isArray(n.options) ? n.options : [];
          return { ...n, options: [...options, option] };
        }),
      };
    }
    case 'DELETE_NODE_OPTION': {
      const { nodeId, optionIndex } = action.payload;
      return {
        ...state,
        nodes: state.nodes.map((n) => {
          if (n.id !== nodeId) return n;
          const options = Array.isArray(n.options) ? n.options : [];
          const nextOptions = options.filter((_, idx) => idx !== optionIndex);
          return { ...n, options: nextOptions };
        }),
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

  const moveNode = useCallback((id, x, y) => {
    dispatch({ type: 'MOVE_NODE', payload: { id, x, y } });
  }, []);

  const addNode = useCallback((node) => {
    dispatch({ type: 'ADD_NODE', payload: { node } });
  }, []);

  const deleteNode = useCallback((id) => {
    dispatch({ type: 'DELETE_NODE', payload: { id } });
  }, []);

  const addNodeOption = useCallback((nodeId, option) => {
    dispatch({ type: 'ADD_NODE_OPTION', payload: { nodeId, option } });
  }, []);

  const deleteNodeOption = useCallback((nodeId, optionIndex) => {
    dispatch({ type: 'DELETE_NODE_OPTION', payload: { nodeId, optionIndex } });
  }, []);

  const updateNodeOptionLabel = useCallback((nodeId, optionIndex, newLabel) => {
    dispatch({ type: 'UPDATE_NODE_OPTION_LABEL', payload: { nodeId, optionIndex, newLabel } });
  }, []);

  const updateNodeOptionNext = useCallback((nodeId, optionIndex, nextId) => {
    dispatch({ type: 'UPDATE_NODE_OPTION_NEXT', payload: { nodeId, optionIndex, nextId } });
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
    moveNode,
    addNode,
    deleteNode,
    addNodeOption,
    deleteNodeOption,
    updateNodeOptionLabel,
    updateNodeOptionNext,
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


