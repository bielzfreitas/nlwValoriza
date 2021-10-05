declare namespace Express{
  export interface Request {
    user_id: string
  }
}

/*
* Sobscrevendo uma biblioteca
*
* pega tudo o que tem dentro do node_modules - @types -
* express - index.d.ts + o que passar aqui!
*
* criar uma variável dentro do types - express
* para usar no ensureAuthenticated.ts
*
* request.user_id
*
* mudar no tsconfig.json -> "typeRoots": ["./src/@types"]
*
*/