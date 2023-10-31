import express from "express"
import { router as routerClients } from "./routes/clientsRoutes";
//import { router as routerTattooArtists } from "./routes/workersRoutes";
import { AppDataSource } from "./db";

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/client', routerClients)
//app.use('/worker', routerTattooArtists)

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running ${PORT}`);

        })
    })
    .catch(error => {
        console.log(error)
    })