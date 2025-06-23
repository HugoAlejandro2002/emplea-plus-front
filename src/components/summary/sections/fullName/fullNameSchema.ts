import { z } from "zod";

export const fullNameSchema = z.string().min(1, "Nombre requerido");
