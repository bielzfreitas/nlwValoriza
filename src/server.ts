import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express"
import "express-async-errors"
import cars from "cars"

import { router } from "./routes"
import "./database"

// @types/express
const app = express()

//chamando o cars para front-end
app.use(cars())

//habilita o json
app.use(express.json())

//todas as rotas fazem parte do projeto
app.use(router)

//middeware para erro
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  //verifica se o err é um throw new Error
  if(err instanceof Error){
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Erros"
  })
})

//http://localhost:3000
app.listen(3000, () => console.log('Server is Running'))



//Observações!!!

//middleware só vem DEPOIS DAS ROTAS

/* middlewares : são interceptadores dentro de uma 
* requisição, podendo interromper uma aplicação por 
* completo como também adicionar alguma informação 
* no middeware.
*
* o middleware fica entre a requisição e a resposta
*/

/*
* err: Error -> verifica se existe algum erro
* next: NextFunction -> passa para proximo (rota)
*/

//use - middleware (insere as rotas dentro do express)
//usar o insomnia para os POSTs
//Request => Entrando
//Response => Saindo

/** 
 * GET    => buscar uma info na API
 * POST   => inserir uma info na API
 * PUT    => alterar uma info na API
 * DELETE => remover um dado na API
 * PATCH  => alterar uma info específica
**/

/** Tipos de Parâmetros
 * Routes Params => http://localhoste:3000/produtos/97552
 * Query Params  => http://localhoste:3000/produtos?name=teclado&description=corsair
 * Body Params   => {
 *  "name": "teclado"
 *  "description": "corsair"
 * }
 **/


/** 
* O cars habilita que outras fonts que
* não sejam aplicações de back-end 
* consigam acessar a aplicação. Se não
* estiver habilitado, não conseguirá receber
* aplicações de fora.
*
* Dentro do app.use(cars) da para habilitar o 
* origin, se quiser que somente um site ou um ip
* acesse a aplicação
*
* melhorar a aplicação com Solid e outros Design Pattern
*
**/