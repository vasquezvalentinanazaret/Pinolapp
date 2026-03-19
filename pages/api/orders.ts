import type { NextApiRequest, NextApiResponse } from "next";
import { getOrders, createOrder } from "../../services/orderService";
import { requireAuth } from "../../middleware/authMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = requireAuth(req, res);
    if (!user) return;

    // 🔹 GET (listar órdenes)
    if (req.method === "GET") {
      const orders = await getOrders(req.query);
      return res.status(200).json(orders);
    }

    // 🔹 POST (crear orden)
    if (req.method === "POST") {
      const { restaurantId, items } = req.body;

      const order = await createOrder({
        customerId: user.id, // 🔥 viene del token
        restaurantId,
        items,
      });

      return res.status(201).json(order);
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (error: any) {
    console.error("Error en /api/orders:", error);

    return res.status(400).json({
      error: error.message || "Error al procesar orden",
    });
  }
}
