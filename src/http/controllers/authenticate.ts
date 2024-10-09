import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-crendentials-error"

export async function authenticate (req: FastifyRequest, rep: FastifyReply) { 
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    await authenticateUseCase.execute({
      email, 
      password
    })
  } catch(err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message:  err.message })
    }

    throw err
  }

  return rep.status(200).send()
}