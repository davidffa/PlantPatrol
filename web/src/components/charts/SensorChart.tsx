// components/BarChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  data: any

}

export const SensorChart = ({ data }: Props) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    elements: {
      line: {
        tension: 0.0, // Tension is for the line element
        fill: true,
        stepped: true
      },
    },
    title: {
      display: true,
      text: "Sensor Data Visualization",
    },
    layout: {
      padding: 20
    }
  };

  return <Line data={data} options={options} />;
};