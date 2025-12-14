// components/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    console.log("DRAG START:", nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div style={{ padding: '10px', fontWeight: 'bold' }}>Drag a node to the canvas:</div>
      <div
        className="dndnode start-node"
        onDragStart={(event) => onDragStart(event, 'start')}
        draggable
      >
        Start Node
      </div>
      <div
        className="dndnode task-node"
        onDragStart={(event) => onDragStart(event, 'task')}
        draggable
      >
        Task Node
      </div>
      <div
        className="dndnode approval-node"
        onDragStart={(event) => onDragStart(event, 'approval')}
        draggable
      >
        Approval Node
      </div>
      <div
        className="dndnode automated-node"
        onDragStart={(event) => onDragStart(event, 'automated')}
        draggable
      >
        Automated Step
      </div>
      <div
        className="dndnode end-node"
        onDragStart={(event) => onDragStart(event, 'end')}
        draggable
      >
        End Node
      </div>
    </aside>
  );
};

export default Sidebar;
