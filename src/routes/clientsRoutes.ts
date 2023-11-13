import { Router } from "express";
import {
    register,
    login,
    account,
    allClients,
    modifyClientByTokenId,
    removeClientById, getProducts
} from "../controllers/clientsController";
import { authUser } from "../middlewares/authUser";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/account', authUser, account)
router.put('/account/modifyAccount', authUser, modifyClientByTokenId)
router.get('/clients', authUser, authSuperAdmin, allClients)
router.delete('/delete', authUser, authSuperAdmin, removeClientById)
router.get('/products', getProducts)


export { router }