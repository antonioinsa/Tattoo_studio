import { NextFunction, Request, Response } from "express";

const authSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.token.role !== "superAdmin") {
        return res.status(401).json
            ({
                success: false,
                message: "Access denied"
            })
    }
    next()
}

export { authSuperAdmin }