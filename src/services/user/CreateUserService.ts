import prismaClient from "../../prisma";
import { hash } from "bcryptjs"
import { UserRequest } from "../../models/interfaces/user/UserRequest"

class CreateUserService {

    async execute({name, email, password } : UserRequest) {
        if(!email){
            throw new Error("Email Incorrect")
        }

        const userAlreadyExist = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userAlreadyExist) {
            throw new Error("Email already Exists")
        }

        // Encriptando a nossa senha do Usuário
        const passwordHash = await hash(password, 8)

        // Criando o nosso usuário
        const user = prismaClient.user.creat({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
               id: true,
               name: true,
               email: true 
            }
        })

        return user;
    }
}

export {CreateUserService}