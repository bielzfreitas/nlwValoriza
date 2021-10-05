import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

//sub da erro na request por não ser string
interface IPayload {sub: string}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  //Receber o token
  const authToken = request.headers.authorization
  
  //Validar se token está preenchido
  if(!authToken){
    return response.status(401).end() 
  }
  
  const [, token] = authToken.split(" ")
  //Validar se token é válido
  try{
    //forçar ser IPayload
    const { sub } = verify(token, "7a86bb2f1c32fa4345c1f0e6ce44f5ed") as IPayload
    //recuperar informações do usuário - se for admin retorna id do usuário
    request.user_id = sub
    
    return next()
  }catch(err){
    return response.status(401).end()
  } 
}

/*
* end() -> pega a mensagem padrão do erro, não
* precisando criar um json({message: ... })
*
* split -> dividi o token em dois (Bearer + token)
* ele pega a string e dividi em um array
*
* no split(" ") -> passar um espaço dentro do aprenteses!!
*
* [, token] -> ele pega somente o valor da segunda posição,
* que no caso seria somente o token, sem o Bearer
*
* o try catch -> serve para se o token for inválido,
* retornar automaticamente o erro no catch
*
* se o token for válido, ele decodifica o token
*
* sub -> se torna o id do usuário
* serve para quando precisar utilizar o id do usurário em
* outro middleware (ou rota)
*
* Na authenticate service está passando o user_id como 
* string, mas ainda assim precisa forçar no sub um 
* "as IPayload", garantindo ser uma string
*
* manipular o request criando pasta @types
*
*/