// components/NodeForms/StartNodeForm.jsx
import React, { useState, useEffect } from 'react';

export default function StartNodeForm({ node, updateNode }) {
  const [title, setTitle] = useState(node.data.title || '');

  useEffect(() => {
    setTitle(node.data.title || '');
  }, [node.id]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateNode(node.id, { title: newTitle });
  };

  return (
    <div>
      <h4>Start Node Configuration</h4>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          style={{ width: '100%', marginTop: '5px' }}
        />
      </label>
    </div>
  );
}
