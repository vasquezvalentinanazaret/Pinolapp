import type { NextApiRequest, NextApiResponse } from "next";
import { getOrders } from "../../services/orderService";
import { requireAuth } from "../../lib/auth";

async function handler(req: any, res: NextApiResponse) {
  try {
    const user = req.user;

    const orders = await getOrders({
      customerId: user.id,
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener órdenes" });
  }
}

export default requireAuth(handler);
