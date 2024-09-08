import React, { useContext } from "react";
import { ViewerContext } from "./Context"; // Importa el contexto donde tienes los datos

function ComparacionProyeccionUso() {
  const {
    personalPorEspecialidad,
    apuData,
    especialidadesConSueldos,
    calcularFiniquitoPorEspecialidad,
  } = useContext(ViewerContext);
  console.log("apudata", apuData);

  // Calcular el total proyectado
  const calcularTotalProyectado = () => {
    return especialidadesConSueldos.reduce((total, item) => {
      const cantidades = personalPorEspecialidad[item.especialidad] || [];
      return (
        total +
        cantidades.reduce((sum, cantidad) => sum + cantidad * item.sueldo, 0)
      );
    }, 0);
  };
  // Función para calcular el total general de finiquitos
  const calcularTotalFiniquitos = () => {
    return especialidadesConSueldos.reduce((total, item) => {
      return total + calcularFiniquitoPorEspecialidad(item.especialidad);
    }, 0);
  };

  // Calcular el total disponible para Mano de Obra en apuData
  const calcularTotalDisponible = () => {
    return apuData.reduce((total, item) => {
      if (item.familia === "Mano de Obra") {
        return total + item.total_insumo;
      }
      return total;
    }, 0);
  };

  const totalProyectado = calcularTotalProyectado();
  const totalDisponible = calcularTotalDisponible();
  const totalProyectadoMasFiniquitos =
    calcularTotalProyectado() + calcularTotalFiniquitos();
  const totalSaldoDisponible =
    calcularTotalDisponible() - totalProyectadoMasFiniquitos;
  const porcentajeUtilizado =
    (totalProyectadoMasFiniquitos / totalDisponible  ) * 100;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Comparación Proyección vs Uso</h2>
      <div className="flex">
        <p className="bg-gray-200 p-2 rounded-lg flex-col-2 ">
          Total Disponible (Mano de Obra):{" "}
          {totalDisponible.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </p>
        <p className="bg-gray-200 p-2 rounded-lg flex-col-2 ml-2 ">
          {" "}
          Total Proyectado MO:{" "}
          {totalProyectado.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </p>
        <p className="bg-gray-200 p-2 rounded-lg flex-col-2 ml-2">
          {" "}
          Total Finiquitos:{" "}
          {calcularTotalFiniquitos().toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </p>
        <p className="bg-gray-200 p-2 rounded-lg flex-col-2 ml-2">
          Total Proyectado + Finiquitos:{" "}
          {totalProyectadoMasFiniquitos.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </p>
        <p className="bg-gray-200 p-2 rounded-lg flex-col-2 ml-2 ">
          {" "}
          Saldo Disponible:{" "}
          {totalSaldoDisponible.toLocaleString("es-CL", {
            style: "currency",
            currency: "CLP",
          })}
        </p>
        <p className="bg-gray-200 p-2 rounded-lg flex-col-2 ml-2 ">
          {" "}
          Porcentaje Utilizado:{" "}
          {porcentajeUtilizado.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default ComparacionProyeccionUso;
