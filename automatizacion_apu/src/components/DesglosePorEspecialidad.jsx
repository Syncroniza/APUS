import { useContext } from "react";
import { ViewerContext } from "../components/Context";

function DesglosePorEspecialidad() {
  const { apuData } = useContext(ViewerContext);

  console.log("apuDat", apuData);
  // filtrar mano de obra

  const manoDeObraData = apuData.filter(
    (apu) => apu.familia === "Mano de obra"
  );

  const recursoTotals = manoDeObraData.reduce((acc, apu) => {
    const { nombre_recurso, total_insumo } = apu;

    if (!acc[nombre_recurso]) {
      acc[nombre_recurso] = 0;
    }
    acc[nombre_recurso] += total_insumo || 0;
    return acc;
  }, {});

  return (
    <div className="flex">
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">
          Desglose de Mano de Obra
        </h1>
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-sm">Recurso</th>
              <th className="border border-gray-300 p-2 text-sm">
                Total Disponible
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(recursoTotals).map(([nombre_recurso, total]) => (
              <tr key={nombre_recurso}>
                <td className="border border-gray-300 p-2">{nombre_recurso}</td>
                <td className="border border-gray-300 p-2">
                  {total.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DesglosePorEspecialidad;
