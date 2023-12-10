import React from "react";
import "../../../../styles/components/users/dashboard/pieChart.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data: ChartData<"pie", number[], unknown> = {
    labels: [
      "Jan",
      "Feb",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [3, 4, 8, 1, 6, 12, 15, 9, 11, 5, 2, 7],
        backgroundColor: [
          "aqua",
          "bloodorange",
          "purple",
          "#fffafa",
          "#afa",
          "magenta",
          "powderblue",
          "red",
          "snowflake",
          "yellow",
          "hsla(186, 73%, 34%, 0.825)",
          "cornsilk",
        ],
      },
      {
        data: [3, 4, 8, 1, 6, 12, 15, 9, 11, 5, 2, 7],
        backgroundColor: [
          "aqua",
          "bloodorange",
          "purple",
          "#fffafa",
          "#afa",
          "magenta",
          "powderblue",
          "red",
          "snowflake",
          "yellow",
          "hsla(186, 73%, 34%, 0.825)",
          "cornsilk",
        ],
      },
      {
        data: [3, 4, 8, 1, 6, 12, 15, 9, 11, 5, 2, 7],
        backgroundColor: [
          "aqua",
          "bloodorange",
          "purple",
          "#fffafa",
          "#afa",
          "magenta",
          "powderblue",
          "red",
          "snowflake",
          "yellow",
          "hsla(186, 73%, 34%, 0.825)",
          "cornsilk",
        ],
      },
    ],
  };

  const options: ChartOptions = {};
  return (
    <div className="Flight-Schedule-Frame">
      {/*style={{ height: "100%", width: "80%" }}*/}
      <Pie data={data}></Pie>
    </div>
  );
};
export default PieChart;
