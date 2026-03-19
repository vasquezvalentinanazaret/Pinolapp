import prisma from "../lib/prisma";

interface GetOrdersParams {
  customerId?: string | number;
  restaurantId?: string | number;
}

export async function getOrders({ customerId, restaurantId }: GetOrdersParams) {
  const where: any = {};

  if (customerId) {
    where.customerId = Number(customerId);
  }

  if (restaurantId) {
    where.restaurantId = Number(restaurantId);
  }

  return prisma.order.findMany({
    where,
    orderBy: { id: "desc" },
    include: {
      customer: true,
      restaurant: true,
      payments: true,
      notifications: true,
    },
  });
}
