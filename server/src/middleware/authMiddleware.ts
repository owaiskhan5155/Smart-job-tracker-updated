import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { getJwtSecret } from "../config/env";

interface TokenPayload extends JwtPayload {
  id: string;
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer")) {
    res.status(401).json({
      message: "No token provided",
    });
    return;
  }

  try {
    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, getJwtSecret()) as TokenPayload;

    req.user = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};
