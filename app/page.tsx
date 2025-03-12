import Image from "next/image";
import GraphTest from "./components/GraphTest";


export default function Home() {
  return (
    <main>
      <h2>Selecione a Loja através do código:</h2>
      <GraphTest />
    </main>
  );
}
