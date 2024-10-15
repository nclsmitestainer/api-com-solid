import { CreateGymUseCase } from '../create-gym'
import { PrisamGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrisamGymsRepository()
  const useCase = new CreateGymUseCase(gymsRepository)

  return useCase
}
