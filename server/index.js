import express from "express";
import cors from "cors";
import mongoConnect from "./config/mongo.config.js";
import "dotenv/config";
import apusRoutes from "../server/routes/apudata.routes.js";
import proyeccionmoRoutes from "./routes/proyeccionmo.routes.js";
import desgloseggRoutes from "./routes/desglosegg.routes.js";

const app = express();

// app.use("/uploads", express.static("server/uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        const message =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

// Conexión a MongoDB
const PORT = process.env.PORT || 8000;

apusRoutes(app);
desgloseggRoutes(app)
proyeccionmoRoutes(app);

app.get("/health", (req, res) => {
  res.send("OK");
  res.status(200);
});

mongoConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
