import { useContext, useEffect, useState } from "react";
import { ViewerContext } from "../components/Context";
import Sidebardb from "../components/SideBar";
import PieCharts from "../components/PieCharts";
import { Pie } from "recharts";
function DisponibleFamilias() {
  const { apuData } = useContext(ViewerContext);
  const [familyTotal, setFamilyTotals] = useState([]);

  useEffect(() => {
    if (apuData.length > 0) {
      const totalsfamily = apuData.reduce((acc, apu) => {
        if (apu.familia) {
          if (!acc[apu.familia]) {
            acc[apu.familia] = 0;
          }
          acc[apu.familia] += apu.total_insumo || 0;
        }
        return acc;
      }, {});

      setFamilyTotals(totalsfamily);
    }
  }, [apuData]);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebardb className="w-full md:w-1/4" />
      <div className="w-full md:w-3/4 p-4">
        <h1 className="text-xl font-semibold mb-4">Disponible por familia</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 text-left">familia</th>
                <th className="py-2 px-4 bg-gray-200 text-left">
                  Dinero Disponible
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(familyTotal).map(([family, total]) => (
                <tr key={family}>
                  <td className="border px-4 py-2">{family}</td>
                  <td className="border px-4 py-2">
                    {total.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h1>Distribucion Porcentual por Familias</h1>
            <PieCharts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisponibleFamilias;
