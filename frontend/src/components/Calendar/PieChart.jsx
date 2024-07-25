import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the components we'll use
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ items, categories }) => {
    const categoryTotals = items.reduce((acc, item) => {
        const category = item.category;
        acc[category] = (acc[category] || 0) + parseFloat(item.price);
        return acc;
    }, {});

    
    const formattedData = Object.keys(categoryTotals).map(category => {
        const value = categoryTotals[category];
        return {
            label: categories[category] ? categories[category].value : category,
            valuelabel: `$${value.toFixed(2)}`,
            value: value
        };
    });

    const data = {


        labels: formattedData.map(item => item.label),
        datasets: [
            {
                data: formattedData.map(item => item.value),
                backgroundColor: Object.keys(categoryTotals).map(key => categories[key].color),
                borderColor: [
                    'white',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sample Pie Chart',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const index = context.dataIndex;
                        // Return the formatted value from formattedData
                        return formattedData[index].valuelabel;
                    }
                }
            }
        },
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;