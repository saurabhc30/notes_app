import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Login from './Componnets/Login';
import Navbar from './Componnets/Navbar';
import './NotesPage.css';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/notes', {
        headers: { Authorization: token },
      });
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDeleteNote = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/notes/${notes[index]._id}`, {
        headers: { Authorization: token },
      });
      setNotes(notes.filter((_, i) => i !== index));
      if (selectedNoteIndex === index) {
        setSelectedNoteIndex(null);
        setEditingNoteIndex(null);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleNoteClick = (index) => {
    setSelectedNoteIndex(index);
    setEditingNoteIndex(index);
  };

  const handleAddNewNoteClick = () => {
    setSelectedNoteIndex(null);
    setEditingNoteIndex(null);
  };

  const handleAddNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/notes', newNote, {
        headers: { Authorization: token },
      });
      setNotes([...notes, response.data]);
      setNewNote({ title: '', content: '' });
      setSelectedNoteIndex(notes.length);
      setEditingNoteIndex(notes.length);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleNoteChange = async (index, key, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index][key] = value;
    setNotes(updatedNotes);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/notes/${updatedNotes[index]._id}`, updatedNotes[index], {
        headers: { Authorization: token },
      });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setNotes([]);
  };

  const handleSearch = (query) => {
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Navbar onSearch={handleSearch} onLogout={handleLogout} />
          <div className="notes-page">
            <div className="sidebar">
              <button className="add-new-note-button" onClick={handleAddNewNoteClick}>
                Add New Note
              </button>
              <ul>
                {filteredNotes.map((note, index) => (
                  <li
                    key={note._id}
                    className={`note-item ${index === selectedNoteIndex ? 'selected' : ''}`}
                    onClick={() => handleNoteClick(index)}
                  >
                    {note.title}
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(index);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="note-display">
              {editingNoteIndex !== null ? (
                <div className="edit-note-form">
                  <form>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={filteredNotes[editingNoteIndex].title}
                      onChange={(e) => handleNoteChange(editingNoteIndex, 'title', e.target.value)}
                      required
                    />
                    <textarea
                      name="content"
                      placeholder="Content"
                      value={filteredNotes[editingNoteIndex].content}
                      onChange={(e) => handleNoteChange(editingNoteIndex, 'content', e.target.value)}
                      required
                      className="large-textarea"
                    ></textarea>
                  </form>
                </div>
              ) : selectedNoteIndex !== null ? (
                <div className="view-note">
                  <h2>{notes[selectedNoteIndex].title}</h2>
                  <p>{notes[selectedNoteIndex].content}</p>
                </div>
              ) : (
                <div className="add-note-form">
                  <form>
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      required
                    />
                    <textarea
                      name="content"
                      placeholder="Content"
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      required
                      className="large-textarea"
                    ></textarea>
                    <button type="button" onClick={handleAddNote}>
                      Add Note
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
};

export default NotesPage;
