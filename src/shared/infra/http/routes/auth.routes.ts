import { Router } from "express";

import { AuthenticateController } from "@/modules/auth/usecases/authenticate/AuthenticateController";
import { RefreshTokenController } from "@/modules/auth/usecases/refreshToken/RefreshTokenController";
import { SendForgotPasswordMailController } from "@/modules/auth/usecases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { ResetPasswordController } from "@/modules/auth/usecases/resetPassword/ResetPasswordController";

const auth_route = Router();

const authenticate = new AuthenticateController();
const refresh_token = new RefreshTokenController();
const forgot_password = new SendForgotPasswordMailController();
const reset_password = new ResetPasswordController();

auth_route.post("/session", authenticate.handle);
auth_route.post("/refresh-token", refresh_token.handle);
auth_route.post("/forgot-password", forgot_password.handle);
auth_route.patch("/reset-password", reset_password.handle);

export { auth_route };
