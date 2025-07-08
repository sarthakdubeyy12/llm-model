// BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ label, inputs = [], outputs = [], children }) => {
  return (
    <div
      className="pro-node-container"
      style={{
        background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        border: '2.5px solid #00ff99',
        borderRadius: '22px',
        boxShadow: '0 8px 36px 0 rgba(0,255,153,0.18), 0 2px 8px 0 rgba(0,0,0,0.28)',
        padding: '40px 32px',
        minWidth: 320,
        minHeight: 160,
        color: '#fff',
        fontWeight: 700,
        fontSize: 24,
        position: 'relative',
        margin: '0 0 12px 0',
        transition: 'box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 16, letterSpacing: 1 }}>{label}</div>
      {/* Input handles */}
      {inputs.map((id, index) => (
        <Handle
          key={id}
          type="target"
          position={Position.Left}
          id={id}
          style={{ top: 50 + index * 36, background: 'url(#pro-green-gradient)', width: 20, height: 20, borderRadius: 10 }}
        />
      ))}
      {/* Output handles */}
      {outputs.map((id, index) => (
        <Handle
          key={id}
          type="source"
          position={Position.Right}
          id={id}
          style={{ top: 50 + index * 36, background: 'url(#pro-green-gradient)', width: 20, height: 20, borderRadius: 10 }}
        />
      ))}
      <div style={{ width: '100%', marginTop: 12 }}>{children}</div>
    </div>
  );
};

export default BaseNode;