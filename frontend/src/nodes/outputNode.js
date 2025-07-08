import { Handle, Position } from 'reactflow';
import { useState } from 'react';

export const OutputNode = ({ id, data }) => {
  const [showPanel, setShowPanel] = useState(false);

  const hasOutput = data.output && data.output !== 'No output generated yet.';
  const isError = data.output && data.output.startsWith('Error:');

  return (
    <div style={{
      background: '#191b1e',
      border: '1.2px solid #23272b',
      borderRadius: 10,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: 14,
      minWidth: 160,
      minHeight: 60,
      color: '#f3f3f3',
      fontWeight: 400,
      fontSize: 15,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 8,
      position: 'relative',
    }}>
      <Handle type="target" position={Position.Left} id={`${id}-input`} style={{
        background: '#00ff99',
        width: 14,
        height: 14,
        borderRadius: 7
      }} />

      <div style={{ fontWeight: 600, fontSize: 14 }}>Output</div>
      <div style={{ fontSize: 13, opacity: 0.85 }}>
        {data.label || 'Output Node'}
      </div>

      {/* Status Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        color: hasOutput ? (isError ? '#ff6b6b' : '#00ff99') : '#666'
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: hasOutput ? (isError ? '#ff6b6b' : '#00ff99') : '#666'
        }} />
        {hasOutput ? (isError ? 'Error' : 'Ready') : 'Waiting'}
      </div>

      {/* Timestamp */}
      {data.timestamp && (
        <div style={{
          fontSize: 11,
          color: '#666',
          fontStyle: 'italic'
        }}>
          {data.timestamp}
        </div>
      )}

      <button
        onClick={() => setShowPanel(true)}
        disabled={!hasOutput}
        style={{
          marginTop: 6,
          padding: '6px 10px',
          fontSize: 13,
          borderRadius: 6,
          backgroundColor: hasOutput ? '#00ff99' : '#333',
          color: hasOutput ? '#111' : '#666',
          fontWeight: 600,
          border: 'none',
          cursor: hasOutput ? 'pointer' : 'not-allowed',
          opacity: hasOutput ? 1 : 0.5,
        }}
      >
        {hasOutput ? 'View Output' : 'No Output'}
      </button>

      {showPanel && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '400px',
          height: '100vh',
          backgroundColor: '#111',
          color: '#f3f3f3',
          padding: '20px',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.4)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>Pipeline Output</h3>
            <button
              onClick={() => setShowPanel(false)}
              style={{
                background: 'transparent',
                color: '#f3f3f3',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              &times;
            </button>
          </div>

          {/* Status and Timestamp in Panel */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
            padding: '10px',
            backgroundColor: '#1a1a1a',
            borderRadius: '6px',
            border: '1px solid #333'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              color: hasOutput ? (isError ? '#ff6b6b' : '#00ff99') : '#666'
            }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: hasOutput ? (isError ? '#ff6b6b' : '#00ff99') : '#666'
              }} />
              {hasOutput ? (isError ? 'Error' : 'Success') : 'Pending'}
            </div>
            {data.timestamp && (
              <div style={{ fontSize: 12, color: '#666' }}>
                {data.timestamp}
              </div>
            )}
          </div>

          <div style={{
            flex: 1,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: 14,
            background: '#1f1f1f',
            padding: 16,
            borderRadius: 8,
            border: '1px solid #333',
            overflowY: 'auto',
            fontFamily: 'monospace',
            lineHeight: 1.5,
          }}>
            {data.output || 'No output generated yet. Run the pipeline to see results.'}
          </div>
        </div>
      )}

      <Handle type="source" position={Position.Right} id={`${id}-output`} style={{
        background: '#00ff99',
        width: 14,
        height: 14,
        borderRadius: 7
      }} />
    </div>
  );
};

export default OutputNode;