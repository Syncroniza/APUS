import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MasterApusData from "./pages/MasterApusData";
import ViewerProvider from "./components/Context";
import DisponibleHojasControl from "./pages/DisponibleHojasControl";
import DisponibleFamilias from "./pages/DisponibleFamilias";
import DesgloseManoObra from "./pages/DesgloseManoObra";
import GastosGenerales from "./pages/GastosGenerales";
function App() {
  return (
    <BrowserRouter>
      <ViewerProvider>
        <h1 className="text-3xl font-bold underline bg-black text-white p-4 shadow-xl">
          APUs!
        </h1>
        <Routes>
          <Route path="/" element={<MasterApusData />} />
          <Route path="/familias" element={<DisponibleFamilias />} />
          <Route path="/subfamilias" element={<DisponibleHojasControl />} />
          <Route path="/desglosemo" element={<DesgloseManoObra />} />
          <Route path="/gg" element={<GastosGenerales />} />
        </Routes>
      </ViewerProvider>
    </BrowserRouter>
  );
}

export default App;
