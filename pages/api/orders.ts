import type { NextApiRequest, NextApiResponse } from "next";
import { getOrders } from "../../services/orderService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const { customerId, restaurantId } = req.query;

    const orders = await getOrders({ customerId, restaurantId });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error en /api/orders:", error);
    return res.status(500).json({ error: "Error al obtener órdenes" });
  }
}
