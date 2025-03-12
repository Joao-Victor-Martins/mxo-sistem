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
import { Bar } from "react-chartjs-2";
import dataBaseVendas from "@/app/database/vendas.json";
import { useState } from "react";
import LogoDiniz from "@/public/LOGO-DINIZ.png";
import LogoMXO from "@/public/LOGO-MXO.png";
import LogoPrime from "@/public/LOGO-PRIME.png";
import LogoPaulista from "@/public/LOGO-PAULISTA.png";
import Image from "next/image";

// ✅ Registrar os componentes necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraphTest() {
  const [lojaSelected, setLojaSelected] = useState<string>("TODAS AS LOJAS");
  const [logoSelected, setLogoSelected] = useState(LogoMXO);

  function changeLoja(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "1") {
      setLojaSelected("ÓTICA DINIZ");
      setLogoSelected(LogoDiniz);
    } else if (event.target.value === "2") {
      setLojaSelected("ÓTICA OURO PRIME");
      setLogoSelected(LogoPrime);
    } else if (event.target.value === "3") {
      setLojaSelected("ÓTICA OURO PAULISTA");
      setLogoSelected(LogoPaulista);
    } else {
      setLojaSelected("TODAS AS LOJAS");
      setLogoSelected(LogoMXO);
    }
  }

  // ✅ Filtrar os dados pela loja selecionada
  const vendasFiltradas = dataBaseVendas.filter(
    (venda) => lojaSelected === "TODAS AS LOJAS" || venda.LOJA === lojaSelected
  );

  // ✅ Somar os valores por forma de pagamento
  const pagamentosAgrupados = vendasFiltradas.reduce((acc, venda) => {
    Object.entries(venda.FORMAPAGAMENTO).forEach(([forma, valor]) => {
      acc[forma] = (acc[forma] || 0) + valor;
    });
    return acc;
  }, {} as Record<string, number>);

  // ✅ Criar arrays para Chart.js
  const labels = Object.keys(pagamentosAgrupados); // Formas de pagamento
  const valores = Object.values(pagamentosAgrupados); // Valores totais

  // ✅ Configuração dos dados do gráfico
  const data = {
    labels: labels, 
    datasets: [
      {
        label: lojaSelected,
        data: valores, // Valores por forma de pagamento
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: 40, width: 800, height: 400 }}>
      <Image height={100} width={100} src={logoSelected} alt="Logos" />
      
      <input
        onChange={changeLoja}
        placeholder="Selecione a Loja"
        type="number"
        id="loja"
        name="loja"
      />
      <h1>Gráfico de Vendas</h1>
      <Bar data={data} />
    </div>
  );
}
