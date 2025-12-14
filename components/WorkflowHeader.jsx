// components/WorkflowHeader.jsx
import React, { useState } from 'react';
import { Play, Save, Download, Upload, Trash2, Edit3 } from 'lucide-react';

export default function WorkflowHeader({ 
  workflowName, 
  setWorkflowName, 
  workflowSubtitle, 
  setWorkflowSubtitle,
  onSimulate,
  onSave,
  onExport,
  onImport,
  onClear,
  nodeCount,
  edgeCount,
  isValidStructure
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(workflowName);

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
    setTempTitle(workflowName);
  };

  const handleTitleSave = () => {
    if (tempTitle.trim()) {
      setWorkflowName(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setTempTitle(workflowName);
      setIsEditingTitle(false);
    }
  };

  return (
    <header className="workflow-header">
      <div className="header-content">
        {/* Title Section */}
        <div className="title-section">
          <div className="title-row">
            {isEditingTitle ? (
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value.slice(0, 50))}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyPress}
                className="title-input"
                autoFocus
                maxLength={50}
              />
            ) : (
              <div className="title-display" onClick={handleTitleEdit}>
                <h1 className="workflow-title">{workflowName}</h1>
                <Edit3 size={16} className="edit-icon" />
              </div>
            )}
          </div>
          <p className="workflow-subtitle">{workflowSubtitle}</p>
          <div className="workflow-metadata">
            <span>{nodeCount} nodes</span>
            <span>•</span>
            <span>{edgeCount} connections</span>
            <span>•</span>
            <span className={isValidStructure ? 'status-valid' : 'status-invalid'}>
              {isValidStructure ? 'Valid structure' : 'Invalid structure'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="actions-section">
          {/* Primary Actions */}
          <div className="primary-actions">
            <button 
              onClick={onSimulate}
              className="btn btn-primary btn-simulate"
              disabled={!isValidStructure}
            >
              <Play size={16} />
              Run Simulation
            </button>
            <button 
              onClick={onSave}
              className="btn btn-primary btn-save"
            >
              <Save size={16} />
              Save Workflow
            </button>
          </div>

          {/* Divider */}
          <div className="button-divider"></div>

          {/* Secondary Actions */}
          <div className="secondary-actions">
            <button 
              onClick={onExport}
              className="btn btn-secondary"
            >
              <Download size={16} />
              Export
            </button>
            <button 
              onClick={onImport}
              className="btn btn-secondary"
            >
              <Upload size={16} />
              Import
            </button>
            <button 
              onClick={onClear}
              className="btn btn-danger"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}