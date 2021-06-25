import { Request, Response } from "express";
import { AutheticateUserService } from "../service/AuthenticateUserServer";


class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body

        const autheticateUserService = new AutheticateUserService();

        const token = await autheticateUserService.execute({
            email,
            password
        });

        return response.json(token);
    }
}

export { AuthenticateUserController }