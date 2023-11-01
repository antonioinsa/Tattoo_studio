import { Router } from "express";
import { register, login, account, allClients, modifyClientByTokenId, removeClientById, roleClientsById } from "../controllers/clientsController";
import { authUser } from "../middlewares/authUser";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";


const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/account', authUser, account)
router.put('/account/modifyAccount', authUser, modifyClientByTokenId)
router.get('/db/clients', authSuperAdmin, allClients)
router.delete('/db/removeClient', authSuperAdmin, removeClientById)
router.put('/db/roleClients', authSuperAdmin, roleClientsById)


export { router }