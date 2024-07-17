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
    { field: 'timestamp', headerName: 'Date-Time', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'description', headerName: 'description', width: 150 },
    { field: 'price', headerName: 'price', width: 150 },
    // Add more columns as per your data structure
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        History Page
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={loading}
        />
      </div>
    </Container>
  );
};

export default HistoryPage;
