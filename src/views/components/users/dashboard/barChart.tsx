import React from "react";
import "../../../../styles/components/users/dashboard/barChart.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const data: ChartData<"bar", (number | [number, number] | null)[], unknown> = {
  labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "occurence",
      data: [3, 4, 2, 1, 6, 12, 15, 9],
      backgroundColor: "powderblue",
      borderWidth: 1,
    },
    {
      label: "flights",
      data: [4, 10, 7, 1, 6, 11, 2, 8],
      backgroundColor: "cornsilk",
      borderWidth: 1,
    },
    {
      label: "places",
      data: [15, 13, 16, 7, 3, 5, 4, 2],
      backgroundColor: "marine",
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<"bar"> = {};

const BarChart = () => {
  return (
    <div className="Statistics-Frame">
      <Bar
        style={{ width: "100%", height: "100%" }}
        data={data}
        options={options}
      ></Bar>
    </div>
  );
};

export default BarChart;
