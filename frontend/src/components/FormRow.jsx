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


const FormRow = ({ label, type, name, value, onChange }) => {
    return (
      <div className="mb-4">
        <label className="block text-pink-700 text-sm font-bold mb-2" htmlFor={name}>
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };

export default FormRow