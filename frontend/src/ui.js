// ui.js
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import ImageNode from './nodes/imageNode';
import AudioNode from './nodes/audioNode';
import EmailNode from './nodes/emailNode';
import TranslateNode from './nodes/translateNode';
import SummarizeNode from './nodes/summarizeNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  image: ImageNode,
  audio: AudioNode,
  email: EmailNode,
  translate: TranslateNode,
  summarize: SummarizeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: type };
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event?.dataTransfer?.getData('application/reactflow');

      if (!data) return;

      const appData = JSON.parse(data);
      const type = appData?.nodeType;

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        defaultEdgeOptions={{
          style: {
            stroke: '#ffffff',         // White color
            strokeWidth: 3             // Bold line
          },
          markerEnd: {
            type: 'arrowclosed',
            color: '#ffffff',          // White arrow
          },
        }}
      >
        <Background color="#ffffff" gap={gridSize} />
        <Controls
          style={{
            background: 'none',
            border: 'none',
            boxShadow: 'none',
            color: '#fff',
            padding: 0,
            left: 24,
            bottom: 24,
            right: 'auto',
            top: 'auto',
            position: 'absolute',
          }}
          buttonStyle={{
            background: '#101312',
            border: '1.5px solid #00ff99',
            color: '#fff',
            borderRadius: 8,
            fontWeight: 500,
            fontSize: 20,
            margin: 2,
            width: 40,
            height: 40,
            boxShadow: 'none',
            transition: 'box-shadow 0.2s, border 0.15s, color 0.15s, background 0.15s',
            outline: 'none',
          }}
          className="proflow-controls-enhanced"
          showInteractive={true}
          showZoom={true}
          showFitView={true}
          showZoomIn={true}
          showZoomOut={true}
          showLock={true}
        />
        <MiniMap
          nodeColor={() => '#00ff99'}
          maskColor="rgba(0,0,0,0.7)"
          style={{
            background: '#181c1f',
            border: 'none',
            borderRadius: 10,
            boxShadow: '0 2px 12px 0 rgba(0,255,153,0.10)',
          }}
          nodeStrokeWidth={3}
        />
      </ReactFlow>
    </div>
  );
};