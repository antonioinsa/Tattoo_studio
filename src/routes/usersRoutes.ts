import { Router } from "express";
import { register, login, acount, allRegister } from "../controllers/usersController";
import { authUser } from "../middlewares/authUser";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";

const router = Router()
router.post('/register', register)
router.post('/login', login)
router.get('/acount', authUser, acount)
router.get('/db/allRegister', authUser, authSuperAdmin, allRegister)


export { router }