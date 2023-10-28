import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateTableUsers1698355981436 } from "./migration/1698355981436-create-table-clients"
import { CreateTableAppointment1698353822932 } from "./migration/1698353822932-create-table-appointment"
export const AppDataSource = new DataSource({
type: "mysql",
host: "localhost",
port: 3306,
username: "root",
password: "password",
database: "tattoo_studio",
entities: [],
migrations: [CreateTableUsers1698355981436,
    CreateTableAppointment1698353822932],
synchronize: false,
logging: false,
})