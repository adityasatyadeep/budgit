import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    textBox1: '',
    textBox2: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://127.0.0.1:5000/upload', formData);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Text Box 1:
            <input
              type="text"
              name="category"
              value={formData.textBox1}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Text Box 2:
            <input
              type="text"
              name="description"
              value={formData.textBox2}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
