import {
  getAllProyeccionmo,
  getOneProyeccionmo,
  createProyeccionmo,
  deleteProyeccionmo,
  editProyeccionmo,
} from "../controller/proyeccionmo_controller.js";

const proyeccionmoRoutes = (app) => {
  app.get("/proyeccionmo/", getAllProyeccionmo); // Elimina la barra inclinada final para consistencia
  app.get("/proyeccionmo/:id", getOneProyeccionmo);
  app.post("/proyeccionmo/", createProyeccionmo);
  app.delete("/proyeccionmo/:id", deleteProyeccionmo);
  app.patch("/proyeccionmo/:id", editProyeccionmo);

  // Manejo de rutas no definidas
  app.all('*', (req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
  });
};

export default proyeccionmoRoutes;
