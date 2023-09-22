import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";


class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const refresh_token = request.body.refresh_token || request.headers["x-access-refresh_token"] || request.query.refresh_token;

        const usecase = container.resolve(RefreshTokenUseCase);
        const token = await usecase.execute(refresh_token);

        return response.json(token);
    }
}

export { RefreshTokenController }
