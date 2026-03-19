import prisma from "../lib/prisma";

export async function getOrders({ customerId, restaurantId }) {
  if (!customerId && !restaurantId) {
    return prisma.order.findMany({
      orderBy: { id: "desc" },
      include: {
        customer: true,
        restaurant: true,
        payments: true,
        notifications: true,
      },
    });
  }

  if (customerId) {
    return prisma.order.findMany({
      where: { customerId: Number(customerId) },
      orderBy: { id: "desc" },
      include: {
        restaurant: true,
        payments: true,
        notifications: true,
      },
    });
  }

  if (restaurantId) {
    return prisma.order.findMany({
      where: { restaurantId: Number(restaurantId) },
      orderBy: { id: "desc" },
      include: {
        customer: true,
        payments: true,
        notifications: true,
      },
    });
  }
}
