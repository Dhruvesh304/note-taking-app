// src/Notes.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Note from './Note';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Notes'));
    if (data) setNotes(data);
  }, [location.state?.reload]);

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('Notes', JSON.stringify(updatedNotes));
  };

  const editNote = (note) => {
    navigate('/editor', { state: { editNote: note } });
  };

  const togglePin = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('Notes', JSON.stringify(updatedNotes));
  };

  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">📚 My Notes</h1>
          <button
            onClick={() => navigate('/editor')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + New Note
          </button>
        </div>

        {sortedNotes.length === 0 ? (
          <p className="text-gray-500">No notes available. Click "New Note" to create one.</p>
        ) : (
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))]">
            {sortedNotes.map((note) => (
              <Note
                key={note.id}
                note={note}
                onDelete={() => deleteNote(note.id)}
                onEdit={() => editNote(note)}
                onPin={() => togglePin(note.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;