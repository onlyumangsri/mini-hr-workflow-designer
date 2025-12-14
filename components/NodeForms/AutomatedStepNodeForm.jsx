// components/NodeForms/AutomatedStepNodeForm.jsx
import React from 'react';
import useFetchAutomations from '../../hooks/useFetchAutomations';

export default function AutomatedStepNodeForm({ node, updateNode }) {
  const automations = useFetchAutomations(); // e.g., [{id, name}, ...]

  return (
    <div>
      <h4>Automated Step Configuration</h4>
      <label>
        Title:{' '}
        <input
          type="text"
          value={node.data.title || ''}
          onChange={(e) => updateNode(node.id, { title: e.target.value })}
        />
      </label>
      <br />
      <label>
        Action:{' '}
        <select
          value={node.data.automationId || ''}
          onChange={(e) => updateNode(node.id, { automationId: e.target.value })}
        >
          <option value="">-- select an action --</option>
          {automations.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Parameters:{' '}
        <input
          type="text"
          placeholder="Optional params"
          value={node.data.params || ''}
          onChange={(e) => updateNode(node.id, { params: e.target.value })}
        />
      </label>
    </div>
  );
}
