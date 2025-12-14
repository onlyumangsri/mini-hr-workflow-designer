// components/TabbedSidebar.jsx
import React, { useState } from 'react';
import { BarChart3, Settings, TrendingUp } from 'lucide-react';
import MetricsDashboard from './MetricsDashboard';
import StartNodeForm from './NodeForms/StartNodeForm';
import TaskNodeForm from './NodeForms/TaskNodeForm';
import ApprovalNodeForm from './NodeForms/ApprovalNodeForm';
import AutomatedStepNodeForm from './NodeForms/AutomatedStepNodeForm';
import EndNodeForm from './NodeForms/EndNodeForm';

export default function TabbedSidebar({ selectedNode, updateNode, nodes, edges }) {
  const [activeTab, setActiveTab] = useState(selectedNode ? 'configure' : 'metrics');

  // Switch to configure tab when node is selected
  React.useEffect(() => {
    if (selectedNode) {
      setActiveTab('configure');
    }
  }, [selectedNode]);

  const tabs = [
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'configure', label: 'Configure', icon: Settings, disabled: !selectedNode },
    { id: 'insights', label: 'Insights', icon: TrendingUp, disabled: true }
  ];

  const renderNodeForm = () => {
    if (!selectedNode) return null;

    const commonProps = { node: selectedNode, updateNode };

    switch (selectedNode.type) {
      case 'start':
        return <StartNodeForm {...commonProps} />;
      case 'task':
        return <TaskNodeForm {...commonProps} />;
      case 'approval':
        return <ApprovalNodeForm {...commonProps} />;
      case 'automated':
        return <AutomatedStepNodeForm {...commonProps} />;
      case 'end':
        return <EndNodeForm {...commonProps} />;
      default:
        return <div>Unknown node type</div>;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'metrics':
        return <MetricsDashboard nodes={nodes} edges={edges} />;
      case 'configure':
        return (
          <div className="configure-tab">
            {selectedNode ? (
              <>
                <div className="node-info">
                  <h3 className="node-type-title">{selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)} Node</h3>
                  <p className="node-id">Node ID: {selectedNode.id}</p>
                </div>
                {renderNodeForm()}
              </>
            ) : (
              <div className="no-selection">
                <p>Select a node to configure its properties</p>
              </div>
            )}
          </div>
        );
      case 'insights':
        return (
          <div className="insights-tab">
            <p>Insights coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="tabbed-sidebar">
      {/* Tab Navigation */}
      <div className="tab-navigation">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
              disabled={tab.disabled}
            >
              <IconComponent size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}