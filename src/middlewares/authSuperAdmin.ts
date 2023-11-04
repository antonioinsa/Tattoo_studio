import { NextFunction, Request, Response } from "express";

const authSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.token.role !== "superAdmin") {
            return res.status(401).json({
                success: true,
                message: "Access denied"
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}

export { authSuperAdmin }