import { Router } from "express";
import { register, login, account, allRegister, create, modify, update, delete, consult } from "../controllers/clientsController";
import { authUser } from "../middlewares/authUser";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";


const router = Router()
router.post('/register', register)
router.post('/login', login)
router.get('/account', authUser, account)
router.put('/account/modifyAccount', authUser, modify)
router.post('/account/createAppointment', authUser, create)
router.put('/account/updateAppointment', authUser, update)
router.delete('/account/deleteAppointment', authUser, delete)
router.get('/account/consultAppointment', authUser, consult)
router.get('/db/allRegister', authUser, authSuperAdmin, allRegister)


export { router }