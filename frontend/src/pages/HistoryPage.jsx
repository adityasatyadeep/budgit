import React, { useEffect, useState } from 'react';
import History from '../components/History';
import FilterBar from '../components/FilterBar';
import MultipleSelect from '../components/MultipleSelect';

const HistoryPage = () => {

  const filters = {
    category: "Gas",
    min_price: 0,
    max_price: 11 
  }
  
  return (
    <>
      <FilterBar />
      <History filters={filters}/>
    </>
    
  );
};

export default HistoryPage;
