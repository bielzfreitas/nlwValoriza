import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken" //token de login
import { UsersRepositories } from "../repositories/UsersRepositories"

//login
interface IAuthenticateRequest{ email: string, password: string }

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest){
    const usersRepositories = getCustomRepository(UsersRepositories)
    
    //verificar se email existe
    const user = await usersRepositories.findOne({
      email
    })

    if(!user){
      throw new Error("Email/Password incorrect")
    }

    //verificar se senha está correta
    //senha + hash
    const passwordMatch = await compare(password, user.password) 

    if(!passwordMatch){
      throw new Error("Email/Password incorrect")
    }

    //gerar o token
    const token = sign(
      {
        email: user.email
      }, 
      "7a86bb2f1c32fa4345c1f0e6ce44f5ed", 
      {
        subject: user.id,
        expiresIn: "1d" //tempo de expiracao do token
      }
    ) //chave secreta MD5
    return token
  }
}

export { AuthenticateUserService }

/*
* compare pega a senha que o user inseriu e 
* converte para a senha hash, comparando com
* a que está cadastrada no DB
*/

/*
* toda vez que o retorno for uma Promisse,
* PRECISA colocar o await!!!
*/

/*
* usar o MD5 para gerar uma hash
*/