import {Router, Response, Request} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();
router.get("/test", (request: Request, response: Response) => {
    return response.json( {ok: true})
})

router.post('/user', new CreateUserController().handle)

export {router}


