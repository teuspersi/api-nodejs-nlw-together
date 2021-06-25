import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensnureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUSersController } from "./controllers/ListUsersController";
import { ListUsersService } from "./service/ListUsersService";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUSersController = new ListUSersController();

router.post("/users", createUserController.handle);
router.post("/tags", ensnureAuthenticated, ensureAdmin, createTagController.handle);
router.post("/compliments", ensnureAuthenticated, createComplimentController.handle);
router.post("/login", authenticateUserController.handle);
router.get("/users/compliments/send", ensnureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive", ensnureAuthenticated, listUserReceiveComplimentsController.handle);
router.get("/tags", ensnureAuthenticated, listTagsController.handle);
router.get("/users", ensnureAuthenticated, ensureAdmin, listUSersController.handle);

export { router }