import { Router } from "express";

import { pessoas_route } from "./pessoas.routes";
import { auth_route } from "./auth.routes";

const routes = Router();

routes.use("/auth", auth_route);
routes.use("/pessoas", pessoas_route);

export { routes };
