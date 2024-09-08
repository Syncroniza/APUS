import React, { useContext } from "react";
import { ViewerContext } from "./Context";



function ManoObraDisponible() {
  const { numeroDeMeses, personalPorEspecialidad ,calcularFiniquitoPorEspecialidad,especialidadesConSueldos} = useContext(ViewerContext);

  
  // Función para calcular el total por especialidad
  const calcularTotalPorEspecialidad = (especialidad) => {
    const cantidades = personalPorEspecialidad[especialidad] || [];
    const sueldo =
      especialidadesConSueldos.find(
        (item) => item.especialidad === especialidad
      )?.sueldo || 0;

    return cantidades.reduce((total, cantidad) => total + cantidad * sueldo, 0);
  };

  // Función para calcular el total por mes
  const calcularTotalPorMes = (mesIndex) => {
    return especialidadesConSueldos.reduce((total, item) => {
      const cantidades = personalPorEspecialidad[item.especialidad] || [];
      return total + (cantidades[mesIndex] || 0) * item.sueldo;
    }, 0);
  };

  // Función para calcular el total general
  const calcularTotalGeneral = () => {
    return especialidadesConSueldos.reduce((total, item) => {
      return total + calcularTotalPorEspecialidad(item.especialidad);
    }, 0);
  };

  // Función para calcular el total general de finiquitos
  const calcularTotalFiniquitos = () => {
    return especialidadesConSueldos.reduce((total, item) => {
      return total + calcularFiniquitoPorEspecialidad(item.especialidad);
    }, 0);
  };

  return (
    <table className="min-w-full bg-white border-collapse mt-6">
      <thead className="sticky top-0 bg-gray-100 z-10">
        <tr>
          <th className="border border-gray-300 p-2 text-sm">Especialidad</th>
          {Array.from({ length: numeroDeMeses }, (_, i) => (
            <th key={i} className="border border-gray-300 p-2 text-sm">
              Mes {i + 1}
            </th>
          ))}
          <th className="border border-gray-300 p-2 text-sm">
            Total Especialidad
          </th>
          <th className="border border-gray-300 p-2 text-sm">
            Finiquito Trimestral
          </th>
        </tr>
      </thead>
      <tbody>
        {especialidadesConSueldos.map(({ especialidad, sueldo }) => (
          <tr key={especialidad}>
            <td className="border border-gray-300 p-2 text-sm">
              {especialidad}
            </td>
            {Array.from({ length: numeroDeMeses }).map((_, mesIndex) => {
              const cantidad =
                personalPorEspecialidad[especialidad]?.[mesIndex] || 0;
              const valorMes = cantidad * sueldo;
              return (
                <td
                  key={mesIndex}
                  className="border border-gray-300 p-2 text-sm"
                >
                  {valorMes.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </td>
              );
            })}
            <td className="border border-gray-300 p-2 text-sm">
              {calcularTotalPorEspecialidad(especialidad).toLocaleString(
                "es-CL",
                {
                  style: "currency",
                  currency: "CLP",
                }
              )}
            </td>
            <td className="border border-gray-300 p-2 text-sm">
              {calcularFiniquitoPorEspecialidad(especialidad).toLocaleString(
                "es-CL",
                {
                  style: "currency",
                  currency: "CLP",
                }
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td className="border border-gray-300 p-2 text-sm font-bold">
            Total Mes
          </td>
          {Array.from({ length: numeroDeMeses }, (_, i) => (
            <td
              key={i}
              className="border border-gray-300 p-2 text-sm font-bold"
            >
              {calcularTotalPorMes(i).toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}
            </td>
          ))}
          <td className="border border-gray-300 p-2 text-sm font-bold">
            {calcularTotalGeneral().toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </td>
          <td className="border border-gray-300 p-2 text-sm font-bold">
            {calcularTotalFiniquitos().toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ManoObraDisponible;
