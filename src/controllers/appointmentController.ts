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
                return res.status(400).json("Client does not exist")
            }
            const { tattoo_artist_id, intervention_type, day, hour, article, description } = req.body


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
                message: "Appointment created successfully",
                data: newAppointment
            })

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }

}

const updateAppointmentById = async (req: Request, res: Response) => {
    try {
        if (req.token.role !== "user") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Insufficient permissions"
            })
        }
        const client = await Client.findOne({
            where: { id: req.token.id },
        })
        if (!client) {
            return res.status(400).json("Client does not exist")
        }
        const { id, day, hour } = req.body

        const appointmentToUpdate = await Appointment.findOne({
            where: { id: parseInt(id), client_id: req.token.id }
        })

        if (!appointmentToUpdate) {
            return res.status(404).json({
                success: false,
                message: `Appointment ID ${id} not found for this client`
            })
        }

        await Appointment.update(
            { id: parseInt(id) },
            {
                client_id: client.id,
                day: day,
                hour: hour
            }
        )
        const updatedAppointment = await Appointment.findOne({
            where: { id: parseInt(id), client_id: req.token.id }
        })
        return res.status(200).json
            (
                {
                    success: true,
                    message: "Appointment updated succesfully",
                    appointment: updatedAppointment
                }
            )

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
        if (req.token.role !== "user") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Insufficient permissions"
            });
        }
        const client = await Client.findOne({
            where: { id: req.token.id },
        });
        if (!client) {
            return res.status(400).json("Client does not exist")
        }
        const appointmentToDelete = req.body.id
        const appointmentToRemove = await Appointment.findOne({
            where: { id: parseInt(appointmentToDelete), client_id: req.token.id }
        })
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
        const { id: appointmentId, price } = req.body
        const tattooArtistId = req.token.id

        const appointmentToUpdate = await Appointment.findOne({
            where: { id: parseInt(appointmentId), tattoo_artist_id: tattooArtistId }
        });

        if (!appointmentToUpdate) {
            return res.status(404).json({
                success: false,
                message: `Appointment ID ${appointmentId} not found or not authorized for this worker`
            });
        }

        await Appointment.update(
            { id: parseInt(appointmentId) },
            { price: price }
        );

        const updatedAppointment = await Appointment.findOne({
            where: { id: parseInt(appointmentId), tattoo_artist_id: tattooArtistId }
        });

        return res.status(200).json({
            success: true,
            message: "Price updated successfully",
            appointment: updatedAppointment
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Price can't be updated",
            error: error
        });
    }
};


const clientAppointments = async (req: Request, res: Response) => {
    try {
        const clientId = req.token.id

        if (clientId === req.body.id) {
            const clientAppointments = await Appointment.find({
                where: { client_id: clientId },
                select: [
                    "id",
                    "tattoo_artist_id",
                    "intervention_type",
                    "price",
                    "day",
                    "hour",
                    "article",
                    "description"
                ],
                relations: ["clientAppointment", "workerAppointment", "workerAppointment.productPortfolio"]
            })

            const customAppointments = clientAppointments.map((appointment) => ({
                tattoo_artist: appointment.workerAppointment.first_name,
                type: appointment.intervention_type,
                price: appointment.price,
                appointment_day: appointment.day,
                appointment_hour: appointment.hour,
                description: appointment.description,
                article: appointment.article
            }))

            return res.status(200).json({
                success: true,
                message: `Appointments for ID ${clientId}`,
                appointments: customAppointments
            })
        } else {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Client ID doesn't match"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Couldn't fetch appointments",
            error: error
        })
    }
}



export { createAppointment, deleteAppointmentById, updateAppointmentById, workerUpdateAppointmentById, clientAppointments }