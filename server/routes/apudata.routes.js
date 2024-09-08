import { getAllApus, getOneApus, createApus, deleteApus, editApus } from "../controller/apudata.controller.js";

const apusRoutes = (app) => {
    app.get("/apusdata/", getAllApus);
    app.get("/apusdata/:id/", getOneApus);
    app.post("/apusdata/", createApus);
    app.delete("/apusdata/:id/", deleteApus);
    app.patch("/apusdata/:id/", editApus);
};

export default apusRoutes;
