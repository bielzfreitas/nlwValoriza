import { Request, Response } from "express"
import { CreateComplimentService } from "../services/CreateComplimentService"

class CreateComplimentController{
  async handle(request: Request, response: Response){
    const { tag_id, user_receiver, message } = request.body
    const { user_id } = request //pega da service
    
    const createComplimentService = new CreateComplimentService()

    const compliment = await createComplimentService.execute({
      tag_id, 
      user_sender: user_id, 
      user_receiver, 
      message
    })

    //caso esteja tudo certo -> passa um return com json
    return response.json(compliment)
  }
}

export { CreateComplimentController }

/*
* const { user_id } = request //pega da service
*
* -> dessa forma o usuário não manipula o usuário de
* envio!
*
* -> será obrigado a se autenticar na aplicação para
* pegar o usuário dele e fazer o envio
*/