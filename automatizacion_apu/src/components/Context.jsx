import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ViewerContext = createContext();

function ViewerProvider({ children }) {
  const [apuData, setApuData] = useState([]);
  const [selectedApus, setSelectedApus] = useState([]); // Estado para las tareas seleccionadas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numeroDeMeses, setNumeroDeMeses] = useState(1);
  const [personalPorEspecialidad, setPersonalPorEspecialidad] = useState({});

  const especialidadesConSueldos = [
    { especialidad: "Gerente Proyectos", sueldo: 6500000 },
    { especialidad: "Administrador de Obras", sueldo: 4500000 },
    { especialidad: "PT Obra Gruesa", sueldo: 3500000 },
    { especialidad: "PT Terminaciones", sueldo: 3500000 },
    { especialidad: "Aguatero", sueldo: 742000 },
    { especialidad: "Andamiero jefe", sueldo: 1012500 },
    { especialidad: "Ayu Andamiero", sueldo: 810000 },
    { especialidad: "Cuadrilla de Patio", sueldo: 715500 },
    { especialidad: "Aseo", sueldo: 715500 },
    { especialidad: "Carpinteros de entrega", sueldo: 1147500 },
    { especialidad: "Albañiles de entrega", sueldo: 1053000 },
    { especialidad: "Ayudantes", sueldo: 877500 },
    { especialidad: "Jornales encargados de piso", sueldo: 702000 },
    { especialidad: "Calugueros", sueldo: 742500 },
    { especialidad: "Canguero", sueldo: 877500 },
    { especialidad: "Operador Montacarga", sueldo: 742500 },
    { especialidad: "Llavero", sueldo: 742500 },
    { especialidad: "Albañil 1ra", sueldo: 1053000 },
    { especialidad: "Concretero", sueldo: 810000 },
    { especialidad: "Jornalero", sueldo: 675000 },
    { especialidad: "Mantencion", sueldo: 1282500 },
    { especialidad: "Carpintero Obra gruesa", sueldo: 1080000 },
    { especialidad: "Carpintero Terminaciones", sueldo: 1147500 },
  ].sort((a, b) => a.especialidad.localeCompare(b.especialidad));

  useEffect(() => {
    const fetchApusData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/apusdata");
        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setApuData(response.data.data); // Actualiza el estado de proyectos
        } else {
          console.error("Empty array of projects", response);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApusData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const formatCurrency = (value) => {
    // Formatea el valor como CLP
    const formattedValue = Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });

    // Reemplaza el símbolo de $ por UF
    return formattedValue.replace("$", "$ ");
  };

  // Función para calcular el finiquito cada 3 meses por especialidad
  const calcularFiniquitoPorEspecialidad = (especialidad) => {
    const cantidades = personalPorEspecialidad[especialidad] || [];
    const sueldo =
      especialidadesConSueldos.find(
        (item) => item.especialidad === especialidad
      )?.sueldo || 0;

    const finiquitos = [];
    for (let i = 2; i < cantidades.length; i += 3) {
      const cantidad = cantidades[i];
      const finiquito = (cantidad * sueldo * 3) / 12; // Ejemplo: 3 meses de sueldo dividido por 12 (1 mes)
      finiquitos.push(finiquito);
    }

    return finiquitos.reduce((total, finiquito) => total + finiquito, 0);
  };

  return (
    <ViewerContext.Provider
      value={{
        apuData,
        setApuData,
        formatCurrency,
        selectedApus,
        setSelectedApus,
        numeroDeMeses,
        setNumeroDeMeses,
        personalPorEspecialidad,
        setPersonalPorEspecialidad,
        calcularFiniquitoPorEspecialidad,
        especialidadesConSueldos,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
}

export default ViewerProvider;
