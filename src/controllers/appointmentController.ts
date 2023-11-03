import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";

const createAppointment = async (req: Request, res: Response) => {
    try {

        if (req.token.id === req.body.client) {
            const { intervention_type, day, hour, article, description } = req.body

            const newAppointment = await Appointment.create({
                intervention_type: intervention_type,
                day: day,
                hour: hour,
                article: article,
                description: description,
            }).save()

            return res.status(200).json
                (
                    {
                        success: true,
                        message: "Appointment created succesfully",
                        appointment: newAppointment
                    }
                )
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Appointment cant be created",
            error: error
        })
    }
}

const updateAppointmentById = async (req: Request, res: Response) => {
    try {
        const { intervention_type, day, hour, article, description } = req.body

        if (req.token.id === req.body.client_id) {
            const appointmentToUpdate = req.body.id

            await Appointment.update(
                { id: parseInt(appointmentToUpdate) },
                {

                    intervention_type: intervention_type,
                    day: day,
                    hour: hour,
                    article: article,
                    description: description,
                }
            )

            const updatedAppointment = await Appointment.findOneBy
                (
                    { id: parseInt(appointmentToUpdate) }
                )

                return res.status(200).json
                (
                    {
                        success: true,
                        message: "Appointment updated succesfully",
                        appointment: updatedAppointment
                    }
                )
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Appointment cant be updated",
            error: error
        })
    }
}

const deleteAppointmentById = async (req: Request, res: Response) => {
    try {
        if (req.token.id === req.body.client_id) {
            const appointmentToDelete = req.body.id
            const appointmentToRemove = await Appointment.findOneBy
                (
                    { id: parseInt(appointmentToDelete) }
                )
            if (!appointmentToRemove) {
                return res.status(404).json
                    (
                        {
                            success: false,
                            message: (`Appointment ID ${appointmentToDelete} not found`)
                        }
                    )
            }
            const appointmentRemoved = await Appointment.remove(appointmentToRemove as Appointment);
            return res.status(200).json
                (
                    {
                        success: true,
                        message: (`Appointment ID ${appointmentToDelete} has been deleted`),
                        data: appointmentRemoved
                    }
                )
        }
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Appointment could not be deleted",
                    error: error
                }
            )
    }
}

const workerUpdateAppointmentById = async (req: Request, res: Response) => {
    try {
        const price = req.body.id

        if (req.token.id === req.body.tattoo_artist_id) {
            const appointmentToUpdate = req.body.id

            await Appointment.update(
                { id: parseInt(appointmentToUpdate) },
                {

                   price: price
                }
            )

            const updatedAppointment = await Appointment.findOneBy
                (
                    { id: parseInt(appointmentToUpdate) }
                )

            return res.status(200).json
                (
                    {
                        success: true,
                        message: "Price updated succesfully",
                        appointment: updatedAppointment
                    }
                )
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Price cant be updated",
            error: error
        })
    }
}

export { createAppointment, deleteAppointmentById, updateAppointmentById, workerUpdateAppointmentById }