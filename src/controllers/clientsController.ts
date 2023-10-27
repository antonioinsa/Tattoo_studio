import { Request, Response } from "express";
import { Client } from "../models/Client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
    try {
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const phone = req.body.phone_number
        const password = req.body.password

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const encryptedPassword = bcrypt.hashSync(password, 35)


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
                message: "User created successfully",
                token: newClient
            })
    }
    catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: "User cant be created",
                error: error
            })
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const client = await Client.findOneBy
            ({
                email: email
            })
        if (!client) {
            return res.status(403).json
                ({
                    successs: true,
                    message: "User or password incorrect"
                })
        }
        if (!bcrypt.compareSync(password, client.password)) {
            return res.status(403).json
                ({
                    success: true,
                    message: "User or password incorrect"
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
                    expiresIn: "1h"
                }
            )
        return res.status(200).json
            (
                {
                    success: true,
                    message: "User logged succesfully",
                    token: token
                }
            )

    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "User cant be logged",
                    error: error
                }
            )
    }
}

const acount = async (req: Request, res: Response) => {
    try {
        const client = await Client.findOneBy
            (
                { id: req.token.id }
            )
        return res.status(200).json
            (
                {
                    success: true,
                    message: "Profile user retrieved",
                    data: client
                }
            )
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "User profile cant be retrieved",
                    error: error
                }
            )
    }
}

const allRegister = async (req: Request, res: Response) => {
    try {
        const clients = await Client.find()

        return res.status(200).json
            (
                {
                    success: true,
                    message: "Users retrieved",
                    data: clients
                }
            )
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "User cant be retrieved",
                    error: error
                }
            )
    }
}



export { register, login, acount, allRegister }