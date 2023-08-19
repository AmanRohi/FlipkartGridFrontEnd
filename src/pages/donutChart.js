import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DonutChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      createChart();
    }
  }, [data]);

  const generateRandomColor = () => {
    // Generate a random dark and colorful RGB color
    const r = Math.floor(Math.random() * 96) + 160;
    const g = Math.floor(Math.random() * 96) + 160;
    const b = Math.floor(Math.random() * 96) + 160;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const createChart = () => {
    const labels = data.map(item => item.businessDetails.name);
    const counts = data.map(item => item.totalCount);

    const backgroundColors = new Array(data.length).fill(null).map(() => generateRandomColor());

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: backgroundColors,
        }],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
      }
    });
  };

  return <canvas ref={chartRef} />;
};

export default DonutChart;
