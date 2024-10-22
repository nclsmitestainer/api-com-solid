import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-crendentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    // O sistema de refresh token funciona da seguinte forma, esse token abaixo tem a vida util de apenas 10m, como foi definido no app.ts, mas o refreshToken tem vida util de 7d, no entanto o token que o frontend tem acesso e usa é o de 10m. Quando ele expirar e o usuário tentar fazer uma requisição nova, o back-end irá verificar se ele possui um refreshToken e a partir do refresh ele irá criar um novo token acessível. Dessa forma, o usuário terá acesso por tempo ilimitado a plataforma, contanto que não fique off por 7d.
    const token = await rep.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await rep.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return rep
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true, // Encriptado via HTTPS
        sameSite: true, // Seta que ele apenas será acessivel dentro do mesmo dominio
        httpOnly: true, // Esse cookie só será acessado pelo back-end, por requisição e resposta, somente pelo contexto da requisição, não ficará salvo ou acessivo no front-end
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: err.message })
    }

    throw err
  }
}
