//Somente o que for relacionado a criação de user
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"

//o I é para dizer que é uma interface
//o ? é para dizer que é opcional
interface IUserRequest{ name: string, email: string, admin?: boolean, password: string }

class CreateUserService{
  async execute({ name, email, admin = false, password } : IUserRequest ){
    //importa a UsersRespository
    const usersRepository = getCustomRepository(UsersRepositories)

    //verifica se o email está preenchido
    if(!email){
      throw new Error("User incorrect")
    }

    //verifica por email se o usuário já existe
    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    //se já existe -> excecao -> mensagem de erro
    if(userAlreadyExists){
      throw new Error("User already exists")
    }

    //bcrypt hash => salt é um tipo de criptografia
    //8 é um padrão do salt!!!
    const passwordHash = await hash(password, 8)

    //se não existir, cria instancia e salva no bd
    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash //passa o novo valor
    })

    //passa o user que acabou de ser criado
    await usersRepository.save(user)

    //para recuperar mais pra frente
    return user
  }
}

export { CreateUserService }

/*
* admin = false -> valor padrão pra ele
* false -> é um default, se o usuário 
* não definir se é um admin, automaticamente 
* passa um valor false para ele
*/