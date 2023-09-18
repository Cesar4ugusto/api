import { app } from "./app";
import shell from "shelljs";

app.listen(3333, () => shell.echo("Server is running!"));
