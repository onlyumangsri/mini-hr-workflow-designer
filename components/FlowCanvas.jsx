// components/FlowCanvas.jsx
import React, { useRef, useCallback } from 'react';
import { ReactFlow, Controls, Background, addEdge, Handle, Position, ConnectionLineType } from '@xyflow/react';
import { Play, CheckSquare, UserCheck, Zap, Square, Users, Clock, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

let idCounter = 0;
const getId = () => `node_${idCounter++}`;

const StartNode = React.memo(({ data, selected }) => (
  <div className={`node-wrapper start-wrapper ${selected ? 'selected' : ''}`}>
    <Handle type="source" position={Position.Right} />
    <div className="node-content">
      <div className="icon-container start-icon">
        <Play size={20} color="white" />
      </div>
      <div className="content-area">
        <div className="node-title">{data.title || 'Start'}</div>
        <div className="node-subtitle">Workflow initiation</div>
        <div className="badge-row">
          <div className="badge badge-users">
            <Users size={12} />
            <span>{Math.floor(Math.random() * 50 + 10)}</span>
          </div>
          <div className="badge badge-active">
            <TrendingUp size={12} />
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

const TaskNode = React.memo(({ data, selected }) => (
  <div className={`node-wrapper task-wrapper ${selected ? 'selected' : ''}`}>
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
    <div className="node-content">
      <div className="icon-container task-icon">
        <CheckSquare size={20} color="white" />
      </div>
      <div className="content-area">
        <div className="node-title">{data.title || 'Task'}</div>
        <div className="node-subtitle">{data.description || 'Manual task execution'}</div>
        <div className="badge-row">
          {data.assignee && (
            <div className="badge badge-users">
              <Users size={12} />
              <span>{data.assignee}</span>
            </div>
          )}
          {data.dueDate && (
            <div className="badge badge-clock">
              <Clock size={12} />
              <span>{data.dueDate}</span>
            </div>
          )}
          <div className="badge badge-percentage">
            <span>{Math.floor(Math.random() * 40 + 60)}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

const ApprovalNode = React.memo(({ data, selected }) => {
  const approved = Math.floor(Math.random() * 30 + 60);
  const rejected = Math.floor(Math.random() * 10 + 5);
  const pending = Math.floor(Math.random() * 15 + 5);
  
  return (
    <div className={`node-wrapper approval-wrapper ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <div className="node-content">
        <div className="icon-container approval-icon">
          <UserCheck size={20} color="white" />
        </div>
        <div className="content-area">
          <div className="node-title">{data.title || 'Approval'}</div>
          <div className="node-subtitle">Requires authorization</div>
          <div className="badge-row">
            <div className="badge badge-approved">
              <CheckCircle size={12} />
              <span>{approved}</span>
            </div>
            <div className="badge badge-rejected">
              <AlertCircle size={12} />
              <span>{rejected}</span>
            </div>
            <div className="badge badge-pending">
              <Clock size={12} />
              <span>{pending}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const AutomatedNode = React.memo(({ data, selected }) => (
  <div className={`node-wrapper automated-wrapper ${selected ? 'selected' : ''}`}>
    <Handle type="target" position={Position.Left} />
    <Handle type="source" position={Position.Right} />
    <div className="node-content">
      <div className="icon-container automated-icon">
        <Zap size={20} color="white" />
      </div>
      <div className="content-area">
        <div className="node-title">{data.title || 'Automated'}</div>
        <div className="node-subtitle">System automation</div>
        <div className="badge-row">
          <div className="badge badge-auto">
            <Zap size={12} />
            <span>Auto</span>
          </div>
          <div className="badge badge-runs">
            <span>{Math.floor(Math.random() * 500 + 100)} runs</span>
          </div>
          <div className="badge badge-success">
            <span>{Math.floor(Math.random() * 5 + 95)}% success</span>
          </div>
        </div>
      </div>
    </div>
  </div>
));

const EndNode = React.memo(({ data, selected }) => (
  <div className={`node-wrapper end-wrapper ${selected ? 'selected' : ''}`}>
    <Handle type="target" position={Position.Left} />
    <div className="node-content">
      <div className="icon-container end-icon">
        <Square size={20} color="white" fill="white" />
      </div>
      <div className="content-area">
        <div className="node-title">{data.title || 'End'}</div>
        <div className="node-subtitle">Workflow completion</div>
        <div className="badge-row">
          <div className="badge badge-complete">
            <CheckCircle size={12} />
            <span>Complete</span>
          </div>
          {data.sendSummary && (
            <div className="badge badge-summary">
              <span>Summary sent</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
));

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

const FlowCanvas = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  onNodesChange,
  onEdgesChange,
  onNodeClick,
  selectedNodeId
}) => {
  const reactFlowWrapper = useRef(null);
  const [rfInstance, setRfInstance] = React.useState(null);

  const onInit = useCallback((instance) => {
    setRfInstance(instance);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle drag over to allow drop
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop: create new node at drop position
  const onDrop = useCallback(
    (event) => {
      console.log("DROP FIRED", event.dataTransfer.getData("application/reactflow"));
      event.preventDefault();
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !rfInstance) return;

      const position = rfInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { title: '', description: '', approver: '', automationId: '' }
      };
      setNodes((nds) => nds.concat(newNode));
      console.log("New node created:", newNode);
    },
    [rfInstance, setNodes]
  );

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes.map(node => ({
          ...node,
          data: { ...node.data, selected: node.id === selectedNodeId }
        }))}
        edges={edges.map(edge => ({
          ...edge,
          type: 'smoothstep',
          style: {
            stroke: '#94a3b8',
            strokeWidth: 2,
            strokeDasharray: '5,5'
          },
          markerEnd: {
            type: 'arrowclosed',
            color: '#94a3b8'
          }
        }))}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionLineType={ConnectionLineType.SmoothStep}
        defaultEdgeOptions={{
          type: 'smoothstep',
          style: {
            stroke: '#94a3b8',
            strokeWidth: 2,
            strokeDasharray: '5,5'
          },
          markerEnd: {
            type: 'arrowclosed',
            color: '#94a3b8'
          }
        }}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;
