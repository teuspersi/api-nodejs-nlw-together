import { getCustomRepository } from "typeorm"
import { CustomError } from "../errors/CustomError";
import { TagsRepositories } from "../repositories/TagsRepositories"

class CreateTagService {

    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        if(!name) {
            throw new CustomError("Incorrect name", 400);
        }

        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        });

        if(tagAlreadyExists) {
            throw new CustomError("Tag already exists", 400);
        }

        const tag = tagsRepositories.create({
            name
        });

        await tagsRepositories.save(tag);
        
        return tag;
    }
}

export { CreateTagService }