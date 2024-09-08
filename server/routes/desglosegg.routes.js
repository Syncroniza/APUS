import { getAllDesglosegg, getOneDesglosegg, createDesglosegg, deleteDesglosegg, editDesglosegg } from "../controller/desglosegg.controller.js";

const desgloseggRoutes = (app) => {
    app.get("/desglosegg/", getAllDesglosegg);  // Observar la barra inclinada al final
    app.get("/desglosegg/:id/", getOneDesglosegg);  // Observar la barra inclinada al final
    app.post("/desglosegg/", createDesglosegg);
    app.delete("/desglosegg/:id/", deleteDesglosegg);
    app.patch("/desglosegg/:id/", editDesglosegg);
};

export default desgloseggRoutes;
