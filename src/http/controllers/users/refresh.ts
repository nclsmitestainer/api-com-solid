import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(req: FastifyRequest, rep: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await rep.jwtSign(
    {
      role: req.user.role,
    },
    {
      sign: {
        sub: req.user.sub,
      },
    },
  )

  const refreshToken = await rep.jwtSign(
    {
      role: req.user.role,
    },
    {
      sign: {
        sub: req.user.sub,
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
}
