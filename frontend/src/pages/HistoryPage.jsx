import React, { useEffect, useState } from 'react';
import History from '../components/History';
import FilterBar from '../components/FilterBar';
import MultipleSelect from '../components/MultipleSelect';

const HistoryPage = () => {

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //       const response = await axios.post('http://127.0.0.1:5000/getItems', formData);
  //       console.log(response.data);
  //   } catch (error) {
  //       console.error('There was an error!', error);
  //   }
  // };


  const filters = {
    category: "Food",
    min_price: 0,
    max_price: 100 
  }
  
  return (
    <>
      {/* <FilterBar onChange={handleChange}/> */}
      <History filters={filters}/>
    </>
    
  );
};

export default HistoryPage;
