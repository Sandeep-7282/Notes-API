import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom';
import SavedNotes from '../src/components/SavedNotes';
function App() {
  // State object to store input values
  const [formData, setFormData] = useState({
    word: '',
    type: '',
    definitions: '',
    example: '',
    breakdown: '',
  });

  // Function to handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(formData))
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch('http://localhost:4000/api/notes/createnote', options);
      if (response.ok) {
        alert(`success:Note created successfully!`);
        window.location.reload();
      } else {
        const responseData = await response.json();
        // Check if the response has errors
        if (responseData.errors && responseData.errors.length > 0) {
          // Display errors as alerts
          responseData.errors.forEach((error) => {
            alert(`Error in ${error.path}: ${error.msg}`);
          });
        } else {
          console.error('Failed to create note. Status:', response.status);
        }
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);
    }
  }
  return (<>
    <div className='form-box'>
    <form onSubmit={handleSubmit}>
      {/* Input fields */}
      <div>
    <label htmlFor="word">Word : </label>
    <input
      type="text"
      id="word"
      name="word"
      value={formData.word}
      onChange={handleInputChange}
      placeholder="Word"
    />
  </div>
  {/* Type Input */}
  <div>
    <label htmlFor="type">Type : </label>
    <input
      type="text"
      id="type"
      name="type"
      value={formData.type}
      onChange={handleInputChange}
      placeholder="Type"
    />
  </div>

  {/* Definition Input */}
  <div>
    <label htmlFor="definition">Definition : </label>
    <input
      type="text"
      id="definition"
      name="definitions"
      value={formData.definition}
      onChange={handleInputChange}
      placeholder="Definition"
    />
  </div>

  {/* Example Input */}
  <div>
    <label htmlFor="example">Example : </label>
    <input
      type="text"
      id="example"
      name="example"
      value={formData.example}
      onChange={handleInputChange}
      placeholder="Example"
    />
  </div>

  {/* Breakdown Input */}
  <div>
    <label htmlFor="breakdown">Word breakdown : </label>
    <input
      type="text"
      id="breakdown"
      name="breakdown"
      value={formData.breakdown}
      onChange={handleInputChange}
      placeholder="Word breakdown"
    />
  </div>

      {/* Submit button */}
      <button type="submit">Save</button>
    </form>
    <Routes>
    <Route exact path="/saved-notes" Component={SavedNotes}>
        </Route>
        </Routes>
       
    </div>
     <SavedNotes />
     </>
  );
}
export default App;
