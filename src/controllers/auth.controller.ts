import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function register(req: Request, res: Response) {
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Registra un usuario'
     #swagger.parameters['body'] = {
       in: 'body',
       schema: { email: 'recepcion@clinica.com', password: '123456', role: 'RECEPTIONIST' }
     } */
  try {
    const { password, role } = req.body;
    const email = req.body.email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role },
      select: { id: true, email: true, role: true },
    });

    res.status(201).json(user);
  } catch {
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
}

export async function login(req: Request, res: Response) {
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Inicia sesión y devuelve un token'
     #swagger.parameters['body'] = {
       in: 'body',
       schema: { email: 'recepcion@clinica.com', password: '123456' }
     } */
  try {
    const { password } = req.body;
    const email = req.body.email.trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" },
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}
