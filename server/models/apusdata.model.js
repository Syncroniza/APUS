import mongoose from "mongoose";

const ApuSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },
    cod_padre: {
      type: String,
    },
    nombre_recurso: {
      type: String,
    },
    cod_partida: {
      type: String,
    },
    cod_subpartida: {
      type: String,
    },
    nombre_partida: {
      type: String,
    },
    cod_insumo: {
      type: String,
    },
    familia: {
      type: String,
    },
    subfamily: {
      type: String,
    },
    unidad_insumo: {
      type: String,
    },
    total_insumo: {
      type: Number,
    },
    aliases: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ApuModel = mongoose.model("apusdatafile", ApuSchema);
