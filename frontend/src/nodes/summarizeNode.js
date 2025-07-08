// src/nodes/summarizeNode.js
import { Handle, Position } from 'reactflow';

export const SummarizeNode = ({ id, data }) => {
  return (
    <div style={{
      background: '#191b1e',
      border: '1.2px solid #23272b',
      borderRadius: 10,
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
      padding: 14,
      minWidth: 140,
      minHeight: 44,
      color: '#f3f3f3',
      fontWeight: 400,
      fontSize: 15,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 6,
    }}>
      <Handle type="target" position={Position.Left} id={`${id}-input`} style={{ background: '#00ff99', width: 14, height: 14, borderRadius: 7 }} />
      <Handle type="source" position={Position.Right} id={`${id}-output`} style={{ background: '#00ff99', width: 14, height: 14, borderRadius: 7 }} />
      <div style={{ fontWeight: 500, fontSize: 14, color: '#f3f3f3', marginBottom: 2 }}>Summarize</div>
      <div style={{ fontWeight: 400, fontSize: 13 }}>{data.label || 'Content Summary'}</div>
    </div>
  );
};

export default SummarizeNode;