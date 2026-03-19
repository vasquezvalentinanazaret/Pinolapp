// services/orderService.ts

import prisma from "@/lib/prisma";

export async function getOrders(filters?: {
  customerId?: number;
  restaurantId?: number;
}) {
  if (!filters?.customerId && !filters?.restaurantId) {
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

  if (filters.customerId) {
    return prisma.order.findMany({
      where: { customerId: filters.customerId },
      orderBy: { id: "desc" },
      include: {
        restaurant: true,
        payments: true,
        notifications: true,
      },
    });
  }

  if (filters.restaurantId) {
    return prisma.order.findMany({
      where: { restaurantId: filters.restaurantId },
      orderBy: { id: "desc" },
      include: {
        customer: true,
        payments: true,
        notifications: true,
      },
    });
  }
}
