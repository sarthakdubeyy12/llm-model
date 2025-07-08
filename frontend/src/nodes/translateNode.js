// src/nodes/translateNode.js
import { Handle, Position, useReactFlow } from 'reactflow';
import { useState, useEffect, useRef } from 'react';

const languageOptions = [
  { label: 'Hindi', value: 'Hindi' },
  { label: 'French', value: 'French' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'German', value: 'German' },
  { label: 'Japanese', value: 'Japanese' },
];

export const TranslateNode = ({ id, data, selected }) => {
  const [isDropdownFocused, setIsDropdownFocused] = useState(false);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const { setNodes } = useReactFlow();
  const nodeRef = useRef(null);

  useEffect(() => {
    setIsLanguageSelected(!!data.language);
  }, [data.language]);

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, draggable: !isLanguageSelected } : node
      )
    );
  }, [isLanguageSelected, id, setNodes]);

  const handleMouseDown = (e) => e.stopPropagation();
  const handleMouseUp = (e) => e.stopPropagation();
  const handleClick = (e) => e.stopPropagation();
  const handleFocus = () => setIsDropdownFocused(true);
  const handleBlur = () => setIsDropdownFocused(false);
  const handlePointerDown = (e) => e.stopPropagation();

  const handleChange = (e) => {
    e.stopPropagation();
    data.language = e.target.value;
    setIsLanguageSelected(!!e.target.value);
  };

  return (
    <div
      ref={nodeRef}
      style={{
        background: '#1b1d22',
        border: '1.5px solid #2c2f36',
        borderRadius: 12,
        padding: '16px 14px',
        minWidth: 180,
        maxWidth: 220,
        fontSize: 14,
        color: '#f3f3f3',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        pointerEvents: isDropdownFocused ? 'none' : 'auto',
        opacity: isLanguageSelected ? 0.85 : 1,
        cursor: isLanguageSelected ? 'default' : 'grab',
        fontFamily: 'monospace',
        boxShadow: selected ? '0 0 0 2px #00ff99' : '0 2px 6px rgba(0,0,0,0.25)',
        transition: 'box-shadow 0.2s ease-in-out',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{
          background: '#00ff99',
          width: 14,
          height: 14,
          borderRadius: 7,
        }}
      />

      <div style={{ fontWeight: 600, fontSize: 15 }}>
        Translate
        {isLanguageSelected && (
          <span style={{ fontSize: '12px', color: '#00ff99', marginLeft: 6 }}>
            (Locked)
          </span>
        )}
      </div>

      <select
        value={data.language || ''}
        onChange={handleChange}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPointerDown={handlePointerDown}
        style={{
          backgroundColor: '#101113',
          border: '1px solid #3a3a3a',
          color: '#e5e5e5',
          padding: '8px 10px',
          fontSize: 14,
          borderRadius: 8,
          outline: 'none',
          pointerEvents: 'auto',
          fontFamily: 'inherit',
        }}
      >
        <option value="">Select language</option>
        {languageOptions.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: '#00ff99',
          width: 14,
          height: 14,
          borderRadius: 7,
        }}
      />
    </div>
  );
};

export default TranslateNode;