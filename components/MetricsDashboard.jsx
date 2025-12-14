// components/MetricsDashboard.jsx
import React, { useState } from 'react';
import { Search, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Target, MoreHorizontal, ChevronDown, ChevronRight } from 'lucide-react';

export default function MetricsDashboard({ nodes, edges }) {
  const [expandedObjectives, setExpandedObjectives] = useState(true);
  const [expandedWorkflowA, setExpandedWorkflowA] = useState(false);
  const [expandedWorkflowB, setExpandedWorkflowB] = useState(false);

  // Calculate metrics from current workflow
  const totalNodes = nodes.length;
  const automatedNodes = nodes.filter(n => n.type === 'automated').length;
  const automationCoverage = totalNodes > 0 ? Math.round((automatedNodes / totalNodes) * 100) : 0;
  
  const getCoverageColor = (percentage) => {
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const objectives = [
    {
      id: 1,
      name: 'Output Generation',
      description: 'Compiling Delivering Outputs',
      icon: BarChart3,
      metrics: { count: 15, warnings: 34, success: 41, percentage: 69 }
    },
    {
      id: 2,
      name: 'Data Validation',
      description: 'Ensuring Data Quality',
      icon: CheckCircle,
      metrics: { count: 23, warnings: 12, success: 67, percentage: 84 }
    },
    {
      id: 3,
      name: 'Process Automation',
      description: 'Streamlining Workflows',
      icon: Target,
      metrics: { count: 31, warnings: 8, success: 89, percentage: 92 }
    }
  ];

  return (
    <div className="metrics-dashboard">
      {/* Performance Overview */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Performance Overview</h3>
          <p className="card-subtitle">Overview Performance Time</p>
        </div>
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search metrics..." 
            className="search-input"
          />
        </div>
      </div>

      {/* Automation Coverage */}
      <div className="dashboard-card">
        <div className="card-header">
          <h3 className="card-title">Automation Coverage</h3>
          <p className="card-subtitle">Your last week is better {automationCoverage}%</p>
        </div>
        <div className="coverage-display">
          <div className={`coverage-percentage ${getCoverageColor(automationCoverage)}`}>
            {automationCoverage}%
          </div>
          <div className="progress-bar coverage-progress">
            <div 
              className={`progress-fill ${automationCoverage >= 70 ? 'progress-green' : automationCoverage >= 50 ? 'progress-yellow' : 'progress-red'}`}
              style={{ width: `${automationCoverage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Workflow Cards */}
      <div className="workflow-card">
        <div className="workflow-header" onClick={() => setExpandedWorkflowA(!expandedWorkflowA)}>
          <div>
            <h4 className="workflow-name">Workflow A</h4>
            <p className="workflow-description">Triggered by User Actions</p>
          </div>
          <button className="expand-btn">
            {expandedWorkflowA ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
        <div className="progress-bar workflow-progress">
          <div className="progress-fill" style={{ width: '37%' }}></div>
        </div>
        <div className="workflow-badges">
          <div className="badge badge-task">Task: 20</div>
          <div className="badge badge-exec">Exec: 35</div>
          <div className="badge badge-done">Done: 13</div>
        </div>
      </div>

      <div className="workflow-card">
        <div className="workflow-header" onClick={() => setExpandedWorkflowB(!expandedWorkflowB)}>
          <div>
            <h4 className="workflow-name">Workflow B</h4>
            <p className="workflow-description">Scheduled Automation</p>
          </div>
          <button className="expand-btn">
            {expandedWorkflowB ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
        <div className="progress-bar workflow-progress">
          <div className="progress-fill" style={{ width: '88%' }}></div>
        </div>
        <div className="workflow-badges">
          <div className="badge badge-task">Task: 3</div>
          <div className="badge badge-exec">Exec: 23</div>
          <div className="badge badge-done">Done: 23</div>
        </div>
      </div>

      {/* Flow Objectives */}
      <div className="dashboard-card">
        <div className="section-header" onClick={() => setExpandedObjectives(!expandedObjectives)}>
          <h3 className="card-title">Flow Objectives</h3>
          <button className="expand-btn">
            {expandedObjectives ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
        
        {expandedObjectives && (
          <div className="objectives-list">
            {objectives.map((objective) => {
              const IconComponent = objective.icon;
              return (
                <div key={objective.id} className="objective-card">
                  <div className="objective-header">
                    <div className="objective-info">
                      <div className="objective-icon">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="objective-name">{objective.name}</h4>
                        <p className="objective-description">{objective.description}</p>
                      </div>
                    </div>
                    <button className="menu-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                  <div className="objective-metrics">
                    <div className="metric-badge badge-count">
                      <BarChart3 size={12} />
                      <span>{objective.metrics.count}</span>
                    </div>
                    <div className="metric-badge badge-warning">
                      <AlertTriangle size={12} />
                      <span>{objective.metrics.warnings}</span>
                    </div>
                    <div className="metric-badge badge-success">
                      <CheckCircle size={12} />
                      <span>{objective.metrics.success}</span>
                    </div>
                    <div className="metric-badge badge-percentage">
                      <TrendingUp size={12} />
                      <span>{objective.metrics.percentage}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}