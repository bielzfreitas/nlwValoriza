import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from "class-transformer"

//listar todas as tags
class ListTagService{
  async execute(){
    const tagsRepositories = getCustomRepository(TagsRepositories)

    const tags = await tagsRepositories.find()

    return classToPlain(tags)
  }
}

export { ListTagService }


/*
* Customizar tags :
*
* let tags = await tagsRepositories.find()
* tags = tags.map(tag) => (
*   ({ ...tag, nameCustom: `#${tag.name}` }))
*
* -> existe uma biblioteca que customiza as entidades
*   ClassTransformer
*
* Os {...tag} serve para bucar todos os
* atributos de tags
*
* ClassToPlain -> vai dentro da entidade de tag e ela
* cria novos objetos a partir dos objetos que já temos 
* vindo do typeorm e quando criar os objetos vai adicionar
* também o objeto nameCustom
*/