import jwt from "jsonwebtoken";
import type { NextApiRequest } from "next";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export interface AuthUser {
  id: number;
  email: string;
}

// 🔹 Generar token (por si lo necesitas en otros lados)
export function generateToken(user: AuthUser) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

// 🔹 Verificar token
export function verifyToken(token: string): AuthUser {
  return jwt.verify(token, JWT_SECRET) as AuthUser;
}

// 🔹 Obtener usuario desde request
export function getUserFromRequest(req: NextApiRequest): AuthUser | null {
  const authHeader = req.headers.authorization;

  if (!authHeader) return null;

  const token = authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return null;

  try {
    return verifyToken(token);
  } catch (error) {
    return null;
  }
}
