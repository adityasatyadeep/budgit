import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the components we'll use
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ items }) => {
    const categoryTotals = items.reduce((acc, item) => {
        const category = item.category;
        acc[category] = (acc[category] || 0) + parseFloat(item.price);
        return acc;
    }, {});

    const categories = {
        "Food": { emoji: "🍔", value: "Food", color: "#22c55e" },
        "Drinks": { emoji: "🥤", value: "Drinks", color: "#0ea5e9" },
        "Gas": { emoji: "⛽️", value: "Gas", color: "#fcd34d" },
        "Recreation": { emoji: "🏀", value: "Recreation", color: "#6b21a8" },
        "Groceries": { emoji: "🥕", value: "Groceries", color: "#14b8a6" },
        "Gifts": { emoji: "🎁", value: "Gifts", color: "#dc2626" },
        "Technology": { emoji: "💻", value: "Technology", color: "#334155" },
        "Rent": { emoji: "🏠", value: "Rent", color: "#f472b6" },
        "Miscellaneous": { emoji: "♾️", value: "Miscellaneous", color: "#525252" }
    }

    console.log("colors, ", Object.keys(categoryTotals).map(key => categories[key].color))

    const data = {


        labels: Object.keys(categoryTotals),
        datasets: [
            {
                data: Object.values(categoryTotals),
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
        },
    };

    return <Pie data={data} options={options} />;
};

export default PieChart;