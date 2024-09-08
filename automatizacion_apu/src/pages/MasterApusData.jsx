import React from "react";
import TablaAPUs from "../components/TablaAPUs";
import Sidebardb from "../components/SideBar";
function MasterApusData() {
  return (
    <div className="flex">
      <Sidebardb />
      <TablaAPUs />
    </div>
  );
}

export default MasterApusData;
