import React, { useState, useEffect } from 'react';

const SavedNotes = () => {
  // State to store grouped notes by date
  const [groupedNotes, setGroupedNotes] = useState([]);
<<<<<<< HEAD

  // API host URL
  //const host = `http://localhost:4000`;
  const host = `https://notes-api-dm7y.onrender.com`;

=======
  //const host=`http://localhost:4000/`
  const host=`https://notes-api-dm7y.onrender.com/`
>>>>>>> d842439e6ee02c2668683da2030c0e4854850097
  useEffect(() => {
    // Function to fetch notes from the API
    const fetchNotes = async () => {
      try {
        const options = {
          method: 'GET',
        };
        const resp = await fetch(`${host}/api/notes/getnotes`,options);
        
        // Check if the response is successful
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the response JSON
        const response = await resp.json();

        // Sort notes by timestamp in descending order
        const sortedNotes = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Group notes by date
        setGroupedNotes(groupNotesByDate(sortedNotes));
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    // Call the fetchNotes function when the component mounts
    fetchNotes();
  }, []);

  // Function to group notes by date
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

      {/* Iterate over grouped notes and display them */}
      {Object.entries(groupedNotes).map(([date, notes]) => (
        <div key={date}>
          <h3>{date}</h3>

          {/* Iterate over notes for each date */}
          {notes.map((note) => (
            <div className='note-items' key={note.id}>
              <div className='note-comp'>
                {/* Display note details */}
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

              {/* Display favorite and read/unread status */}
              {note.fav ? (
                <i className={'fa-solid fa-heart'} style={{ color: '#ff0000' }}></i>
              ) : (
                <i className={'fa-solid fa-heart'} style={{ color: '#d6d6d6' }}></i>
              )}
              {note.read ? (
                <p style={{ color: 'green' }}>Read</p>
              ) : (
                <p style={{ color: 'red' }}>Unread</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SavedNotes;
