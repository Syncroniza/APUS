import React, { useState, useContext } from "react";
import { ViewerContext } from "./Context";
import Modal from "react-modal";
import ModalApus from "./ModalApus";

Modal.setAppElement("#root");

function TablaAPUs() {
  const { apuData, formatCurrency, selectedApus, setSelectedApus } =
    useContext(ViewerContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterSubfamily, setFilterSubfamily] = useState("");
  const [filterNombreRecurso, setFilterNombreRecurso] = useState("");
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);
  const [filteredfamilies, setFilteredFamilies] = useState("");

  const filteredApusData = apuData.filter((apu) => {
    const filteredSubFamily = apu.subfamily
      ? apu.subfamily.toLowerCase().includes(filterSubfamily.toLowerCase())
      : true; // Incluye subfamilias vacías

    const filteredRecusosNombre = apu.nombre_recurso
      ? apu.nombre_recurso
          .toLowerCase()
          .includes(filterNombreRecurso.toLowerCase())
      : true; // Incluye nombres de recurso vacíos

    const filteredFamily = apu.familia
      ? apu.familia.toLowerCase().includes(filteredfamilies.toLocaleLowerCase())
      : true;

    return filteredSubFamily && filteredRecusosNombre && filteredFamily;
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredApusData];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredApusData, sortConfig]);

  const handleRowClick = (apu, event, index) => {
    if (event.shiftKey && lastSelectedIndex !== null) {
      const range = [lastSelectedIndex, index].sort((a, b) => a - b);
      const newSelected = [...selectedApus];
      for (let i = range[0]; i <= range[1]; i++) {
        const id = sortedData[i]._id;
        if (!newSelected.includes(id)) {
          newSelected.push(id);
        }
      }
      setSelectedApus(newSelected);
    } else {
      if (event.ctrlKey || event.metaKey) {
        if (selectedApus.includes(apu._id)) {
          setSelectedApus(selectedApus.filter((id) => id !== apu._id));
        } else {
          setSelectedApus([...selectedApus, apu._id]);
        }
      } else {
        setSelectedApus([apu._id]);
      }
    }
    setLastSelectedIndex(index);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    if (selectedApus.length > 0) {
      setIsModalOpen(true);
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name
      ? sortConfig.direction === "asc"
        ? "ascending"
        : "descending"
      : undefined;
  };

  return (
    <div className="h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-semibold mb-4">Tabla de APUs</h1>

      {/* Campo de entrada para filtrar por subfamilia */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Filtrar por Subfamilia"
          value={filterSubfamily}
          onChange={(e) => setFilterSubfamily(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <div className="flex">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filtrar por Nombre recurso"
              value={filterNombreRecurso}
              onChange={(e) => setFilterNombreRecurso(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filtrar por Familia"
              value={filteredfamilies}
              onChange={(e) => setFilteredFamilies(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {sortedData.length > 0 ? (
          <table className="min-w-full bg-white border-collapse">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                {[
                  { key: "projectId", label: "ProjectId" },
                  { key: "cod_padre", label: "cod_padre" },
                  { key: "cod_partida", label: "cod_partida" },
                  { key: "cod_subpartida", label: "cod_subpartida" },
                  { key: "cod_insumo", label: "cod_insumo" },
                  { key: "nombre_partida", label: "nombre_partida" },
                  { key: "nombre_recurso", label: "nombre_recurso" },
                  { key: "familia", label: "familia" },
                  { key: "subfamily", label: "subfamilia" },
                  { key: "unidad_insumo", label: "unidad" },
                  { key: "total_insumo", label: "total_insumo" },
                ].map((column) => (
                  <th
                    key={column.key}
                    className={`border border-gray-300 p-2 text-sm cursor-pointer ${getClassNamesFor(
                      column.key
                    )}`}
                    onClick={() => requestSort(column.key)}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs">
              {sortedData.map((apu) => (
                <tr
                  key={apu._id}
                  onClick={(event) => handleRowClick(apu, event)}
                  onContextMenu={handleContextMenu}
                  className={`cursor-pointer transition-colors duration-200 ${
                    selectedApus.includes(apu._id)
                      ? "bg-blue-200"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <td className="border border-gray-300 p-2">
                    {apu.projectId}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {apu.cod_padre}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {apu.cod_partida}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {apu.cod_subpartida}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {apu.cod_insumo}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {apu.nombre_partida}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {apu.nombre_recurso}
                  </td>
                  <td className="border border-gray-300 p-2">{apu.familia}</td>
                  <td className="border border-gray-300 p-2">
                    {apu.subfamily}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {apu.unidad_insumo}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formatCurrency(apu.total_insumo)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4">No hay datos disponibles</div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Seleccionar Subfamilia"
        className=" bg-white rounded-lg shadow-lg overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4"
        >
          Cerrar
        </button>
        <ModalApus />
      </Modal>
    </div>
  );
}

export default TablaAPUs;
