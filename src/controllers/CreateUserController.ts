import { Request, Response } from "express";
import { CreateUserService } from "../service/CreateUserService";


class CreateUserController {
    async handle(request: Request, response: Response) {
        // try {
            
        // }catch(err) {
        //     return response.status(400).json({error: err.message})
        // }
        const { name, email, admin, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, admin, password});

        return response.json(user);
    }
}

export { CreateUserController }