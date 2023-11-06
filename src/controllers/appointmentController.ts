import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { Client } from "../models/Client";

const createAppointment = async (req: Request, res: Response) => {
    try {
        if ((req.token.role == "user")) {

            const client = await Client.findOne({
                where: { id: req.token.id },
            });
            if (!client) {
                return res.json("El usuario no existe.");
            }
            const { tattoo_artist_id, intervention_type, day, hour, article, description } = req.body;


            const newAppointment = await Appointment.create({
                client_id: client.id,
                tattoo_artist_id,
                intervention_type,
                day,
                hour,
                article,
                description
            }).save()

            return res.json({
                success: true,
                message: 'Cita creada exitosamente',
                data: newAppointment
            });

        }

    }catch (error) {
        return res.status(401).json({
            success: false,
            message: 'No se pudo crear la cita. ' + error
        });
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
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Price cant be updated",
                    error: error
                }
            )
    }
}

const clientAppointments = async (req: Request, res: Response) => {
    try {

        if (req.token.id === req.body.id) {
            const clientId = req.body.id

            const myAppointment = await Appointment.find({
                where: { client_id: clientId },
                select: {
                    id: true,
                    tattoo_artist_id: true,
                    intervention_type: true,
                    price: true,
                    day: true,
                    hour: true,
                    article: true,
                    description: true
                },
                relations: {
                    clientAppointment: true,
                    workerAppointment: true,
                    //productPortfolio: true,
                },
            })

            const customAppointment = myAppointment.map((appointment) => ({
                Client: appointment.clientAppointment.first_name,
                type: appointment.intervention_type,
                price: appointment.price,
                appointment_day: appointment.day,
                appointment_hour: appointment.hour,
                //description: appointment.productPortfolio.description,
                //tattoo_artist: appointment.workerAppointment.first_name
            }))

            return res.status(200).json
                (
                    {
                        success: true,
                        message: `ID ${clientId}, this is your appointment`,
                        appointment: customAppointment
                    }
                )
        }
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Dont show your appointment",
                    error: error
                }
            )
    }
}


export { createAppointment, deleteAppointmentById, updateAppointmentById, workerUpdateAppointmentById, clientAppointments }