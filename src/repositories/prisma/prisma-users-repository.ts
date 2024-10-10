import { prisma } from "@/lib/prisma";
import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    return null
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}