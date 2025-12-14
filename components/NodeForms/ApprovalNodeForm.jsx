// components/NodeForms/ApprovalNodeForm.jsx
import React, { useState, useEffect } from 'react';

export default function ApprovalNodeForm({ node, updateNode }) {
  const [title, setTitle] = useState(node.data.title || '');
  const [approver, setApprover] = useState(node.data.approver || '');

  useEffect(() => {
    setTitle(node.data.title || '');
    setApprover(node.data.approver || '');
  }, [node.id]);

  return (
    <div>
      <h4>Approval Node Configuration</h4>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              updateNode(node.id, { title: e.target.value });
            }}
            style={{ width: '100%', marginTop: '5px' }}
          />
        </label>
      </div>
      <div>
        <label>
          Approver:
          <input
            type="text"
            value={approver}
            onChange={(e) => {
              setApprover(e.target.value);
              updateNode(node.id, { approver: e.target.value });
            }}
            style={{ width: '100%', marginTop: '5px' }}
          />
        </label>
      </div>
    </div>
  );
}
