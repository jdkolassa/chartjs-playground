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

const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

console.log('Label length: ', labels.length);

const createTrendLine = (
  startValue: number,
  target: number,
  length: number
) => {
  // Target should be something like "2" or "35" and we need to convert that to percentage
  const pTarget: number = target * 0.01;
  // Now we multiply the startValue by the pTarget to get our finalValue
  const finalValue: number = startValue * pTarget;

  // Now let's create the array to store our data
  const dataValues: number[] = Array(length);
  dataValues[0] = startValue;
  dataValues[dataValues.length] = finalValue;
  const reducer = (startValue - finalValue) / (dataValues.length - 2);

  console.log('dataValues length: ', dataValues.length);

  // Now let's run the calculations!
  let workingValue = startValue;
  for (let i = 1; i < dataValues.length - 1; i++) {
    let thisValue = workingValue - reducer;
    console.log('thisValue: ', thisValue);
    if (thisValue > startValue || thisValue < finalValue) {
      throw new Error('Out of bounds error, please check script');
    } else {
      dataValues[i] = thisValue;
      workingValue = thisValue;
    }
  }

  if (dataValues.every((v) => v != undefined)) {
    return dataValues;
  } else {
    throw new Error('Undefined values in dataValues array');
  }
};

export default function Chart() {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    LineElement,
    Legend,
    LineController,
    PointElement
  );

  const trendData = createTrendLine(100, 30, labels.length);
  const data = {
    labels,
    datasets: [
      {
        label: 'Trendline test',
        data: trendData,
        fill: false,
        borderColor: 'rgb(255, 0, 0)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
}
