import { NextFunction, Request, Response } from "express";

const authAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.token.role !== "admin") {
        return res.status(401).json
            ({
                success: false,
                message: "Access denied"
            })
    }
    next()
}

export { authAdmin }