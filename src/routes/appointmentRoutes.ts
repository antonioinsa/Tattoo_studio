import { Router } from "express";
import { createAppointment, updateAppointmentById, deleteAppointmentById, workerUpdateAppointmentById } from "../controllers/appointmentController";
import { authUser } from "../middlewares/authUser";

const router = Router()
router.post('/create', createAppointment)
router.put('/update', authUser, updateAppointmentById)
router.delete('/delete', authUser, deleteAppointmentById)
router.put('/workerupdate', authUser, workerUpdateAppointmentById)

export { router }