// components/NodeForms/EndNodeForm.jsx
import React, { useState, useEffect } from 'react';

export default function EndNodeForm({ node, updateNode }) {
  const [title, setTitle] = useState(node.data.title || '');

  useEffect(() => {
    setTitle(node.data.title || '');
  }, [node.id]);

  return (
    <div>
      <h4>End Node Configuration</h4>
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
  );
}
