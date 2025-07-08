import { useStore } from './store';
import axios from 'axios';

export const RunButton = () => {
  const { nodes, edges, updateNodeData } = useStore();

  const runPipeline = async () => {
    try {
      const safeNodes = (nodes || []).filter(n => n && n.id && n.type).map(n => ({
        id: String(n.id),
        type: String(n.type),
        data: typeof n.data === 'object' && n.data !== null ? n.data : {}
      }));

      const safeEdges = (edges || []).filter(e => e && e.id && e.source && e.target).map(e => ({
        id: String(e.id),
        source: String(e.source),
        target: String(e.target),
        sourceHandle: typeof e.sourceHandle === 'string' ? e.sourceHandle : '',
        targetHandle: typeof e.targetHandle === 'string' ? e.targetHandle : ''
      }));

      const payload = {
        nodes: safeNodes,
        edges: safeEdges,
        name: "Untitled Pipeline",
        user_id: "demo"
      };

      console.log('📤 Sending to backend:', payload);
      const response = await axios.post('http://localhost:8000/api/v1/pipelines/parse', payload);
      console.log('✅ Pipeline result:', response.data);
      
      // Update all nodes with their individual results
      if (response.data.nodeResults) {
        Object.keys(response.data.nodeResults).forEach(nodeId => {
          const nodeResult = response.data.nodeResults[nodeId];
          const node = nodes.find(n => n.id === nodeId);
          if (node) {
            updateNodeData(nodeId, {
              output: nodeResult,
              timestamp: new Date().toLocaleString()
            });
          }
        });
      }
      
      // Also update output nodes with the final result
      const outputNodes = nodes.filter(node => node.type === 'customOutput');
      outputNodes.forEach(outputNode => {
        updateNodeData(outputNode.id, {
          output: response.data.result,
          timestamp: new Date().toLocaleString()
        });
      });
      
    } catch (error) {
      console.error('❌ Pipeline execution failed:', error);
      
      // Update output nodes with error message
      const outputNodes = nodes.filter(node => node.type === 'customOutput');
      outputNodes.forEach(outputNode => {
        updateNodeData(outputNode.id, {
          output: `Error: ${error.message}`,
          timestamp: new Date().toLocaleString()
        });
      });
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: 30,
      right: 40,
      zIndex: 10,
      background: '#181b1e',
      border: '1.2px solid #23272b',
      borderRadius: 10,
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
      padding: '14px 24px',
      minWidth: 180,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <button
        onClick={runPipeline}
        style={{
          backgroundColor: '#23272b',
          color: '#f1f1f1',
          border: '1px solid #444',
          borderRadius: '6px',
          padding: '10px 22px',
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.5px',
          cursor: 'pointer',
          textTransform: 'uppercase',
          transition: 'background-color 0.2s',
        }}
        onMouseDown={e => {
          e.currentTarget.style.backgroundColor = '#1f1f1f';
        }}
        onMouseUp={e => {
          e.currentTarget.style.backgroundColor = '#23272b';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#23272b';
        }}
      >
        ▶ Run Pipeline
      </button>
    </div>
  );
};