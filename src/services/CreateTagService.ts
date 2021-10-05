import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"

class CreateTagService {
  async execute(name: string){
    //repositorio
    const tagsRepositories = getCustomRepository(TagsRepositories)
    if(!name) {
      throw new Error("Incorrect name!")
    }

    // SELECT * FROM TAGS WHERE NAME = 'name'
    const tagAlreadyExists = await tagsRepositories.findOne({
      name
    })
    if(tagAlreadyExists) {
      throw new Error("Tag already exists!")
    }

    //cria uma tag
    const tag = tagsRepositories.create({
      name
    })
    await tagsRepositories.save(tag)
    
    return tag
  }
}

export { CreateTagService }


// o * é selecionar tudo na tabela
//não precisa utilizar o WHERE, só passar direto (name)
// o findOne que faz a busca da tag onde tem o nome