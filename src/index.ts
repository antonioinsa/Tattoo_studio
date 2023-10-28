import express from "express"
import { router as routerUsers } from "./routes/clientsRoutes";
import { router as routerTattooArtists } from "./routes/workersRoutes";
import { AppDataSource } from "./db";

const app = express()

const PORT = process.env.PORT || 3010

app.use(express.json())
app.use('/client', routerUsers)
app.use('/worker', routerTattooArtists)

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