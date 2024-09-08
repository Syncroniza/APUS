import React, { useState, useEffect, useContext } from "react";
import { ViewerContext } from "./Context";
import axios from "axios";

function ProjeccionManoObra() {
  const {
    numeroDeMeses,
    setNumeroDeMeses,
    personalPorEspecialidad,
    setPersonalPorEspecialidad,
    especialidadesConSueldos,
  } = useContext(ViewerContext);

  const [proyeccionId, setProyeccionId] = useState(null);
  console.log("personalPorEspecialidad", personalPorEspecialidad);

  const handleNumeroDeMesesChange = (e) => {
    const newNumeroDeMeses = parseInt(e.target.value);
    setNumeroDeMeses(newNumeroDeMeses);
    setPersonalPorEspecialidad((prevState) =>
      especialidadesConSueldos.reduce((acc, especialidad) => {
        acc[especialidad.especialidad] = Array(newNumeroDeMeses).fill(0);
        return acc;
      }, {})
    );
  };

  const handlePersonalChange = (especialidad, mesIndex, cantidad) => {
    setPersonalPorEspecialidad((prevState) => {
      const updatedState = {
        ...prevState,
        [especialidad]: prevState[especialidad].map((cant, index) =>
          index === mesIndex ? cantidad : cant
        ),
      };
      console.log("Updated personalPorEspecialidad:", updatedState);
      return updatedState;
    });
  };

  const calcularTotalPorEspecialidad = (especialidad, sueldo) => {
    const cantidades = personalPorEspecialidad[especialidad] || [];
    return cantidades.reduce((total, cantidad) => total + cantidad * sueldo, 0);
  };

  const handleSubmit = async () => {
    const proyeccionData = especialidadesConSueldos.map((item) => ({
      especialidad: item.especialidad,
      sueldo: item.sueldo,
      meses: personalPorEspecialidad[item.especialidad].map(
        (cantidad, index) => ({
          mes: index + 1,
          cantidadPersonal: cantidad,
        })
      ),
      totalCosto: calcularTotalPorEspecialidad(item.especialidad, item.sueldo),
    }));
    try {
      const response = await axios.post("http://localhost:8000/proyeccionmo/", {
        proyecciones: proyeccionData,
      });
      console.log("Proyección enviada con éxito", response.data);
    } catch (error) {
      console.error("Error al enviar datos", error);
    }
  };
  const handlePatch = async () => {
    const proyeccionData = especialidadesConSueldos.map((item) => ({
      especialidad: item.especialidad,
      sueldo: item.sueldo,
      meses: personalPorEspecialidad[item.especialidad].map(
        (cantidad, index) => ({
          mes: index + 1,
          cantidadPersonal: cantidad,
        })
      ),
      totalCosto: calcularTotalPorEspecialidad(item.especialidad, item.sueldo),
    }));
    console.log("Datos que se envían en PATCH:", proyeccionData);
    try {
      const response = await axios.patch(
        `http://localhost:8000/proyeccionmo/${proyeccionId}`,
        {
          proyecciones: proyeccionData,
        }
      );
      console.log("responsepatch", response.data.proyecciones); // Accede a `proyecciones`
      console.log(
        "Proyección actualizada con éxito",
        response.data.proyecciones
      );
    } catch (error) {
      console.error("Error al actualizar datos", error);
    }
  };

  useEffect(() => {
    const fetchProyeccion = async () => {
      try {
        const response = await axios.get("http://localhost:8000/proyeccionmo/");
        const data = response.data.data;
        console.log("datafetch", data);

        if (data && data.length > 0) {
          const projection = data[0]; // Trabaja con la primera proyección

          setProyeccionId(projection._id);
          setNumeroDeMeses(projection.proyecciones[0].meses.length); // Asume que todas las especialidades tienen el mismo número de meses

          const personalData = especialidadesConSueldos.reduce(
            (acc, especialidad) => {
              const especialidadData = projection.proyecciones.find(
                (item) => item.especialidad === especialidad.especialidad
              );

              acc[especialidad.especialidad] = especialidadData
                ? especialidadData.meses.map((mes) => mes.cantidadPersonal)
                : Array(projection.proyecciones[0].meses.length).fill(0);

              return acc;
            },
            {}
          );

          setPersonalPorEspecialidad(personalData);
          console.log("personalPorEspecialidad", personalData);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchProyeccion();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">Duración del proyecto (en meses):</label>
        <select
          value={numeroDeMeses}
          onChange={handleNumeroDeMesesChange}
          className="p-2 border border-gray-300 rounded-lg"
        >
          {Array.from({ length: 24 }, (_, i) => i + 1).map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white border-collapse mt-6">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            <th className="border border-gray-300 p-2 text-sm">Especialidad</th>
            {Array.from({ length: numeroDeMeses }, (_, i) => (
              <th key={i} className="border border-gray-300 p-2 text-sm">
                Mes {i + 1}
              </th>
            ))}
            <th className="border border-gray-300 p-2 text-sm">Total</th>
          </tr>
        </thead>
        <tbody>
          {especialidadesConSueldos.map((item) => (
            <tr key={item.especialidad}>
              <td className="border border-gray-300 p-2 text-sm">
                {item.especialidad}
              </td>
              {personalPorEspecialidad[item.especialidad]?.map(
                (cantidad, mesIndex) => (
                  <td
                    key={mesIndex}
                    className="border border-gray-300 p-2 text-sm"
                  >
                    <select
                      value={cantidad}
                      onChange={(e) =>
                        handlePersonalChange(
                          item.especialidad,
                          mesIndex,
                          parseInt(e.target.value)
                        )
                      }
                      className="p-2 border border-gray-300 rounded-lg"
                    >
                      {Array.from({ length: 21 }, (_, i) => i).map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </select>
                  </td>
                )
              )}
              <td className="border border-gray-300 p-2 text-sm">
                {calcularTotalPorEspecialidad(
                  item.especialidad,
                  item.sueldo
                ).toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
      >
        Enviar Proyección
      </button>
      <button
        onClick={handlePatch}
        className="mt-4  ml-4 p-2 bg-green-500 text-white rounded-lg"
      >
        Enviar Cambios
      </button>
    </div>
  );
}

export default ProjeccionManoObra;
