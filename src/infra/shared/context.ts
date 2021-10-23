import { PrismaClient } from "@prisma/client"
import { DeepMockProxy, mockDeep } from "jest-mock-extended"

export type Context = {
  prisma: PrismaClient
}

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createContext = (): Context => {
  const prisma = new PrismaClient()
  return {
    prisma,
  }
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}
