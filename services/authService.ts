import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function registerUser({ email, password, name }: any) {
  const existing = await prisma.customer.findUnique({ where: { email } });

  if (existing) {
    throw new Error("EMAIL_EXISTS");
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

  return customer;
}

export async function loginUser({ email, password }: any) {
  const customer = await prisma.customer.findUnique({ where: { email } });

  if (!customer) {
    throw new Error("USER_NOT_FOUND");
  }

  const valid = await bcrypt.compare(password, customer.password);

  if (!valid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { id: customer.id, email: customer.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, customer };
}
