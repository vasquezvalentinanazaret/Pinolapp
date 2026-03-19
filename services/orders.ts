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

                    export async function createOrder({
                      customerId,
                        restaurantId,
                          items,
                          }: CreateOrderParams) {
                            if (!customerId || !restaurantId || !items || items.length === 0) {
                                throw new Error("Datos incompletos para crear la orden");
                                  }

                                    // 🔹 calcular total
                                      const total = items.reduce(
                                          (sum, item) => sum + item.price * item.quantity,
                                              0
                                                );

                                                  // 🔹 crear orden
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
                                                                                                                                                              restaurant: true,
                                                                                                                                                                  },
                                                                                                                                                                    });

                                                                                                                                                                      return order;
                                                                                                                                                                      }