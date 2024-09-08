import mongoose from "mongoose";

const DesgloseGGSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },
    descripcion: {
      type: String,
    },
    detalle: {
      type: String,
    },
    total: {
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

export const desgloseGGModel = mongoose.model("desglosegg", DesgloseGGSchema);
