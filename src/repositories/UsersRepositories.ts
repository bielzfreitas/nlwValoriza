import { EntityRepository, Repository } from "typeorm"
import { User } from "../entities/User"

@EntityRepository(User)
class UsersRepositories extends Repository<User>{
  //após o extends, possui acesso aos métodos repo 
}

export { UsersRepositories }