// components/NodeForms/TaskNodeForm.jsx
import React, { useState, useEffect } from 'react';

export default function TaskNodeForm({ node, updateNode }) {
  const [title, setTitle] = useState(node.data.title || '');
  const [description, setDescription] = useState(node.data.description || '');

  useEffect(() => {
    setTitle(node.data.title || '');
    setDescription(node.data.description || '');
  }, [node.id]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    updateNode(node.id, { title: newTitle });
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    updateNode(node.id, { description: newDescription });
  };

  return (
    <div>
      <h4>Task Node Configuration</h4>
      <div style={{ marginBottom: '10px' }}>
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
      <div>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Brief description of this task"
            style={{ width: '100%', marginTop: '5px' }}
          />
        </label>
      </div>
    </div>
  );
}
