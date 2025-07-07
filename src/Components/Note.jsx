import React, { useEffect, useState } from 'react';

const Note = ({ note, onDelete, onEdit, onPin }) => {
  const [highlightedText, setHighlightedText] = useState(note.text);

  useEffect(() => {
    const storedGlossary = JSON.parse(localStorage.getItem('Glossary')) || {};

    const highlightTerms = (text, glossary) => {
      let html = text;
      Object.entries(glossary).forEach(([term, def]) => {
        const regex = new RegExp(`\\b(${term})\\b`, 'gi');
        html = html.replace(
          regex,
          `<span class="bg-yellow-100 underline decoration-dotted cursor-help" title="${def}">$1</span>`
        );
      });
      return html.replace(/\n/g, '<br>');
    };

    // Assuming note.text is raw text or already highlighted HTML
    // If it's HTML, strip tags to get raw text for re-highlighting
    const rawText = note.text.replace(/<[^>]*>?/gm, '');

    const newHighlighted = highlightTerms(rawText, storedGlossary);
    setHighlightedText(newHighlighted);
  }, [note.text]);

  return (
    <div className="bg-white p-4 rounded shadow relative">
      <div
        className="text-gray-800"
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      ></div>

      <div className="mt-4 flex justify-between">
        <button onClick={onEdit} className="text-blue-600 hover:underline">Edit</button>
        <button onClick={onDelete} className="text-red-600 hover:underline">Delete</button>
      </div>

      <button
        onClick={onPin}
        className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-600"
        title={note.pinned ? 'Unpin' : 'Pin'}
      >
        {note.pinned ? '📌' : '📍'}
      </button>
    </div>
  );
};

export default Note;
