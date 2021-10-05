import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IComplimentRequest{ tag_id: string, user_sender: string, user_receiver: string, message: string }

class CreateComplimentService {
  async execute({tag_id, user_sender, user_receiver, message} : IComplimentRequest){
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
    const usersRepositories = getCustomRepository(UsersRepositories)

    //verifica se o usuário está enviando pra ele mesmo
    if(user_sender === user_receiver){
      throw new Error("Incorrect user Receiver!")
    }

    //verifica se o usuário existe
    const userReceiverExists = await usersRepositories.findOne(user_receiver)

    if(!userReceiverExists){
      throw new Error("User Receiver does not exists!")
    }

    //criando o elogio
    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    })

    //se tiver tudo certo, salva o nosso elogio
    await complimentsRepositories.save(compliment)

    return compliment

  }
}

export { CreateComplimentService }

/*
* O findOne do user_receiver não precisa de um where({})
* porque por padrão, ele já recebe um id e o receiver é
* um id !
*
* Criar uma classe handler responsavel por capturar os
* nossos erros
* Criar erros customizaveis
*
*/