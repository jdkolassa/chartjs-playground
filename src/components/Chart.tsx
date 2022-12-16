import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  Legend,
  LineController,
  PointElement,
  ChartOptions,
  TimeScale,
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

  return labels;
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
    TimeScale,
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

  const options1: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        display: true,
        type: 'linear',
        position: 'left',
      },
      x: {
        type: 'category',
        display: true,
      },
    },
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  return <Line options={options1} data={data} />;
}
