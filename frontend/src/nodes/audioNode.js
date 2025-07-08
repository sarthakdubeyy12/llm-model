// src/nodes/audioNode.js
import { Handle, Position } from 'reactflow';
import { useState } from 'react';

export const AudioNode = ({ id, data }) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const hasAudioUrl = data.output && data.output.startsWith('http');

  return (
    <div style={{
      background: '#191b1e',
      border: '1.2px solid #23272b',
      borderRadius: 10,
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
      padding: 14,
      minWidth: 200,
      minHeight: 80,
      color: '#f3f3f3',
      fontWeight: 400,
      fontSize: 15,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 8,
    }}>
      <Handle type="target" position={Position.Left} id={`${id}-input`} style={{ background: '#00ff99', width: 14, height: 14, borderRadius: 7 }} />
      <Handle type="source" position={Position.Right} id={`${id}-output`} style={{ background: '#00ff99', width: 14, height: 14, borderRadius: 7 }} />
      
      <div style={{ fontWeight: 500, fontSize: 14, color: '#f3f3f3', marginBottom: 2 }}>Audio</div>
      <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 8 }}>{data.label || 'Audio Processing'}</div>

      {/* Audio URL Display */}
      {hasAudioUrl && (
        <div style={{
          width: '100%',
          padding: '8px',
          backgroundColor: '#2a2d31',
          borderRadius: '6px',
          border: '1px solid #3a3a3a',
          fontSize: '12px',
          wordBreak: 'break-all',
          color: '#e5e5e5',
          marginBottom: '8px',
        }}>
          <div style={{ marginBottom: '4px', fontSize: '11px', color: '#999' }}>
            Generated Audio URL:
          </div>
          {data.output}
        </div>
      )}

      {/* Audio Player */}
      {hasAudioUrl && (
        <div style={{
          width: '100%',
          padding: '8px',
          backgroundColor: '#2a2d31',
          borderRadius: '6px',
          border: '1px solid #3a3a3a',
          marginBottom: '8px',
        }}>
          <audio
            controls
            style={{
              width: '100%',
              height: '32px',
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={data.output} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* Copy Button */}
      {hasAudioUrl && (
        <button
          onClick={() => copyToClipboard(data.output)}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            borderRadius: '6px',
            backgroundColor: copied ? '#00ff99' : '#333',
            color: copied ? '#000' : '#f3f3f3',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s ease',
          }}
        >
          {copied ? '✓ Copied!' : '📋 Copy URL'}
        </button>
      )}

      {/* Status Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        color: hasAudioUrl ? (isPlaying ? '#00ff99' : '#00ff99') : '#666'
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: hasAudioUrl ? (isPlaying ? '#00ff99' : '#00ff99') : '#666'
        }} />
        {hasAudioUrl ? (isPlaying ? 'Playing' : 'Ready') : 'Waiting'}
      </div>
    </div>
  );
};

export default AudioNode;