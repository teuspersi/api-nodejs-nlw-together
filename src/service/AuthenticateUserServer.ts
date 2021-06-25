import { getCustomRepository } from "typeorm";
import { CustomError } from "../errors/CustomError";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AutheticateUserService {
    
    async execute({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new CustomError("Email or Password incorrect", 401);
        }

        // Verificar se senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new CustomError("Email or Password incorrect", 401);
        }

        // Gerar token
        const token = sign(
            {
                email: user.email
            }, "bcd2dbc3e7d8a5f438650e299641f9f8", 
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AutheticateUserService }