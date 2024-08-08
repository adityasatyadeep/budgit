import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import FilterBar from './FilterBar';

const History = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange,setPriceRange] = useState([0,100]);

    const userId = 1; // Replace with the actual user ID you want to use

    const [filters2, setFilters2] = useState({
      categories: ['Food', 'Drinks', 'Gas', 'Recreation', 'Groceries', 'Gifts', 'Technology', 'Rent', 'Miscellaneous'],
      min_price: 0, 
      max_price: 20
    });

    const dateOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    };

    const handlePriceRange = (range) => {
      setPriceRange(range);
      console.log("newValue", range);
    }
    const handleChangeOfFilters = (name, value) => {
      // const { name, value } = e.target;
      setFilters2({
          ...filters2,
          [name]: value,
      });
      console.log(name, value)
    };

    const fetchData = async () => {
      try {
        // let sortRange = priceRange.sort();
        console.log({categories: filters2["categories"].join(), min_price: priceRange[0], max_price: priceRange[1] })
        
        const response = await axios.get(`http://127.0.0.1:5000/getItems`, {
          params: { user_id: userId, categories: filters2["categories"].join(), min_price: priceRange[0], max_price: priceRange[1]},
        });

        // Ensure each row has a unique 'id' property
        const dataWithIds = response.data.map((item, index) => ({
          ...item,
          formattedDate: new Date(item.date).toLocaleString('en-US', dateOptions),
          id: item.id || index,
        }));

        setRows(dataWithIds);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      fetchData();
    }
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const columns = [
      { 
        field: 'formattedDate',
        headerName: 'Date',
        width: 200, 
      },
      { field: 'category', headerName: 'Category', width: 150 },
      { field: 'description', headerName: 'Description', width: 150 },
      {
        field: 'price',
        headerName: 'Price',
        width: 150,
        type: 'number',
        valueFormatter: (params) => {
          // Format the price to two decimal places
          return Number(params).toFixed(2);
        },
      },
      // Add more columns as per your data structure
    ];
  
    const calculateTotalPrice = (rows) => {
      return rows.reduce((sum, row) => sum + Number(row.price), 0);
    };
  
    const totalSumRow = {
      id: 'total',
      timestamp: '',
      category: '',
      description: 'Total',
      price: calculateTotalPrice(rows).toFixed(2), // Format the total price to two decimal places
    };
  
    return (
      <div className='bg-white'>
      <FilterBar onChange={handleChangeOfFilters} handlePriceRange={handlePriceRange} onSubmit={handleSubmit}/>
      <Container>
        <Typography variant="h4" gutterBottom>
          My transactions
        </Typography>
        <div style={{ height: 450, width: '100%' }}>
          <DataGrid
            rows={[...rows, totalSumRow]}
            columns={columns}
            pageSize={5}
            loading={loading}
            getRowId={(row) => row.id}
          />
        </div>
      </Container>
      </div>

    );
}

export default History