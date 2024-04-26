import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './index.css';

export default function Charts() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartRef = useRef(null);

  const apiUrl = 'http://127.0.0.1:5000'; //process.env.API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/analytics/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (!data || !data.data || !data.data.admin || !data.data.normal) return;

    const barData = {
      labels: ['Ativos', 'Inativos'],
      datasets: [
        {
          label: 'Admin',
          data: [data.data.admin.active, data.data.admin.inactive],
          backgroundColor: ['orange', 'orange']
        },
        {
          label: 'Normal',
          data: [data.data.normal.active, data.data.normal.inactive],
          backgroundColor: ['steelblue', 'steelblue']
        }
      ]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    const myChart = new Chart(chartRef.current, {
      type: 'bar',
      data: barData,
      options: chartOptions
    });

    return () => myChart.destroy(); 

  }, [data]);

  return (
    <div className='graficos'>
      <h1>Usuários</h1>
      <canvas ref={chartRef} />
    </div>
  );
}
