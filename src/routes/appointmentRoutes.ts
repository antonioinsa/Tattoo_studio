import { Router } from "express";
//import { create, update, remove, consult, allClients } from "../controllers/appointmentController";
import { authUser } from "../middlewares/authUser";
import { authSuperAdmin } from "../middlewares/authSuperAdmin";


const router = Router()
//router.post('/account/createAppointment', authUser, create)
//router.put('/account/updateAppointment', authUser, update)
//router.delete('/account/deleteAppointment', authUser, remove)
//router.get('/account/consultAppointment', authUser, consult)
//router.get('/db/clients', authUser, authSuperAdmin, allClients)


export { router }