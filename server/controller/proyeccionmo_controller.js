import { Types, Error } from "mongoose";
const { ObjectId } = Types;
import { ProyeccionmoModel } from "../models/proyeccionmo-model.js";

// Obtener todas las proyecciones
export async function getAllProyeccionmo(req, res) {
  try {
    const data = await ProyeccionmoModel.find({});
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
}

// Obtener una proyección por ID
export async function getOneProyeccionmo(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "El ID no coincide con el formato esperado" });
  }
  try {
    const data = await ProyeccionmoModel.findOne({ _id: id });
    if (!data) {
      return res.status(404).json({ message: "Proyección no encontrada" });
    }
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
}

// Crear una nueva proyección
export async function createProyeccionmo(req, res) {
  try {
    const proyecciones = req.body.proyecciones;
    
    if (!proyecciones || !Array.isArray(proyecciones)) {
      return res.status(400).json({ message: "Datos inválidos en la solicitud" });
    }

    const createdProyecciones = await ProyeccionmoModel.insertMany(proyecciones);
    res.json({ data: createdProyecciones });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errorDict = Object.keys(error.errors).reduce((acc, key) => {
        acc[key] = error.errors[key].message;
        return acc;
      }, {});
      res.status(400).json({ error: errorDict });
    } else {
      res.status(500).json({ error: error.message || error });
    }
  }
}

// Eliminar una proyección por ID
export async function deleteProyeccionmo(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "El ID no coincide con el formato esperado" });
  }
  try {
    const result = await ProyeccionmoModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Proyección no encontrada" });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
}
async function migrateProyecciones() {
  const documents = await ProyeccionmoModel.find();

  documents.forEach(async (doc) => {
    // Si el documento tiene campos de especialidad fuera de 'proyecciones', muévelos dentro de 'proyecciones'
    if (doc.especialidad) {
      doc.proyecciones.push({
        especialidad: doc.especialidad,
        sueldo: doc.sueldo,
        meses: doc.meses,
        totalCosto: doc.totalCosto
      });

      // Eliminar los campos individuales del documento raíz
      doc.especialidad = undefined;
      doc.sueldo = undefined;
      doc.meses = undefined;
      doc.totalCosto = undefined;

      await doc.save();
    }
  });

  console.log("Migración completada");
}

// Llama a la función de migración
migrateProyecciones().catch(console.error);

// Editar una proyección por ID
// Editar una proyección por ID
// Editar una proyección por ID
export async function editProyeccionmo(req, res) {
  console.log("Received update request for task ID:", req.params.id);
  console.log("Request body:", req.body);
  const updatedProyecciones = req.body.proyecciones;

  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "El ID no coincide con el formato esperado" });
  }

  try {
    // Busca el documento existente
    const updatedDocument = await ProyeccionmoModel.findById(id);

    if (!updatedDocument) {
      return res.status(404).json({ message: "Proyección no encontrada" });
    }

    console.log("Documento antes de actualizar las proyecciones:", updatedDocument);

    // Limpiar campos redundantes en el documento
    updatedDocument.especialidad = undefined;
    updatedDocument.sueldo = undefined;
    updatedDocument.meses = undefined;
    updatedDocument.totalCosto = undefined;

    // Actualizar las proyecciones
    updatedProyecciones.forEach((newProyeccion) => {
      const existingProyeccion = updatedDocument.proyecciones.find(
        (proyeccion) => proyeccion.especialidad === newProyeccion.especialidad
      );

      if (existingProyeccion) {
        existingProyeccion.sueldo = newProyeccion.sueldo;
        existingProyeccion.meses = newProyeccion.meses;
        existingProyeccion.totalCosto = newProyeccion.totalCosto;
        console.log(`Actualizando especialidad: ${existingProyeccion.especialidad}`);
      } else {
        updatedDocument.proyecciones.push(newProyeccion);
        console.log(`Añadiendo nueva especialidad: ${newProyeccion.especialidad}`);
      }
    });

    console.log("Documento después de actualizar las proyecciones, antes de guardar:", updatedDocument);

    // Guardar el documento actualizado
    await updatedDocument.save();

    res.json({ success: true, proyeccion: updatedDocument });
  } catch (error) {
    console.error("Error al actualizar la proyección:", error);
    res.status(500).json({ error: error.message || error });
  }
}

