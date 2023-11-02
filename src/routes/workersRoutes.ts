import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { authAdmin } from "../middlewares/authAdmin";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";
import { getWorkers, login, register, updateWorkerById, deleteWorkerById, changeRoleBySuperAdmin } from "../controllers/workersController";

const router = Router()
router.get('/', getWorkers)
router.post('/login', login)
router.post('/register',authUser, authAdmin, authSuperAdmin, register)
router.put('/update', authUser, authAdmin, authSuperAdmin, updateWorkerById)
router.delete('/delete', authUser, authAdmin, authSuperAdmin, deleteWorkerById)
//router.get('/consultAnAppointment', authUser, consult)
router.put('/changeRole', authUser, authSuperAdmin, changeRoleBySuperAdmin)


export { router }