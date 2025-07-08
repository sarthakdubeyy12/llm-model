import { Handle, Position } from 'reactflow';
import { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [inputValue, setInputValue] = useState(data.input || '');
  const [variableNames, setVariableNames] = useState([]);
  const updateNodeData = useStore((state) => state.updateNodeField);
  const textAreaRef = useRef(null);

  const VARIABLE_REGEX = /{{\s*([\w$]+)\s*}}/g;

  // Update node input and extract variables
  useEffect(() => {
    if (typeof updateNodeData === 'function') {
      updateNodeData(id, 'input', inputValue);
    }

    const matches = [...inputValue.matchAll(VARIABLE_REGEX)].map(match => match[1]);
    setVariableNames([...new Set(matches)]); // Remove duplicates
  }, [inputValue]);

  // Auto-resize textarea height
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  return (
    <div
      style={{
        background: '#1a1a1d',
        border: '1.5px solid #2f2f2f',
        borderRadius: 12,
        padding: 14,
        minWidth: 220,
        color: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace',
        position: 'relative',
      }}
    >
      {/* Static target handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#ffffff',
          width: 12,
          height: 12,
          borderRadius: 6,
          top: 12,
        }}
      />

      {/* Dynamic handles for each {{variable}} */}
      {variableNames.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          id={`${id}-${variable}`}
          position={Position.Left}
          style={{
            top: 40 + index * 20,
            background: '#00ff99',
            width: 12,
            height: 12,
            borderRadius: 6,
            position: 'absolute',
          }}
        />
      ))}

      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>
        Text Input
      </div>

      <textarea
        ref={textAreaRef}
        placeholder="Enter detailed input text here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        rows={1}
        style={{
          resize: 'none',
          overflow: 'hidden',
          backgroundColor: '#101113',
          color: '#f1f1f1',
          border: '1px solid #333',
          borderRadius: 8,
          fontSize: 14,
          padding: '10px',
          fontFamily: 'inherit',
          width: '100%',
          outline: 'none',
        }}
      />

      {/* Output source handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#ffffff',
          width: 12,
          height: 12,
          borderRadius: 6,
        }}
      />
    </div>
  );
};

export default TextNode;