import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { authAdmin } from "../middlewares/authAdmin";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";
import { getWorkers, login, register } from "../controllers/workersController";

const router = Router()
router.get('/', getWorkers)
router.post('/login', login)
router.post('/register', register)
//router.put('/update', authUser, authAdmin, authSuperAdmin, updateWorkerById)
//router.delete('/delete', authUser, authAdmin, authSuperAdmin, deleteWorkerById)
//router.get('/consultAnAppointment', authUser, consult)


export { router }