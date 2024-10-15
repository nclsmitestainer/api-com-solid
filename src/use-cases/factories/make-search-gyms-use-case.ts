import { SearchGymUseCase } from '../search-gyms'
import { PrisamGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrisamGymsRepository()
  const useCase = new SearchGymUseCase(gymsRepository)

  return useCase
}
