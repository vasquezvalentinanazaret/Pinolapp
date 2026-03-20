import prisma from "../lib/prisma";

// 💰 Obtener métricas de ingresos
export async function getEarnings() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        payment: true,
      },
    });

    // 💵 Total generado
    const totalRevenue = orders.reduce(
      (sum: number, o: any) => sum + (o.payment?.amount || 0),
      0
    );

    // 📦 Total órdenes
    const totalOrders = orders.length;

    return {
      totalRevenue,
      totalOrders,
    };
  } catch (error) {
    console.error("Error en earnings:", error);
    throw new Error("Error obteniendo ingresos");
  }
}
