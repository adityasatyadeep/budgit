import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
    const [formData, setFormData] = useState({
        category: '',
        description: '',
        price: '',
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
          const response = await axios.post('http://127.0.0.1:5000/upload', formData);
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
                Category: 
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Description: 
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Price: $
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
}

export default Form