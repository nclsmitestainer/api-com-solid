import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'
import { PrisamGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrisamGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
