import React, { useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ViewerContext } from "./Context";

// Colores para las diferentes familias
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#8dd1e1",
  "#82ca9d",
];

function PieCharts() {
  const { apuData } = useContext(ViewerContext);

  // Organizar los datos para el gráfico
  const data = apuData.reduce((acc, item) => {
    const existingFamily = acc.find((fam) => fam.name === item.familia);
    if (existingFamily) {
      existingFamily.value += item.total_insumo;
    } else {
      acc.push({ name: item.familia, value: item.total_insumo });
    }
    return acc;
  }, []);

  // Calcular el total de todos los valores para calcular los porcentajes
  const total = data.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => {
            const percent = ((value / total) * 100).toFixed(2);
            return `${name}: ${percent}%`;
          }}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieCharts;
