// hooks/useSimulateWorkflow.js
import { useState, useCallback } from 'react';

export default function useSimulateWorkflow(nodes, edges) {
  const [logs, setLogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const simulate = useCallback(() => {
    console.log('Starting simulation with nodes:', nodes);
    console.log('Starting simulation with edges:', edges);
    setLogs(['Starting simulation...']);
    
    fetch('/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes, edges })
    })
      .then((res) => {
        console.log('Simulation response:', res);
        return res.json();
      })
      .then((data) => {
        console.log('Simulation data:', data);
        if (data.logs) {
          setLogs(data.logs);
          setShowModal(true);
          
          // Auto-scroll to bottom as backup
          setTimeout(() => {
            const simulationSection = document.querySelector('.simulation-section');
            if (simulationSection) {
              simulationSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
          }, 100);
        }
      })
      .catch((err) => {
        console.error('Simulation error', err);
        const errorLogs = ['Error during simulation: ' + err.message];
        setLogs(errorLogs);
        setShowModal(true);
      });
  }, [nodes, edges]);
  
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);
  
  return [logs, simulate, showModal, closeModal];
}
