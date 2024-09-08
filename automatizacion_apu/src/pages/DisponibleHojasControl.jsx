import React, { useState, useContext, useEffect } from "react";
import { ViewerContext } from "../components/Context";
import Sidebardb from "../components/SideBar";

function DisponibleHojasControl() {
  const { apuData } = useContext(ViewerContext);
  const [subFamilyTotals, setSubFamilyTotals] = useState({});

  useEffect(() => {
    if (apuData.length > 0) {
      const totals = apuData.reduce((acc, apu) => {
        if (apu.subfamily) {
          if (!acc[apu.subfamily]) {
            acc[apu.subfamily] = 0;
          }
          acc[apu.subfamily] += apu.total_insumo || 0;
        }
        return acc;
      }, {});

      setSubFamilyTotals(totals);
    }
  }, [apuData]);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebardb className="w-full md:w-1/4" />
      <div className="w-full md:w-3/4 p-4">
        <h1 className="text-xl font-semibold mb-4">Disponible por Subfamilia</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 text-left">Subfamilia</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Dinero Disponible</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(subFamilyTotals).map(([subfamily, total]) => (
                <tr key={subfamily}>
                  <td className="border px-4 py-2">{subfamily}</td>
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
        </div>
      </div>
    </div>
  );
}

export default DisponibleHojasControl;
