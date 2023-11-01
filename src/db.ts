import "reflect-metadata"
import { DataSource } from "typeorm"
import { Client } from "./models/Client"
import { Worker } from "./models/Worker"
import { Product } from "./models/Product"
import { Appointment } from "./models/Appointment"
import { Portfolio } from "./models/Portfolio"
import { CreateTableClients1698355981436 } from "./migrations/1698355981436-create-table-clients"
import { CreateTableWorkers1698353691519 } from "./migrations/1698353691519-create-table-workers"
import { CreateTableProducts1698353804252 } from "./migrations/1698353804252-create-table-products"
import { CreateTableAppointments1698353822932 } from "./migrations/1698353822932-create-table-appointment"
import { CreateTablePortfolios1698486153563 } from "./migrations/1698486153563-create-table-portfolios"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "tattoo_studio",
    entities: [Client,
        Worker,
        Product,
        Appointment,
        Portfolio],
    migrations: [CreateTableClients1698355981436,
        CreateTableWorkers1698353691519,
        CreateTableProducts1698353804252,
        CreateTableAppointments1698353822932,
        CreateTablePortfolios1698486153563],
    synchronize: false,
    logging: false,
})