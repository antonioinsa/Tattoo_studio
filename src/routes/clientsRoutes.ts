import { Router } from "express";
import { register, login, account, allClients, modifyClientByTokenId } from "../controllers/clientsController";
import { authUser } from "../middlewares/authUser";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";


const router = Router()
//router.get('/', getClients)
//router.post('/', createClient)
router.post('/register', register)
router.post('/login', login)
router.get('/account', authUser, account)
router.put('/account/modifyAccount', authUser, modifyClientByTokenId)
//router.post('/account/createAppointment', authUser, create)
//router.put('/account/updateAppointment', authUser, update)
//router.delete('/account/deleteAppointment', authUser, remove)
//router.get('/account/consultAppointment', authUser, consult)
router.get('/db/clients', authUser, authSuperAdmin, allClients)


export { router }