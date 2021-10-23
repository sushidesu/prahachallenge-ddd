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
        {
          id: "id-update-target",
          name: "please-update",
          email: "please-update@example.com",
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

  // HELP: ほぼprismaのメソッドを呼んでいるだけなので、テストの必要はない？
  describe(`insert()`, () => {
    it(`参加者を追加できる`, async () => {
      const id = ParticipantId.reconstruct("id-new-participant")
      const participant = Participant.reconstruct(id, {
        name: ParticipantName.reconstruct("new-participant"),
        email: Email.reconstruct("new-participant@example.com"),
      })
      await participantRepository.insert(participant)

      const result = await context.prisma.user.findUnique({
        where: {
          id: "id-new-participant",
        },
      })
      expect(result).toStrictEqual({
        id: "id-new-participant",
        name: "new-participant",
        email: "new-participant@example.com",
      })
    })
  })

  describe(`update()`, () => {
    it(`参加者の情報を変更できる`, async () => {
      const id = ParticipantId.reconstruct("id-update-target")
      const participant = Participant.reconstruct(id, {
        name: ParticipantName.reconstruct("updated"),
        email: Email.reconstruct("updated@example.com"),
      })
      await participantRepository.update(participant)

      const result = await context.prisma.user.findUnique({
        where: {
          id: "id-update-target",
        },
      })
      expect(result).toStrictEqual({
        id: "id-update-target",
        name: "updated",
        email: "updated@example.com",
      })
    })
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

  describe(`getParticipantsByEmail()`, () => {
    it(`emailが一致する参加者のリストを取得する`, async () => {
      const email = Email.reconstruct("tanaka@example.com")
      const actual = await participantRepository.getParticipantsByEmail(email)

      const expected = [
        Participant.reconstruct(ParticipantId.reconstruct("id-tanaka"), {
          name: ParticipantName.reconstruct("tanaka"),
          email: Email.reconstruct("tanaka@example.com"),
        }),
      ]

      expect(actual).toStrictEqual(expected)
    })
    it(`一致する参加者が存在しない場合、空のリストを返す`, async () => {
      const emailUnknown = Email.reconstruct("unknown@example.com")
      const actual = await participantRepository.getParticipantsByEmail(
        emailUnknown
      )
      expect(actual).toStrictEqual([])
    })
  })
})
