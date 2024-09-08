import { Types, Error } from "mongoose";
const { ObjectId } = Types;
import { ApuModel } from "../models/apusdata.model.js";

export function getAllApus(req, res) {
  ApuModel.find({})
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function getOneApus(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res
      .status(400)
      .json({ message: "id doesn't match the expected format" });
  ApuModel.findOne({ _id: id })
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function createApus(req, res) {
  let data = req.body;
  console.log(data);
  ApuModel.create(data)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((error) => {
      // error de validacion de mongoose
      if (error instanceof Error.ValidatorError) {
        let keys = Object.keys(error.errors);
        let error_dict = {};
        keys.map((key) => {
          error_dict[key] = error.errors[key].message;
        });
        res.status(500).json({ error: error_dict });
      } else {
        res.status(500).json({ error: error });
      }
    });
}
export function deleteApus(req, res) {
  let id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(400).json({ message: "Id  do not match" });
  ApuModel.deleteOne({ _id: id })
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
}
export function editApus(req, res) {
  console.log("Received update request for task ID:", req.params.id); // Log the task ID
  console.log("Request body:", req.body);

  let id = req.params.id;
  let data = req.body;

  const updateOptions = {
    new: true, // Devuelve el documento actualizado
    runValidators: true, // Ejecuta las validaciones al actualizar
  };

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Id do not match" });
  }

  // Asegúrate de que los campos 'subfamily' y 'familia' son correctos en tu base de datos
  ApuModel.findByIdAndUpdate(
    id,
    { subfamily: data.subfamilia, familia: data.familia },
    updateOptions
  )
    .then((updatedDocument) => {
      if (!updatedDocument) {
        return res.status(404).json({ message: "APU not found" });
      }
      res.json({ success: true, apu: updatedDocument });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        let keys = Object.keys(error.errors);
        let error_dict = {};
        keys.forEach((key) => {
          error_dict[key] = error.errors[key].message;
        });
        res.status(400).json({ error: error_dict });
      } else {
        res.status(500).json({ error: error.message || error });
      }
    });
}
