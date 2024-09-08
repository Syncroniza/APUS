import { useState, useContext, useEffect } from "react";
import { ViewerContext } from "./Context";
import axios from "axios";

function ModalApus() {
  const { selectedApus, setApuData, apuData } = useContext(ViewerContext);
  const [selectedSubFamily, setSelectedSubFamily] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("");
  const [familyChanged, setFamilyChanged] = useState(false);
  const [filteredsubfamily, setFilteredSubfamily] = useState("");

  const subFamilies = [
    "INSTALACIÓN DE FAENA",
    "SOCALZADO",
    "GRUA",
    "TOPOGRAFO",
    "ARRIENDO DE MOLDAJE",
    "INSTALACIÓN ELECTRICA",
    "INSTALACIÓN SANITARIA",
    "BOMBA DE HORMIGÓN",
    "ENFIERRADOR",
    "MANO DE OBRA MOLDAJE",
    "PERFILADO EXCAVACIÓN",
    "BASURA",
    "CCDD Y TELECOM",
    "AFINADO DE LOSA",
    "CLIMA",
    "CERRAJERÍA",
    "PISCINA",
    "HOJALATERIA",
    "PINTURA",
    "FAENAS HUMEDAS - ESTUCOS",
    "FAENAS HUMEDAS - YESOS",
    "MUEBLES Y CUBIERTAS",
    "MUEBLES Y CUBIERTAS AACC",
    "MO. PORCELANATO",
    "TABIQUERIA",
    "CARPINTERÍA",
    "ANDAMIOS",
    "ESTRUCTURA DE CUBIERTA",
    "QUIEBRAVISTA",
    "CIERRES EXTERIORES",
    "SEÑALETICA",
    "PISO FOTOLAMINADO",
    "ASCENSORES",
    "VENTANAS",
    "INSTALACION DE ACCESORIOS",
    "IMPERMEABILIZACIÓN",
    "OTROS",
    "ARRIENDOS",
    "AISLACIÓN TERMICA",
    "LUMINARIA",
    "ADHESIVO CERAMICO & PORCELANATO",
    "QUINCALLERIA",
    "PUERTAS",
    "LAVAPLATOS & ACCESORIOS",
    "KIT DE COCINA",
    "CORNISA",
    "GRUPO ELECTROGENO",
    "PAPEL MURAL",
    "PAPEL MURAL SUBCONTRATO",
    "YESO PUENTE ADHERENTE",
    "MORTEROS EN GENERAL",
    "MITIGACION DE RUIDOS",
    "RADIADORES",
    "MAMPARAS",
    "ARIDOS",
    "RETIRO DE ESCOMBROS",
    "SUBCONTRATO_TABIQUERÍA",
    "OBRA GRUESA",
    "MADERAS",
    "MATERIALES PILAS",
    "ARTEFACTOS, TINAS Y RECEPTÁCULOS",
    "ESPEJOS Y ACCESORIOS",
    "GRIFERÍA Y ARTEFACTOS SANITARIOS",
    "VANITORIO & LAVARROPA",
    "PISO FOTOLAMINADO Y OTROS",
    "PORCELANATO Y CERAMICA",
    "HORMIGONES",
    "INSTALACIONES PROVISORIAS",
    "FIERRO Y ALAMBRE",
    "RED PANTALLA ANTICAIDA",
    "ELEMENTOS DE PVC",
    "MATERIALES TERMINACIONES",
    "PERSONAL ADMINISTRATIVO",
    "POST VENTA Y MARCHA BLANCA",
    "HERRAMIENTAS Y OTROS",
    "ELEMENTOS PROTECCION PERSONAL",
    "MAQ. MENOR (COMPRA O ARRIENDO) Y OTROS",
    "MAQUINARIA ARRIENDO",
    "MANO DE OBRA DIRECTA",
    "FLETES",
    "GASTOS DE OBRA",
    "FOTOCOPIAS",
    "GASTOS FINANCIEROS",
    "SEGUROS Y OTROS",
  ].sort();

  const families = [
    "Mano de Obra",
    "Material",
    "Maquinaria",
    "Otros",
    "Subcontrato",
    "gg",
  ].sort();

  const filteredDataSubfamyly = subFamilies.filter((subFamilies) => {
    return subFamilies?.toLowerCase().includes(filteredsubfamily.toLowerCase());
  });

  useEffect(() => {
    // Preseleccionar las opciones si todas las filas seleccionadas comparten la misma subfamilia y familia
    const firstApu = apuData.find((item) => item._id === selectedApus[0]);
    if (firstApu) {
      setSelectedSubFamily(firstApu.subfamily || "");
      setSelectedFamily(firstApu.familia || "");
    }
  }, [selectedApus, apuData]);

  const handleFamilyChange = (e) => {
    setSelectedFamily(e.target.value);
    setFamilyChanged(true); // Marcar que la familia ha sido cambiada por el usuario
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updates = selectedApus.map((apuId) => ({
        id: apuId,
        subFamily: selectedSubFamily || "",
        familia: familyChanged ? selectedFamily : "", // Solo actualizar la familia si fue cambiada
      }));
      console.log("Enviando actualización:", updates);

      const updatePromises = updates.map((update) =>
        axios.patch(`http://localhost:8000/apusdata/${update.id}/`, {
          subfamilia: update.subFamily,
          ...(familyChanged && { familia: update.familia }), // Condicionalmente incluir familia
        })
      );

      await Promise.all(updatePromises);

      setApuData((prevData) =>
        prevData.map((apu) =>
          selectedApus.includes(apu._id)
            ? {
                ...apu,
                subfamily: selectedSubFamily || apu.subfamily,
                familia: familyChanged ? selectedFamily : apu.familia,
              }
            : apu
        )
      );

      alert("Familias y Subfamilias actualizadas exitosamente");
    } catch (error) {
      console.error("Error actualizando familias y subfamilias", error);
      alert("Hubo un error actualizando las familias y subfamilias");
    }
  };

  return (
    <div className="bg-slate-900 p-4 rounded-lg h-full ">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="text-white font-bold">
          <label className="text-sm mb-2">Subfamilias</label>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filtrar por Subfamilia"
              value={filteredsubfamily}
              onChange={(e) => setFilteredSubfamily(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-black"
            />
          </div>
          <div className="overflow-y-auto max-h-40 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {filteredDataSubfamyly.map((subFamily) => (
              <div key={subFamily} className="flex items-center">
                <input
                  type="radio"
                  id={`subfamily-${subFamily}`}
                  name="subFamily"
                  value={subFamily}
                  checked={selectedSubFamily === subFamily}
                  onChange={(e) => setSelectedSubFamily(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={`subfamily-${subFamily}`} className="text-xs">
                  {subFamily}
                </label>
              </div>
            ))}
          </div>

          <label className="text-sm mt-4">Familias</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
            {families.map((family) => (
              <div key={family} className="flex items-center">
                <input
                  type="radio"
                  id={`family-${family}`}
                  name="family"
                  value={family}
                  checked={selectedFamily === family}
                  onChange={handleFamilyChange}
                  className="mr-2"
                />
                <label htmlFor={`family-${family}`} className="text-xs">
                  {family}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            className="bg-green-500 font-semibold text-xs rounded-lg text-white p-3 w-full sm:w-auto"
            type="submit"
          >
            Submit Tasks
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalApus;
