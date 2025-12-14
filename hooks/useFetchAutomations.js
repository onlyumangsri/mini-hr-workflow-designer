// hooks/useFetchAutomations.js
import { useState, useEffect } from 'react';

export default function useFetchAutomations() {
  const [automations, setAutomations] = useState([]);
  useEffect(() => {
    fetch('/api/automations')
      .then((res) => res.json())
      .then((data) => setAutomations(data))
      .catch((err) => console.error('Failed to fetch automations', err));
  }, []);
  return automations;
}
