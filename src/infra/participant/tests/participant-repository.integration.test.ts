import { createContext } from "../../shared/context"
import { Email } from "../../../domain/participant/email"
import { Participant } from "../../../domain/participant/participant"
import { ParticipantId } from "../../../domain/participant/participant-id"
import { ParticipantName } from "../../../domain/participant/participant-name"
import { ParticipantRepository } from "../participant-repository"

describe(`ParticipantRepository`, () => {
  const context = createContext()

  beforeAll(async () => {
    await context.prisma.user.createMany({
      data: [
        {
          id: "id-tanaka",
          name: "tanaka",
          email: "tanaka@example.com",
        },
      ],
    })
  })

  afterAll(async () => {
    await context.prisma.user.deleteMany()
    await context.prisma.$disconnect()
  })

  let participantRepository: ParticipantRepository
  beforeEach(() => {
    participantRepository = new ParticipantRepository(context)
  })

  describe(`getParticipantById()`, () => {
    it(`idが一致する参加者を取得する`, async () => {
      const id = ParticipantId.reconstruct("id-tanaka")
      const actual = await participantRepository.getParticipantById(id)

      const expected = Participant.reconstruct(
        ParticipantId.reconstruct("id-tanaka"),
        {
          name: ParticipantName.reconstruct("tanaka"),
          email: Email.reconstruct("tanaka@example.com"),
        }
      )

      expect(actual).toStrictEqual(expected)
    })
    it(`idが一致する参加者が存在しない場合、undefinedを返す`, async () => {
      const id = ParticipantId.reconstruct("id-unknown")
      const actual = await participantRepository.getParticipantById(id)
      expect(actual).toBe(undefined)
    })
  })
})
