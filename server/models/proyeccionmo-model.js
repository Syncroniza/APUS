import mongoose from "mongoose";

// Esquema para definir un mes dentro de una proyección
const MesSchema = new mongoose.Schema({
  mes: {
    type: Number, // El número del mes (1, 2, 3, etc.)
    required: true
  },
  cantidadPersonal: {
    type: Number,
    required: true,
    default: 0
  }
});

// Esquema para definir una proyección de una especialidad
const ProyeccionSchema = new mongoose.Schema({
  especialidad: {
    type: String,
    required: true
  },
  sueldo: {
    type: Number,
    required: true
  },
  meses: [MesSchema], // Array de meses, cada uno con su número y cantidad de personal
  totalCosto: {
    type: Number,
    required: true,
    default: 0
  }
});

// Esquema principal que contiene un array de proyecciones
const ProyeccionmoMainSchema = new mongoose.Schema({
  proyecciones: [ProyeccionSchema] // Este documento solo contiene un array de múltiples proyecciones
});

// Exportar el modelo
export const ProyeccionmoModel = mongoose.model("Proyeccionmo", ProyeccionmoMainSchema);
