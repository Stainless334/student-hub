import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function Notes() {
  const [editingId, setEditingId] = useState(null);
  const [notes, setNotes] = useLocalStorage("studentNotes", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  const addNote = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and note content.");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toLocaleDateString(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);

    setTitle("");
    setContent("");
  };

  const updateNote = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and note content.");
      return;
    }

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === editingId
          ? {
              ...note,
              title: title.trim(),
              content: content.trim(),
            }
          : note
      )
    );

    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const editNote = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };
  const toggleNote = (id) => {
    setExpandedNoteId((currentId) =>
      currentId === id ? null : id
    );
  };

  const deleteNote = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      );
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notes-page">
      <h1>My Notes</h1>
      <p>Write, organise and manage your study notes.</p>

      <form
        onSubmit={editingId !== null ? updateNote : addNote}
        className="note-form"
      >
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
        />

        <button type="submit">
          {editingId !== null ? "Update Note" : "Save Note"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search your notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="notes-search"
      />

      <div className="notes-list">
        {filteredNotes.length === 0 ? (
          <p>No notes found. Start by creating your first note!</p>
        ) : (
          filteredNotes.map((note) => (
            <div className="note-card" key={note.id}>
              <div
                className="note-header"
                onClick={() => toggleNote(note.id)}
              >
                <h3>{note.title}</h3>
          
                <span>
                  {expandedNoteId === note.id ? "▲" : "▼"}
                </span>
              </div>
          
              {expandedNoteId === note.id && (
                <div className="note-content">
                  <p>{note.content}</p>
                </div>
              )}
          
              <small>{note.createdAt}</small>
            
              <div className="note-actions">
                <button onClick={() => editNote(note)}>
                  Edit
                </button>
            
                <button onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notes;