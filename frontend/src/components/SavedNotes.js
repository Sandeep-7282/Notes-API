// SavedNotes.js
import React, { useState, useEffect } from 'react';

const SavedNotes = () => {
  const [groupedNotes, setGroupedNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const resp = await fetch('http://localhost:4000/api/notes/getnotes');

        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }

        const response = await resp.json();
        const sortedNotes = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setGroupedNotes(groupNotesByDate(sortedNotes));
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchNotes();
  }, []);

  const groupNotesByDate = (notes) => {
    const grouped = {};
    notes.forEach((note) => {
      const date = new Date(note.timestamp).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(note);
    });
    return grouped;
  };

  return (
    <div className='note-box'>
      <h2>Saved Notes</h2>
      {Object.entries(groupedNotes).map(([date, notes]) => (
        <div key={date}>
          <h3>{date}</h3>
          {notes.map((note) => (
            <div className='note-items' key={note.id}>
              <div className='note-comp'>
                <div>
                  <span>Word:</span> {note.word}
                </div>
                <div>
                  <span>Type:</span> {note.type}
                </div>
                <div>
                  <span>Definitions:</span> {note.definitions}
                </div>
                <div>
                  <span>Example:</span> {note.example}
                </div>
                <div>
                  <span>Word Breakdown:</span> {note.breakdown}
                </div>
              </div>
              {note.fav?
      <i className={'fa-solid fa-heart'} style={{color: '#ff0000'}}></i>:
      <i className={'fa-solid fa-heart'} style={{color: '#d6d6d6'}}></i>}
      {note.read?<p style={{color:'green'}}>Read</p>
        :<p style={{color:'red'}}>Unread</p>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SavedNotes;
