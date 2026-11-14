import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const dailyCutoffSchema = z.object({
  date: z.string().date(),
});

export const validateDailyCutoff = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = dailyCutoffSchema.safeParse(req.query);

  if (!result.success) {
    res
      .status(400)
      .json({ error: "La fecha debe tener un formato YYYY-MM-DD" });
    return;
  }
  next();
};
