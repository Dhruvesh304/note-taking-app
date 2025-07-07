// src/FullEditor.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const FullEditor = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const editingNote = location.state?.editNote || null;

  useEffect(() => {
    if (editingNote) {
      ref.current.innerHTML = editingNote.text;
    }
  }, [editingNote]);

  const formatText = (command, value = null) => {
    ref.current.focus();
    if (document.queryCommandSupported(command)) {
      document.execCommand(command, false, value);
    }
  };

  const fetchGlossaryFromAI = async (text) => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [
            {
              role: 'user',
              content: `Extract technical terms from the following text and return as a JSON object like { "React": "A library..." }:\n\n${text}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', response.status, errorText);
        return {};
      }

      let content = await response.json();
      content = content.choices?.[0]?.message?.content?.trim();

      if (!content) return {};

      if (content.startsWith('```json')) {
        content = content.replace(/^```json\s*/, '').replace(/```$/, '').trim();
      } else if (content.startsWith('```')) {
        content = content.replace(/^```\s*/, '').replace(/```$/, '').trim();
      }

      return JSON.parse(content);
    } catch (error) {
      console.error('Glossary fetch failed:', error);
      return {};
    }
  };

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

  const handleSave = async () => {
    const content = ref.current.innerText.trim();
    if (!content) return alert('Note is empty!');

    setLoading(true);

    try {
      const storedGlossary = JSON.parse(localStorage.getItem('Glossary')) || {};
      const words = Array.from(new Set(content.match(/\b\w+\b/g)));
      const glossaryToUse = {};
      const missingWords = [];

      for (const word of words) {
        if (storedGlossary[word]) {
          glossaryToUse[word] = storedGlossary[word];
        } else {
          missingWords.push(word);
        }
      }

      if (missingWords.length > 0) {
        const aiGlossary = await fetchGlossaryFromAI(content);
        Object.assign(glossaryToUse, aiGlossary);

        const updatedGlossary = { ...storedGlossary, ...aiGlossary };
        localStorage.setItem('Glossary', JSON.stringify(updatedGlossary));
      }

      const highlighted = highlightTerms(content, glossaryToUse);

      const existing = JSON.parse(localStorage.getItem('Notes')) || [];

      const updatedNotes = editingNote
        ? existing.map(note =>
            note.id === editingNote.id ? { ...note, text: highlighted } : note
          )
        : [...existing, { id: uuid(), text: highlighted, pinned: false }];

      localStorage.setItem('Notes', JSON.stringify(updatedNotes));
      navigate('/', { state: { reload: Date.now() } });
    } catch (error) {
      console.error(error);
      alert('Something went wrong while saving the note.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">📝 Text Editor</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => formatText('bold')} className="bg-slate-300 px-3 py-1 rounded font-bold">B</button>
          <button onClick={() => formatText('italic')} className="bg-slate-300 px-3 py-1 rounded italic">I</button>
          <button onClick={() => formatText('underline')} className="bg-slate-300 px-3 py-1 rounded underline">U</button>
          <button onClick={() => formatText('justifyLeft')} className="bg-slate-300 px-2 py-1 rounded">Left</button>
          <button onClick={() => formatText('justifyCenter')} className="bg-slate-300 px-2 py-1 rounded">Center</button>
          <button onClick={() => formatText('justifyRight')} className="bg-slate-300 px-2 py-1 rounded">Right</button>

          <select
            onChange={(e) => formatText('fontSize', e.target.value)}
            className="px-2 py-1 bg-slate-300 border rounded"
          >
            <option value="">Font Size</option>
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
        </div>

        <div
          ref={ref}
          contentEditable
          className="min-h-[300px] bg-white border p-4 rounded-md shadow text-black outline-none"
          suppressContentEditableWarning
        ></div>

        <button
          onClick={handleSave}
          disabled={loading}
          className={`mt-4 px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Saving...' : 'Save Note'}
        </button>

        {loading && (
          <div className="mt-2 text-sm text-gray-600">⏳ Generating glossary and saving note...</div>
        )}
      </div>
    </div>
  );
};

export default FullEditor;
