import { useState, useEffect } from "react";
import axios from "axios";

function DesgloseGG() {
  const [desglosegg, setDesglosegg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("desglosegg", desglosegg);

  useEffect(() => {
    const fetchDesglosegg = async () => {
      try {
        const response = await axios.get("http://localhost:8000/desglosegg/");
        console.log("responsedesgloseggg", response);
        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setDesglosegg(response.data.data); // Actualiza el estado de proyectos
        } else {
          console.error("Empty array of projects", response);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDesglosegg();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            <th>ProjectId</th>
            <th>Descripcion</th>
            <th>Detalle</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {desglosegg.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{item.projectId}</td>
              <td className="border border-gray-300 p-2">{item.descripcion}</td>
              <td className="border border-gray-300 p-2">{item.detalle}</td>
              <td className="border border-gray-300 p-2">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DesgloseGG;
