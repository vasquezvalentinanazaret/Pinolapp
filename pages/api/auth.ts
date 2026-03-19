import type { NextApiRequest, NextApiResponse } from "next";
import { login, register } from "../../services/authService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const { action, email, password, name } = req.body;

    if (!action || !email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    if (action === "register") {
      const customer = await register({ email, password, name });
      return res.status(201).json({ message: "Registro exitoso", customer });
    }

    if (action === "login") {
      const data = await login({ email, password });
      return res.status(200).json({ message: "Login exitoso", ...data });
    }

    return res.status(400).json({ error: "Acción inválida" });
  } catch (error: any) {
    console.error("Error en /api/auth:", error);
    return res.status(500).json({ error: error.message || "Error en autenticación" });
  }
}
