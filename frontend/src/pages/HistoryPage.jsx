import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const HistoryPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 1; // Replace with the actual user ID you want to use

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/getItems`, {
          params: { user_id: userId },
        });

        // Ensure each row has a unique 'id' property
        const dataWithIds = response.data.map((item, index) => ({
          ...item,
          id: item.id || index,
        }));

        setRows(dataWithIds);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  const columns = [
    { 
      field: 'timestamp',
      headerName: 'Date-Time',
      width: 150, 
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
    <Container>
      <Typography variant="h4" gutterBottom>
        History Page
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
  );
};

export default HistoryPage;
