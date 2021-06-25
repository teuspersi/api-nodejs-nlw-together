import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
   sub: string; 
}

export function ensnureAuthenticated(request: Request, response: Response, next: NextFunction) {
    // Receber o token
    const authToken = request.headers.authorization;
    
    // Validar se token está preenchido
    if(!authToken){
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ")

    // Validar token
    try {
        const { sub } = verify(token, "bcd2dbc3e7d8a5f438650e299641f9f8") as IPayload;

        request.user_id = sub;

        return next();
    }catch(err) {
        return response.status(401).end();
    }

    // Recuperar informações do usuário


    

}