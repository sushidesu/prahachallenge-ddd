import { Team, Pair, User } from "@prisma/client"

export const generateTeam = (name: string): Team => ({
  id: `id-team-${name}`,
  name: name,
})

export const generatePair = (name: string): Pair => ({
  id: `id-pair-${name}`,
  name: name,
})

export const generateUser = (name: string): User => ({
  id: `id-user-${name}`,
  name: name,
  email: `${name}@example.com`,
})
