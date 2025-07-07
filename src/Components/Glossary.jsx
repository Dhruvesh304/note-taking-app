import React, { useEffect, useState } from 'react';

const GlossaryManager = () => {
  const [glossary, setGlossary] = useState({});
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('Glossary')) || {};
    setGlossary(stored);
  }, []);

  const saveGlossary = (newGlossary) => {
    localStorage.setItem('Glossary', JSON.stringify(newGlossary));
    setGlossary(newGlossary);
  };

  const handleAdd = () => {
    if (!term || !definition) return;
    const updated = { ...glossary, [term]: definition };
    saveGlossary(updated);
    setTerm('');
    setDefinition('');
  };

  const handleDelete = (key) => {
    const updated = { ...glossary };
    delete updated[key];
    saveGlossary(updated);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Glossary Manager</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="border px-2 py-1 rounded w-1/3"
          placeholder="Term"
        />
        <input
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          className="border px-2 py-1 rounded w-2/3"
          placeholder="Definition"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-1 rounded">Add</button>
      </div>

      <ul className="space-y-2">
        {Object.entries(glossary).map(([key, value]) => (
          <li key={key} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <div>
              <strong>{key}</strong>: {value}
            </div>
            <button onClick={() => handleDelete(key)} className="text-sm text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlossaryManager;
