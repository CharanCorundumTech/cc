import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ data }) => {
    console.log(data)
  const [chartData, setChartData] = useState({
    series: [0, 0],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Pending', 'Completed'],
      responsive: [{
        breakpoint: 250,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    },
  });

  useEffect(() => {
    if (data) {
      const { total = 0, pending = 0, completed = 0 } = data;
      setChartData({
        ...chartData,
        series: [pending, completed],
      });
    }
  }, [data]);

  return (
    <div>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} id="chart">
        <ReactApexChart width={300} height={300} options={chartData.options} series={chartData.series} type="donut" />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
