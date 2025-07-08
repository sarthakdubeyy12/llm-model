import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
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
      <div style={{ fontWeight: 500, fontSize: 14, color: '#f3f3f3', marginBottom: 2 }}>LLM</div>
      <div style={{ fontWeight: 400, fontSize: 13 }}>{data.label || 'LLM Node'}</div>
      <Handle type="target" position={Position.Left} id={`${id}-system`} style={{ top: '33%' }} />
      <Handle type="target" position={Position.Left} id={`${id}-prompt`} style={{ top: '66%' }} />
      <Handle type="source" position={Position.Right} id={`${id}-response`} />
    </div>
  );
};