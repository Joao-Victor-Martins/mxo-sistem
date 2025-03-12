"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// ✅ Registrar os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Fev", "Mar"],
  datasets: [
    {
      label: "Vendas",
      data: [4000, 3000, 2000],
      borderColor: "blue",
      borderWidth: 2,
    },
  ],
};

export default function GraphTest() {
  return (
    <div style={{width: 800, height: 400}}>
      <Line data={data} />
    </div>
  );
}
