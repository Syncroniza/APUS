import { useContext } from "react";
import { ViewerContext } from "../components/Context";
import Sidebardb from "../components/SideBar";
import ProjeccionManoObra from "../components/ProjeccionManoObra";
import ManoObraDisponible from "../components/ManoObraDisponible";
import ComparacionProyeccionUso from "../components/ComparacionProyeccionUso";
import DesglosePorEspecialidad from "../components/DesglosePorEspecialidad";

function DesgloseManoObra() {
  return (
    <div className="flex">
      <Sidebardb />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">
          Desglose de Mano de Obra
        </h1>
        <ComparacionProyeccionUso />
        <ProjeccionManoObra />
        <ManoObraDisponible />
      </div>
    </div>
  );
}

export default DesgloseManoObra;
