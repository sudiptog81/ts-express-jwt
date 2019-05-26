import { createUsersTable } from "./database/db";
import app from "./index";

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

// Initialize DB Table
createUsersTable();

app.listen(port, (): void => console.log(`Started on localhost:${port}`));