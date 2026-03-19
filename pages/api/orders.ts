import { getOrders } from "../../services/orderService";

export default async function handler(req, res) {
  try {
    const { customerId, restaurantId } = req.query;

    const orders = await getOrders({ customerId, restaurantId });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Error" });
  }
}
