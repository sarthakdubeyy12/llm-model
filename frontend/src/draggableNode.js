// draggableNode.js
export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const safeLabel = typeof label === 'string' ? label : 'Node';

  return (
    <div
      onDragStart={onDragStart}
      draggable
      style={{
        padding: '10px 16px',
        backgroundColor: '#1b1c1f',
        color: '#e4e4e7',
        borderRadius: '6px',
        fontWeight: 500,
        fontSize: '11.5px',
        border: '1px solid #333',
        cursor: 'grab',
        margin: '4px 8px 8px 0',
        userSelect: 'none',
        textAlign: 'center',
        minWidth: '70px',
        fontFamily: 'Inter, Roboto, sans-serif',
        letterSpacing: '0.4px',
        textTransform: 'capitalize',
      }}
    >
      {safeLabel}
    </div>
  );
};