import { Request, Response } from "express";
import { Client } from "../models/Client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//const getClients = async(req: Request, res: Response) => {
//    try {
//      const clients = await Client.find()
//  
//      return res.send(clients)
//    } catch (error) {
//      return res.send(error)
//    }
//  }
//  const createClient = async (req: Request, res: Response) => {
//    try {
//        const {first_name, last_name, phone, email, password} = req.body
//
//        const newClient = await Client.create(
//            {
//                first_name: first_name,
//                last_name: last_name,
//                phone: phone,
//                email: email,
//                password: password
//            }
//        ).save()
//        return res.json(newClient)
//    } catch (error) {
//        return res.json(error)
//    }
//}



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

        const encryptedPassword = bcrypt.hashSync(password, 15)

        console.log(encryptedPassword);
        
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

        const client = await Client.findOneBy
            ({
                email: email
            })
        if (!client) {
            return res.status(403).json
                ({
                    success: true,
                    message: "Client or password incorrect"
                })
        }
        if (!bcrypt.compareSync(password, client.password)) {
            return res.status(403).json
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
                    message: "Cliente logged succesfully",
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

//const modifyClientById = async (req: Request, res: Response) => {
//    try {
//        const { first_name, last_name, phone, email, password } = req.body
//        const clientId = req.token.id
//
//        // Buscar el cliente que se desea actualizar
//        const client = await Client.findOneBy
//        (
//            { id: clientId }
//        )
//
//        if (!client) {
//            return res.status(404).json({
//                success: false,
//                message: "Client not found"
//            });
//        }
//
//        client.first_name,
//        client.last_name,
//        client.phone,
//        client.email,
//        client.password
//
//        await client.save();
//
//        return res.status(200).json({
//            success: true,
//            message: "Client has been successfully updated",
//            data: client
//        });
//    } catch (error) {
//        return res.status(500).json({
//            success: false,
//            message: "Client profile can't be updated",
//            error: error
//        });
//    }
//};


const allRegister = async (req: Request, res: Response) => {
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



export { register, login, account, allRegister}//, modifyClientById }