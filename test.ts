import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log(
    "Create user ----------------------------------------------------------------"
  )
  for (let i = 1; i <= 10; i++) {
    const email = `user-${i}@prisma.io`
    const name = `user-${i}`
    await prisma.user.create({
      data: {
        email: email,
        name: name
      }
    })
  }

  console.log(
    "Show all users ----------------------------------------------------------------"
  )
  const allUsers = await prisma.user.findMany()
  console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
 
