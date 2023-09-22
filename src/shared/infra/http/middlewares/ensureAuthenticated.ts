import { AppError } from "@/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { Auth } from "@/shared/container/providers/Libraries/Auth";

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const library = new Auth();

    const auth = request.headers.authorization;
    if (!auth) throw new AppError("Token ausente!", 401);

    const [, token] = auth.split(" ");

    try {
        const { sub: id_pessoa } = library.verifyToken(token);

        request.user = {
            id: id_pessoa,
        };

        next();

    } catch (error) {
        throw new AppError("Token inválido!", 401);
    }
}
