import React from "react";
import DesgloseGG from "../components/DesgloseGG";
import Sidebardb from "../components/SideBar";
function GastosGenerales() {
  return (
    <div className="flex">
      <Sidebardb />
      <DesgloseGG />
    </div>
  );
}

export default GastosGenerales;
