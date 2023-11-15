import express from "express"
import cors from "cors"
import { router as routerClients } from "./routes/clientsRoutes";
import { router as routerWorkers } from "./routes/workersRoutes";
import { router as routerAppointment } from "./routes/appointmentRoutes";
import { router as routerProducts} from "./routes/productsRoutes"
import { AppDataSource } from "./db";

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use('/client', routerClients)
app.use('/appointment', routerAppointment)
app.use('/worker', routerWorkers)
app.use('/', routerProducts)

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