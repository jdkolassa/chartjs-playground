import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  Legend,
  LineController,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { DateTime, Interval } from 'luxon';

const returnLabels = (): string[] => {
  const today = DateTime.now();
  const benchDate = DateTime.fromFormat('2019-12', 'yyyy-MM');
  const interval = Interval.fromDateTimes(benchDate, today);
  const length = Math.floor(interval.length('months'));
  let labels: string[] = [];
  for (let i = 1; i < length; i++) {
    labels.push(benchDate.plus({ months: i }).toFormat("MMM'.' yyyy"));
  }
};

const generateRandomData = (): number[] => {
  let rando: number[] = [];
  for (let i = 0; i < 36; i++) {
    rando.push(Math.random() * 10);
  }
  return rando;
};

export default function Chart() {
  ChartJS.register([
    LinearScale,
    CategoryScale,
    LineElement,
    Legend,
    LineController,
    PointElement,
  ]);
  const labels = returnLabels();
  const numData = generateRandomData();

  const data = {
    labels,
    datasets: [
      {
        label: 'Test Set',
        data: numData,
        borderColor: 'turquoise',
        backgroundColor: 'navy',
      },
    ],
  };

  const options = {
    label: 'Test',
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        type: 'linear',
        position: 'left',
      },
      x: {
        type: 'time',
        display: true,
        ticks: {
          callback: function (val, index: number) {
            return index % 3 === 0 ? val : '';
          },
        },
      },
    },
  };

  return <Line options={options} data={data} />;
}
