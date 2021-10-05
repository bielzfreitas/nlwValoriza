//mesma coisa que o user controller!!!
import { Request, Response } from "express"
import { CreateTagService } from "../services/CreateTagService"

class CreateTagController {
  async handle(request: Request, response: Response){
    //faz uma desestruturação
    const { name } = request.body
    const createTagService = new CreateTagService()

    const tag = await createTagService.execute(name)
    return response.json(tag)
  }
}

export { CreateTagController }