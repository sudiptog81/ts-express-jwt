import { createUsersTable } from "./database/sqlite3";
import app from "./index";

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

createUsersTable();
app.listen(port, (): void => console.log(`Started on localhost:${port}`));