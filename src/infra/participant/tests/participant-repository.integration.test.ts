import { PrismaClient } from "@prisma/client"
import { Email } from "../../../domain/participant/email"
import { Participant } from "../../../domain/participant/participant"
import { ParticipantId } from "../../../domain/participant/participant-id"
import { ParticipantName } from "../../../domain/participant/participant-name"
import { ParticipantRepository } from "../participant-repository"

describe(`ParticipantRepository`, () => {
  let prisma: PrismaClient

  beforeAll(async () => {
    prisma = new PrismaClient()
    await prisma.user.createMany({
      data: [
        {
          id: "id-tanaka",
          name: "tanaka",
          email: "tanaka@example.com",
        },
        {
          id: "id-hoge",
          name: "hoge",
          email: "hoge@example.com",
        },
      ],
    })
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  let participantRepository: ParticipantRepository
  beforeEach(() => {
    participantRepository = new ParticipantRepository()
  })

  describe(`getParticipantById()`, () => {
    it(`idが一致する参加者を取得する`, async () => {
      const actual = await participantRepository.getParticipantById("id-tanaka")

      const expected = Participant.reconstruct(
        ParticipantId.reconstruct("id-tanaka"),
        {
          name: ParticipantName.reconstruct("tanaka"),
          email: Email.reconstruct("tanaka@example.com"),
        }
      )

      expect(actual).toStrictEqual(expected)
    })
  })
})
