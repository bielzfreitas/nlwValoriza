//listar todos os elogios enviados do usuário
import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"


class ListUserSendComplimentsService {
  async execute(user_id: string){
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)

    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id
      },
      //usando os objetos da Compliments.ts
      //ele busca todos os dados
      relations: ["userSender", "userReceiver", "tag"]
    })

    return compliments
  }
}

export { ListUserSendComplimentsService }

/*
* precisa tomar MUITO cuidado em quando utilizar
* o relations, pois ele busca TODOS OS DADOS e 
* com isso, fica muito pesado!
*/