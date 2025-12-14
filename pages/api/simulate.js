// pages/api/simulate.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  const { nodes, edges } = req.body;
  const logs = [];
  
  const startNode = nodes.find(n => n.type === 'start');
  if (!startNode) {
    return res.status(400).json({ error: 'No start node found' });
  }
  
  logs.push('--- Starting simulation ---');
  
  const simulateBranch = (nodeId, branchId = '', level = 0) => {
    const visited = new Set();
    const branchLogs = [];
    
    const processNode = (currentNodeId, currentLevel) => {
      if (visited.has(currentNodeId)) return 'cycle';
      visited.add(currentNodeId);
      
      const node = nodes.find(n => n.id === currentNodeId);
      if (!node) return 'not_found';
      
      const indent = '  '.repeat(currentLevel);
      
      switch (node.type) {
        case 'start':
          branchLogs.push(`${indent}Workflow started: ${node.data.title || 'Start'}`);
          break;
        case 'task':
          branchLogs.push(`${indent}Executing Task: ${node.data.title || '(no title)'}`);
          break;
        case 'approval':
          branchLogs.push(`${indent}Approval step: ${node.data.title || 'Approval'} (approver: ${node.data.approver || 'none'})`);
          break;
        case 'automated':
          branchLogs.push(`${indent}Automated action: ${node.data.title || 'Automated'} (ID: ${node.data.automationId || 'none'})`);
          break;
        case 'end':
          branchLogs.push(`${indent}${branchId}Branch completed at End node: ${node.data.title || 'End'}`);
          return 'end';
      }
      
      const nextEdges = edges.filter(e => e.source === currentNodeId);
      
      if (nextEdges.length === 0) {
        branchLogs.push(`${indent}${branchId}Branch terminated (no outgoing connections)`);
        return 'terminated';
      }
      
      if (nextEdges.length === 1) {
        return processNode(nextEdges[0].target, currentLevel);
      }
      
      // Handle nested parallel branches
      branchLogs.push(`${indent}${branchId}Nested parallel execution of ${nextEdges.length} sub-branches:`);
      nextEdges.forEach((edge, index) => {
        const subBranchLogs = simulateBranch(edge.target, `${branchId}Sub-branch ${index + 1}: `, currentLevel + 1);
        branchLogs.push(...subBranchLogs);
      });
      
      return 'parallel_completed';
    };
    
    processNode(nodeId, level);
    return branchLogs;
  };
  
  const startResult = simulateBranch(startNode.id);
  logs.push(...startResult);
  
  const startEdges = edges.filter(e => e.source === startNode.id);
  if (startEdges.length > 1) {
    logs.push(`Parallel execution of ${startEdges.length} main branches:`);
    startEdges.forEach((edge, index) => {
      logs.push(`\nBranch ${index + 1}:`);
      const branchLogs = simulateBranch(edge.target, '', 1);
      logs.push(...branchLogs);
    });
    logs.push('\nAll parallel branches completed');
  }
  
  logs.push('--- Simulation completed ---');
  res.status(200).json({ logs });
}
