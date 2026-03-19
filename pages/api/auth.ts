import type { NextApiRequest, NextApiResponse } from "next";
import { loginUser, registerUser } from "@/services/authService";

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
      const user = await registerUser({ email, password, name });
      return res.status(201).json({ message: "Registro exitoso", user });
    }

    if (action === "login") {
      const result = await loginUser({ email, password });
      return res.status(200).json({ message: "Login exitoso", ...result });
    }

    return res.status(400).json({ error: "Acción inválida" });

  } catch (error: any) {
    console.error("Error en /api/auth:", error);

    // Manejo de errores limpio
    if (error.message === "EMAIL_EXISTS") {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    return res.status(500).json({ error: "Error en autenticación" });
  }
}
