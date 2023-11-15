import { Router } from "express";
import { authUser } from "../middlewares/authUser";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";
import {
    getWorkers,
    workersFiles,
    login,
    register,
    updateWorkerById,
    deleteWorkerById,
    changeRoleBySuperAdmin
} from "../controllers/workersController";

const router = Router()
router.post('/login', login)
router.get('/current', getWorkers)
router.get('/', authUser, authSuperAdmin, workersFiles)
router.post('/register', authUser, authSuperAdmin, register)
router.put('/update', authUser, authSuperAdmin, updateWorkerById)
router.delete('/delete', authUser, authSuperAdmin, deleteWorkerById)
router.put('/changeRole', authUser, authSuperAdmin, changeRoleBySuperAdmin)

export { router }