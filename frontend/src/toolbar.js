// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 24,
      padding: '32px 0 0 32px',
      minHeight: 120,
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '18px',
        marginBottom: '18px',
        background: 'rgba(20,20,20,0.95)',
        borderRadius: '18px',
        boxShadow: '0 2px 12px 0 rgba(0,255,153,0.10)',
        padding: '18px 24px',
      }}>
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="image" label="Image" />
        <DraggableNode type="audio" label="Audio" />
        <DraggableNode type="email" label="Email" />
        <DraggableNode type="translate" label="Translate" />
        <DraggableNode type="summarize" label="Summarize" />
      </div>
    </div>
  );
};