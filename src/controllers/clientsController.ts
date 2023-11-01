import { Request, Response } from "express";
import { Client } from "../models/Client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
    try {
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const phone = req.body.phone
        const email = req.body.email
        const password = req.body.password
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const encryptedPassword = bcrypt.hashSync(password, 10)
        const newClient = await Client.create
            ({
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                password: encryptedPassword
            }).save()

        return res.status(201).json
            ({
                success: true,
                message: "Client created successfully",
                token: newClient
            })
    }
    catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: "Client cant be created",
                error: error
            })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/


        if (!emailRegex.test(email)) {
            return res.json('invalid email format')
        }
        const client = await Client.findOneBy
            ({
                email: email
            })
        if (!client) {
            return res.status(401).json
                ({
                    success: true,
                    message: "Client or password incorrect"
                })
        }
        if (!bcrypt.compareSync(password, client.password)) {
            return res.status(401).json
                ({
                    success: true,
                    message: "Client or password incorrect"
                })
        }

        const token = jwt.sign
            (
                {
                    id: client.id,
                    email: client.email,
                    role: client.role
                },
                "D_uR9_M0#@951hKEc_9l",
                {
                    expiresIn: "2h"
                }
            )
        return res.status(200).json
            (
                {
                    success: true,
                    message: "Client logged succesfully",
                    token: token
                }
            )

    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Client cant be logged",
                    error: error
                }
            )
    }
}

const account = async (req: Request, res: Response) => {
    try {
        const client = await Client.findOneBy
            (
                { id: req.token.id }
            )
        return res.status(200).json
            (
                {
                    success: true,
                    message: "Profile client retrieved",
                    data: client
                }
            )
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Client profile cant be retrieved",
                    error: error
                }
            )
    }
}

const modifyClientByTokenId = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, phone, email, password } = req.body

        await Client.findOneBy
            (
                { id: req.token.id }

            )

        if (password) {
            const encryptedPassword = bcrypt.hashSync(password, 10)
            await Client.update
                (
                    { id: req.token.id },
                    {
                        password: encryptedPassword
                    }
                )
            const updateClient = await Client.findOneBy
                (
                    { id: req.token.id }
                )
            return res.status(200).json({
                success: true,
                message: "Password has been successfully updated",
                data: updateClient
            });
        }
        if (email) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;

            if (!emailRegex.test(email)) {


                return res.status(400).json
                    (
                        {
                            sucsess: false,
                            message: 'Invalid email'
                        }
                    )
            }
        }

        await Client.update
            (
                { id: req.token.id },
                {
                    first_name: first_name,
                    last_name: last_name,
                    phone: phone,
                    email: email
                }
            )
        const updateClient = await Client.findOneBy
            (
                { id: req.token.id }
            )
        return res.status(200).json({
            success: true,
            message: "Information updated successfully",
            data: updateClient
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Client profile cant be updated",
            error: error
        });
    }
};


const allClients = async (req: Request, res: Response) => {
    try {
        const clients = await Client.find()

        return res.status(200).json
            (
                {
                    success: true,
                    message: "Clients retrieved",
                    data: clients
                }
            )
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Clients cant be retrieved",
                    error: error
                }
            )
    }
}

const removeClientById = async (req: Request, res: Response) => {
    try {
        const clientToDelete = req.body.id
        const clientToRemove = await Client.findOneBy
            (
                { id: parseInt(clientToDelete) }
            )
        if (!clientToRemove) {
            return res.status(404).json
                (
                    {
                        success: false,
                        message: (`Client ID ${clientToDelete} not found`)
                    }
                )
        }
        const clientRemoved = await Client.remove(clientToRemove as Client);
        return res.status(200).json
            (
                {
                    success: true,
                    message: (`Client ID ${clientToDelete} has been deleted`),
                    data: clientRemoved
                }
            )

    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Client couldn't be deleted",
                    error: error
                }
            )
    }
}

const roleClientsById = async (req: Request, res: Response) => {
    try {
        const clientId = req.params.id
        const role = req.body

        const client = await Client.findOneBy
            (
                { id: parseInt(clientId) }
            )

        if (client) {
            client.role = role

            await client.save()

            return res.status(200).json
                (
                    {
                        success: true,
                        message: "Has been successfully updated"
                    }
                )
        }
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Client not found or Role has not been updated",
                    error: error
                }
            )
    }
}

export { register, login, account, allClients, modifyClientByTokenId, removeClientById, roleClientsById }