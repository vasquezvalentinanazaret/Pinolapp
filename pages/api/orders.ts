import type { NextApiRequest, NextApiResponse } from "next";
import { handleAuth } from "../../services/authService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const result = await handleAuth(req.body);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Error en /api/auth:", error);

    return res.status(400).json({
      error: error.message || "Error en autenticación",
    });
  }
}
