import { v4 as uuidv4 } from "uuid"
import { PrismaClient } from "@prisma/client"

async function main() {
  const prisma = new PrismaClient()
  console.log("creating sample data...")
  await prisma.team.create({
    data: {
      id: uuidv4(),
      name: "1",
      pairs: {
        create: [
          {
            id: uuidv4(),
            name: "a",
            users: {
              create: [
                {
                  id: uuidv4(),
                  name: "Kenzo Suzuki",
                  email: "kenzo@example.com",
                },
                {
                  id: uuidv4(),
                  name: "Kojiro Sasaki",
                  email: "kojiro@example.com",
                },
              ],
            },
          },
          {
            id: uuidv4(),
            name: "b",
            users: {
              create: [
                {
                  id: uuidv4(),
                  name: "Sagashi Machigai",
                  email: "sagashi@example.com",
                },
                {
                  id: uuidv4(),
                  name: "Allen Saito",
                  email: "allen@example.com",
                },
              ],
            },
          },
        ],
      },
    },
  })
  console.log("done✨")
}

main()
