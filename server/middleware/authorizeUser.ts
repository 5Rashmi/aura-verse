import { Request, Response, NextFunction } from "express";

export const authorizeUser = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || typeof req.user !== "object" || !("id" in req.user)) {
        res.status(403).json({error: "Invalid or missing token payload"});
        return;
    }
    next();
}