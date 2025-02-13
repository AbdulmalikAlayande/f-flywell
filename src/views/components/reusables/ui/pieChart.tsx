import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
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

  return (
    <div className="Flight-Schedule-Frame">
      {/**/}
      <Pie style={{ height: "50vh", width: "50vw" }} data={data}></Pie>
    </div>
  );
};
export default PieChart;
