import React, { useState, useEffect } from 'react';

// const FormRow = ({ txt, onChange}) => {

//     const [formData, setFormData] = useState({
//         category: '',
//         description: '',
//         price: '',
//         });

//         const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

    
//     return (
//         <div>
//             <label>
//             {txt}: 
//             <input
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={onChange}
//             />
//             </label>
//         </div>
//     )
// }

const FormRow = ({ label, type, name, value, options, onChange }) => {
  if (type != "select"){  
    return (
        <div className="mb-4 flex items-center">
          <label className="text-pink-700 text-sm font-bold w-1/3 pr-4 text-right" htmlFor={name}>
            {label}:
          </label>
          <input
            className="shadow appearance-none border rounded w-1/2 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={name}
            type={type}
            name={name}
            value={value}
            step="0.01"
            min="0.01"
            onChange={onChange}
          />
        </div>
      );
    }
  else {
    return (
      <div className="mb-4 flex items-center">
        <label className="text-pink-700 text-sm font-bold w-1/3 pr-4 text-right" htmlFor={name}>
          {label}:
        </label>
        <select
          className="shadow appearance-none border rounded w-1/2 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
              <option value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }  
};

export default FormRow