import { Router } from "express";
import {
    createAppointment,
    updateAppointmentById,
    deleteAppointmentById,
    workerUpdateAppointmentById,
    clientAppointments,
    tattooArtistAppointments
} from "../controllers/appointmentController";
import { authUser } from "../middlewares/authUser";
import { authAdmin } from "../middlewares/authAdmin";

const router = Router()
router.post('/create', authUser, createAppointment)
router.put('/update', authUser, updateAppointmentById)
router.delete('/delete', authUser, deleteAppointmentById)
router.put('/workerupdate', authUser, workerUpdateAppointmentById)
router.get('/clientAppointment', authUser, clientAppointments)
router.get('/tattooArtistAppointment', authUser, authAdmin, tattooArtistAppointments)

export { router }