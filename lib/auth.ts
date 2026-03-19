import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

/**
 * Verifica el token JWT
 */
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Token inválido");
  }
}

/**
 * Middleware para proteger rutas
 */
export function requireAuth(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: "No autorizado" });
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Token requerido" });
      }

      const user = verifyToken(token);

      // agregamos el usuario a la request
      (req as any).user = user;

      return handler(req, res);
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({ error: "Token inválido" });
    }
  };
}

/**
 * Obtener usuario directamente (opcional)
 */
export function getUserFromRequest(req: NextApiRequest) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("No autorizado");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Token requerido");
  }

  return verifyToken(token);
    }
