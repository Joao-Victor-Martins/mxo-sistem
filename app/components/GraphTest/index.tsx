"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import dataBaseVendas from "@/app/database/vendas.json";
import { useState } from "react";
import CalendarSelected from "../CalendarSelected";

// ✅ Registrar os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function GraphTest() {
  const [lojas, setLojas] = useState<number>();
  const [lojaSelected, setLojaSelected] = useState<string>("TODAS AS LOJAS");

  function changeLoja(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "1") {
      setLojaSelected("ÓTICA DINIZ");
    } else if (event.target.value === "2") {
      setLojaSelected("ÓTICA OURO PRIME");
    } else if (event.target.value === "3") {
      setLojaSelected("ÓTICA OURO PAULISTA");
    } else {
      setLojaSelected("TODAS AS LOJAS");
    }
  }

  const labels = dataBaseVendas
    .filter((loja) => loja.LOJA === (lojaSelected === "TODAS AS LOJAS" ? loja.LOJA : lojaSelected))
    .map((loja) => loja.MES);

  const data = {
    labels: labels,
    datasets: [
      {
        label: lojaSelected,
        data: dataBaseVendas
          .filter((loja) => loja.LOJA === (lojaSelected === "TODAS AS LOJAS" ? loja.LOJA : lojaSelected))
          .map((row) => row.CARTÃO),
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ padding: 40, width: 800, height: 400 }}>
      {/* <CalendarSelected /> */}
      <input
        onChange={changeLoja}
        placeholder="Selecione a Loja"
        type="number"
        id="loja"
        name="loja"
        value={lojas}
      />
      <h1>Gráfico de Vendas</h1>
      <Bar data={data} />
    </div>
  );
}
