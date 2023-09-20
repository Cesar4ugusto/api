import { Router } from "express";

import { pessoas_route } from "./pessoas.routes";

const routes = Router();

routes.use("/pessoas", pessoas_route);

export { routes };
