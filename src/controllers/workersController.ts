import { Request, Response } from "express";
import { Worker } from "../models/Worker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getWorkers = async (req: Request, res: Response) => {
    try {
        const workers = await Worker.find()

        return res.status(200).json
            (
                {
                    success: true,
                    message: "Workers retrieved",
                    data: workers
                }
            )
    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Workers cant be retrieved",
                    error: error
                }
            )
    }
}

const register = async (req: Request, res: Response) => {
    try {
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const phone = req.body.phone
        const nationality = req.body.nationality
        const password = req.body.password

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const encryptedPassword = bcrypt.hashSync(password, 10)
        const newWorker = await Worker.create
            ({
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                nationality: nationality,
                password: encryptedPassword
            }).save()

        return res.status(201).json
            ({
                success: true,
                message: "Worker created successfully",
                token: newWorker
            })
    }
    catch (error) {
        return res.status(500).json
            ({
                success: false,
                message: "Worker cant be created",
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
        const worker = await Worker.findOneBy
            ({
                email: email
            })
        if (!worker) {
            return res.status(401).json
                ({
                    success: true,
                    message: "Worker or password incorrect1"
                })
        }
        if (!bcrypt.compareSync(password, worker.password)) {
            return res.status(401).json
                ({
                    success: true,
                    message: "Worker or password incorrect2"
                })
        }

        const token = jwt.sign
            (
                {
                    id: worker.id,
                    email: worker.email,
                    role: worker.role
                },
                "D_uR9_M0#@951hKEc_9l",
                {
                    expiresIn: "8h"
                }
            )
        return res.status(200).json
            (
                {
                    success: true,
                    message: "Worker logged succesfully",
                    token: token
                }
            )

    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Worker cant be logged",
                    error: error
                }
            )
    }
}


const updateWorkerById = async (req: Request, res: Response) => {
    try {
        const workerId = req.params.id
        const { first_name, last_name, phone, email, password, nationality } = req.body

        await Worker.findOneBy
            (
                { id: req.body.id }

            )

        if (password) {
            const encryptedPassword = bcrypt.hashSync(password, 10)
            await Worker.update
                (
                    { id: req.body.id },
                    {
                        password: encryptedPassword
                    }
                )
            const updateWorker = await Worker.findOneBy
                (
                    { id: req.token.id }
                )
            return res.status(200).json({
                success: true,
                message: `Password worker ${workerId} has been successfully updated`,
                data: updateWorker
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

        await Worker.update
            (
                { id: req.body.id },
                {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    nationality: nationality
                }
            )
        const updateWorker = await Worker.findOneBy
            (
                { id: req.body.id }
            )
        return res.status(200).json({
            success: true,
            message: `${workerId} updated successfully`,
            data: updateWorker
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Worker profile cant be updated",
            error: error
        });
    }
}

const deleteWorkerById = async (req: Request, res: Response) => {
    try {
        //RECUPERO EL ID QUE QUIERO BORRAR
        const workerToDelete = req.body.id;
        //RECUPERO EL ELEMENTO QUE QUIERO ELIMINAR (COMPRUEBO)
        const workerToRemove = await Worker.findOneBy
            (
                { id: parseInt(workerToDelete) }
            )
        if (!workerToRemove) {
            return res.status(404).json
                (
                    {
                        success: false,
                        message: (`Worker ID ${workerToDelete} not found`)
                    }
                )
        }
        const workerRemoved = await Worker.remove(workerToRemove as Worker);

        return res.status(200).json
            (
                {
                    success: true,
                    message: (`Worker ID ${workerToDelete} has been deleted`),
                    data: workerRemoved
                }
            )

    } catch (error) {
        return res.status(500).json
            (
                {
                    success: false,
                    message: "Worker couldn't be deleted",
                    error: error
                }
            )
    }
}

export { getWorkers, register, login, updateWorkerById, deleteWorkerById }