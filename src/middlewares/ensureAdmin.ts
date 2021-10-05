import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  //se for admin ele mostra o id do usuário
  const { user_id } = request
  //para ter certeza, usar o usersRepositories
  const usersRepositories = getCustomRepository(UsersRepositories)
  const { admin } = await usersRepositories.findOne(user_id)
  //Verificar se usuário é admin
  if(admin){
    //entra de fato no controller
    return next()
  }
  //se não for admin
  return response.status((401)).json({
    error: "Unauthorized"
  })
}

/*
* Middleware -> é aquilo que fica no meio,
* entre a requisição e a resposta. Ele pode
* tanto interceptar (alguma coisa) como  
* seguir adiante.
*
* Funcão que verifica se o usuário
* é um administrador.
*
* Também define se o usuário poderá
* acessar a determinada rota ou não.
*
* A verificação é feita por um token.
*
* Erro 401 -> usuário sem autorização
* para acessar a rota desejada.
*/