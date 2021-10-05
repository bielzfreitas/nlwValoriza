# NLW Valoriza

informação -> server -> controller -> processa no SERVICE -> repositories -> BD -> retorno

server.ts recebe requisição -> repassa para o controller -> chama a service -> faz todo o processo que precisa fazer

## Regras

- Cadastro de usuário

  [ x ] Não é permitido cadastrar mais de um usuário com o mesmo e-mail

  [ x ] Não é permitido cadastrar usuário sem e-mail

- Cadastro de TAG
  
  [ x ] Não é permitido cadastar tag sem nome

  [ x ] Não é permitido cadastar mais de uma tag com o mesmo nome

  [ x ] Não é permitido o cadstro por usuários que não sejam administradores

- Cadastro de elogios

  [ ] Não é permitido um usuário cadastrar um elogio para si

  [ ] Não é permitido cadastar elogios para usuários inválidos

  [ ] O usuário precisa estar autenticado na aplicação
