import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface AuthParams {
  action: "register" | "login";
  email: string;
  password: string;
  name?: string;
}

export async function handleAuth({ action, email, password, name }: AuthParams) {
  if (!action || !email || !password) {
    throw new Error("Faltan campos obligatorios");
  }

  // 🔹 REGISTRO
  if (action === "register") {
    const existing = await prisma.customer.findUnique({
      where: { email },
    });

    if (existing) {
      throw new Error("El email ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await prisma.customer.create({
      data: {
        name: name || "Usuario",
        email,
        password: hashedPassword,
        phone: "",
        address: "",
      },
    });

    return {
      message: "Registro exitoso",
      customer,
    };
  }

  // 🔹 LOGIN
  if (action === "login") {
    const customer = await prisma.customer.findUnique({
      where: { email },
    });

    if (!customer) {
      throw new Error("Cliente no encontrado");
    }

    const valid = await bcrypt.compare(password, customer.password);

    if (!valid) {
      throw new Error("Credenciales inválidas");
    }

    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      message: "Login exitoso",
      token,
      customer,
    };
  }

  throw new Error("Acción inválida");
}
