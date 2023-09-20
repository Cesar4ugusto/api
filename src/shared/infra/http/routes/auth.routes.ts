import { Router } from "express";

import { AuthenticateController } from "@/modules/auth/usecases/authenticate/AuthenticateController";
import { RefreshTokenController } from "@/modules/auth/usecases/refreshToken/RefreshTokenController";

const auth_route = Router();

const authenticate = new AuthenticateController();
const refresh_token = new RefreshTokenController();

auth_route.post("/session", authenticate.handle);
auth_route.post("/refresh-token", refresh_token.handle);

export { auth_route };
