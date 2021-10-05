//funciona como request e response
//deixa as classes com as responsabilidades corretas
import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"


class CreateUserController{
  //precisa definir os tipos das variáveis
  async handle(request : Request, response: Response){
      //recuperar informações de dentro da requisição
      const { name, email, admin, password } = request.body
  
      //chamar o user
      const createUserService = new CreateUserService()
      const user = await createUserService.execute({name, email, admin, password})
  
      //retornando a informação que recuperou
      return response.json(user)
  }
}

export { CreateUserController }


/*
* insomnia cria request Create User - Post - JSon
* body é tudo o que vem no parâmetro
*
* server -> routes -> Controller -> Service (throw new Error)
* o controller chama          
* o service lança exceção
* o controller é quem trata a exceção!!
*/