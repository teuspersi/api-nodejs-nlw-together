import { getCustomRepository } from "typeorm"
import { CustomError } from "../errors/CustomError"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"


interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message } : IComplimentRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)
        
        const userReceiverExists = await usersRepositories.findOne(user_receiver)

        if(user_sender === user_receiver) {
            throw new CustomError("You can't send compliments to yourself", 401)
        }

        if(!userReceiverExists) {
            throw new CustomError("User receiver does not exists", 401);
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }

}

export { CreateComplimentService }