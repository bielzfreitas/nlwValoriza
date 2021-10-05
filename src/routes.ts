import { Router } from "express"
import { CreateUserController } from "./controllers/CreateUserController"
import { CreateTagController } from "./controllers/CreateTagController"
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController"
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController"
import { ListTagsController } from "./controllers/ListTagsController"
import { ListUserController } from "./controllers/ListUserController"

const router = Router()

//chamando o controller
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsContoller = new ListUserReceiveComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUserController()

//rota do usuário 
router.post("/users", createUserController.handle)
//rota da tag com o middleware
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)
//rota da autenticacao
router.post("/login", authenticateUserController.handle)
//rota do compliment
router.post("/compliments", ensureAuthenticated, createComplimentController.handle )
//buscar a listagem de elogios
router.get("/users/compliments/send", ensureAuthenticated,  listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuthenticated,listUserReceiveComplimentsContoller.handle)
//listar todas as tags
router.get("/tags", ensureAuthenticated, listTagsController.handle)
//listar todos os usuários
router.get("/users", ensureAuthenticated,listUsersController.handle)

export { router }

/*
* import Router -> para não deixar poluído
* import userController -> para usar o controller
* 
* precisa chamar o controller e criar todas as rotas
*
* router.post ("/users..) -> rota do usuário
* post -> insere o usurário
*
* middleware -> ele fica no meio entre o tag e 
* o controller.
*
* a verificação será feita por um token!
*
* o nome dos recursos nas APIs devem ser no plural!
*/