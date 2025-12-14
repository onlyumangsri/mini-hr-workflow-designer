// components/SimulationModal.jsx
import React from 'react';
import { X, Play, CheckCircle } from 'lucide-react';

export default function SimulationModal({ isOpen, onClose, logs, isValidStructure }) {
  if (!isOpen) return null;

  return (
    <div className="simulation-modal-overlay" onClick={onClose}>
      <div className="simulation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <div className="modal-icon">
              <Play size={20} color="white" />
            </div>
            <div>
              <h3 className="modal-title">Workflow Simulation Results</h3>
              <p className="modal-subtitle">
                {isValidStructure ? 'Simulation completed successfully' : 'Simulation completed with warnings'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="simulation-status">
            <CheckCircle size={16} className="status-icon" />
            <span>Execution completed</span>
          </div>
          
          <div className="logs-section">
            <h4 className="logs-title">Execution Log:</h4>
            <div className="logs-container">
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <div key={index} className="log-entry">
                    {log}
                  </div>
                ))
              ) : (
                <div className="no-logs">No simulation logs available</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}