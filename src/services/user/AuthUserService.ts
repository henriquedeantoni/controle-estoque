import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import prismaClient from '../../prisma/index'
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest'

class AuthUserService {

    async execute({email, password}: AuthRequest){

        if (!email){
            throw new Error("email precisa ser enviado")
        }
        if (!password){
            throw new Error("A senha precisa ser enviada")
        }


        //verificar banco de dados se existe o usuario com um email passado
        const user = await prismaClient.user.findFirst({
            where: {
                email: email 
            }
        })

        if(!user ) {
            throw new Error ("Wrong User name or Password")

        }

        //Verificar se a senha do usuário esta correta

        const passwordMatch =  await compare(password, user?.password)

        if(!passwordMatch) {
            throw new Error("Wrong User name or Password!")
        }

        const token = sign(
            {
                name: user?.name,
                email: user?.name,
            },
            process.env.JWT_SECRET as string,
            {
                subject: user?.id,
                expiresIn: "1d"
            }
        );
        return {
            id: user?.id,
            name: user?.name,
            email: user?.email,
            token: token
        }
    }
}

export { AuthUserService }