import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Graph = ({ data }) => {
  const seriesData = [{
    name: 'Count',
    data: [
      { x: 'Approved', y: data.approved, color: '#00E396' },
      { x: 'Completed', y: data.completed, color: '#008FFB' },
      { x: 'Pending', y: data.pending, color: '#FEB019' },
      { x: 'Rejected', y: data.rejected, color: '#FF4560' }
    ]
  }];

  const options = {
    chart: {
      height: 350,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        columnWidth: '60%'
      }
    },
    xaxis: {
      categories: ['Approved', 'Completed', 'Pending', 'Rejected']
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={seriesData} type="bar" height={260} width={1000} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Graph;

