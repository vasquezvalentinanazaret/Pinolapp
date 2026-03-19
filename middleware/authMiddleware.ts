import type { NextApiRequest, NextApiResponse } from "next";
import { getUserFromRequest } from "../lib/auth";

export function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getUserFromRequest(req);

  if (!user) {
    res.status(401).json({ error: "No autorizado" });
    return null;
  }

  return user;
}
