// src/GlossaryViewer.jsx
import React, { useEffect, useState } from 'react';

const GlossaryViewer = () => {
  const [terms, setTerms] = useState({});

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('Notes')) || [];
    const glossary = {};

    notes.forEach(note => {
      const spanTags = note.text.matchAll(/<span.*?title="(.*?)".*?>(.*?)<\/span>/g);
      for (const match of spanTags) {
        const [, def, term] = match;
        glossary[term] = def;
      }
    });

    setTerms(glossary);
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">📚 Glossary Viewer</h2>
      {Object.keys(terms).length === 0 ? (
        <p className="text-gray-500">No glossary terms found yet.</p>
      ) : (
        <ul className="space-y-2 list-disc pl-5">
          {Object.entries(terms).map(([term, def]) => (
            <li key={term}>
              <strong>{term}:</strong> {def}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GlossaryViewer;
