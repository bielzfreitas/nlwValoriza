import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AuthenticateUserService"

class AuthenticateUserController {
  async handle(request: Request, response: Response){
    const{ email, password } = request.body

    //chama a service
    const authenticateUserService = new AuthenticateUserService()

    //chama o token
    const token = await authenticateUserService.execute({
      email,
      password
    })

    //se der certo
    return response.json(token)
  }
}

export { AuthenticateUserController }