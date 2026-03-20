import prisma from "../lib/prisma";

interface CreateOrderParams {
  customerId: number;
  restaurantId: number;
  items: {
    menuId: number;
    quantity: number;
    price: number;
  }[];
}

// ✅ Crear orden
export async function createOrder({
  customerId,
  restaurantId,
  items,
}: CreateOrderParams) {
  if (!customerId || !restaurantId || !items || items.length === 0) {
    throw new Error("Datos incompletos para crear la orden");
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      customerId,
      restaurantId,
      total,
      status: "PENDING",
      items: {
        create: items.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: true,
    },
  });

  return order;
}

// ✅ Obtener todas las órdenes
export async function getOrders() {
  return await prisma.order.findMany({
    include: {
      items: true,
      payment: true,
    },
  });
}

// ✅ Actualizar estado
export async function updateOrderStatus(
  orderId: number,
  status: string
) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}
