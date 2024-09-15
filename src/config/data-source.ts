import { DataSource } from "typeorm";
import { typeOrmConfig } from "./database.config"; // Asegúrate de que esta ruta sea correcta

export const AppDataSource = new DataSource(typeOrmConfig as any);
