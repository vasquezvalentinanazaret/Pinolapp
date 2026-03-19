import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    throw new Error("Token inválido");
  }
}

export function requireAuth(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: "No autorizado" });
      }

      const token = authHeader.split(" ")[1];
      const user = verifyToken(token);

      (req as any).user = user;

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Token inválido" });
    }
  };
}

export function requireRole(role: string) {
  return (handler: any) => {
    return async (req: any, res: any) => {
      try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
          return res.status(401).json({ error: "No autorizado" });
        }

        const token = authHeader.split(" ")[1];
        const user = verifyToken(token);

        if (user.role !== role) {
          return res.status(403).json({ error: "Sin permisos" });
        }

        req.user = user;

        return handler(req, res);
      } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
      }
    };
  };
}
