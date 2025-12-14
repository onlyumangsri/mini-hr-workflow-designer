// pages/index.js
import React, { useState, useCallback } from 'react';
// import { ReactFlowProvider } from '@xyflow/react';
import dynamic from 'next/dynamic';
import { ReactFlowProvider, addEdge, useNodesState, useEdgesState } from '@xyflow/react';
import Sidebar from '../components/Sidebar';
import FlowCanvas from '../components/FlowCanvas';
import WorkflowHeader from '../components/WorkflowHeader';
import TabbedSidebar from '../components/TabbedSidebar';
import SimulationModal from '../components/SimulationModal';
import useSimulateWorkflow from '../hooks/useSimulateWorkflow';

// Dynamically import ReactFlow components to avoid SSR issues
// const ReactFlow = dynamic(() => import('@xyflow/react').then(mod => mod.ReactFlow), { ssr: false });
// const Controls = dynamic(() => import('@xyflow/react').then(mod => mod.Controls), { ssr: false });
// const Background = dynamic(() => import('@xyflow/react').then(mod => mod.Background), { ssr: false });

export default function HomePage() {
  // Manage nodes and edges state using React Flow hooks
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  // Workflow metadata state
  const [workflowName, setWorkflowName] = useState('User Automation');
  const [workflowSubtitle, setWorkflowSubtitle] = useState('Overview of User Workflows');

  // Simulation logs
  const [logs, simulate, showModal, closeModal] = useSimulateWorkflow(nodes, edges);

  // Helper to update node data (used by forms)
  const updateNodeData = useCallback((id, newData) => {
    setNodes((nds) => {
      const nodeIndex = nds.findIndex(n => n.id === id);
      if (nodeIndex === -1) return nds;
      
      const updatedNodes = [...nds];
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        data: { ...updatedNodes[nodeIndex].data, ...newData }
      };
      return updatedNodes;
    });
  }, [setNodes]);

  // Basic validation: ensure at least one start and end node
  const isValidStructure = nodes.some(n => n.type === 'start') && nodes.some(n => n.type === 'end');

  // Header action handlers
  const handleSave = useCallback(() => {
    const workflowData = {
      name: workflowName,
      subtitle: workflowSubtitle,
      nodes,
      edges,
      savedAt: new Date().toISOString()
    };
    console.log('Saving workflow:', workflowData);
    // TODO: Implement actual save functionality
  }, [workflowName, workflowSubtitle, nodes, edges]);

  const handleExport = useCallback(() => {
    const workflowData = {
      name: workflowName,
      subtitle: workflowSubtitle,
      nodes,
      edges,
      exportedAt: new Date().toISOString()
    };
    const dataStr = JSON.stringify(workflowData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${workflowName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [workflowName, workflowSubtitle, nodes, edges]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (data.name) setWorkflowName(data.name);
            if (data.subtitle) setWorkflowSubtitle(data.subtitle);
            if (data.nodes) setNodes(data.nodes);
            if (data.edges) setEdges(data.edges);
          } catch (error) {
            console.error('Error importing workflow:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [setNodes, setEdges]);

  const handleClear = useCallback(() => {
    if (confirm('Are you sure you want to clear all nodes and connections?')) {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
    }
  }, [setNodes, setEdges]);

  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <WorkflowHeader
          workflowName={workflowName}
          setWorkflowName={setWorkflowName}
          workflowSubtitle={workflowSubtitle}
          setWorkflowSubtitle={setWorkflowSubtitle}
          onSimulate={simulate}
          onSave={handleSave}
          onExport={handleExport}
          onImport={handleImport}
          onClear={handleClear}
          nodeCount={nodes.length}
          edgeCount={edges.length}
          isValidStructure={isValidStructure}
        />
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Sidebar for dragging nodes */}
          <Sidebar />
 
          {/* Main canvas */}   
          <div style={{ flexGrow: 1 }}>
            <FlowCanvas
              nodes={nodes}
              edges={edges}
              setNodes={setNodes}
              setEdges={setEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={(_, node) => setSelectedNode(node)}
              selectedNodeId={selectedNode?.id}
            />
          </div>

          {/* Metrics Dashboard / Node Configuration Panel */}
          <div style={{ width: 320, borderLeft: '1px solid #e5e7eb' }}>
            <TabbedSidebar 
              selectedNode={selectedNode}
              updateNode={updateNodeData}
              nodes={nodes}
              edges={edges}
            />
          </div>
        </div>

        {/* Simulation / Sandbox panel */}
        <div className="simulation-section" style={{ padding: '10px', borderTop: '1px solid #ccc', background: '#eee', maxHeight: '300px', overflow: 'auto' }}>
          <h4>Workflow JSON:</h4>
          <pre style={{ maxHeight: '100px', overflow: 'auto', background: '#fff', padding: '5px' }}>
            {JSON.stringify({ nodes, edges }, null, 2)}
          </pre>
          <h4>Simulation Logs:</h4>
          <pre style={{ maxHeight: '100px', overflow: 'auto', background: '#fff', padding: '5px' }}>
            {logs.join('\n')}
          </pre>
        </div>
        
        {/* Simulation Results Modal */}
        <SimulationModal 
          isOpen={showModal}
          onClose={closeModal}
          logs={logs}
          isValidStructure={isValidStructure}
        />
      </div>
    </ReactFlowProvider>
  );
}
