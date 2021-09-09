import { CheckEmailAlreadyExists } from "../check-email-already-exists"
import { Email } from "../email"
import { IParticipantRepository } from "../interface/participant-repository"
import { Name } from "../name"
import { Participant } from "../participant"
import { ParticipantId } from "../participant-id"

describe("CheckEmailAlreadyExists", () => {
  let participantRepositoryMock: jest.Mocked<IParticipantRepository>
  beforeEach(() => {
    participantRepositoryMock = {
      getParticipantById: jest.fn(),
      saveParticipant: jest.fn(),
      getParticipantsByEmail: jest.fn(),
    } as unknown as jest.Mocked<IParticipantRepository>
  })

  it("与えられたメールアドレスを持つ参加者が1人以上存在する場合 true を返す", async () => {
    participantRepositoryMock.getParticipantsByEmail.mockResolvedValue([
      Participant.reconstruct(ParticipantId.reconstruct("test"), {
        name: Name.reconstruct("test"),
        email: Email.reconstruct("test@example.com"),
      }),
    ])
    const checkEmailAlreadyExists = new CheckEmailAlreadyExists(
      participantRepositoryMock
    )
    const actual = await checkEmailAlreadyExists.do(
      Email.reconstruct("test@example.com")
    )
    expect(actual).toBe(true)
  })
  it("与えられたメールアドレスを持つ参加者が一人も存在しない場合 false を返す", async () => {
    participantRepositoryMock.getParticipantsByEmail.mockResolvedValue([])
    const checkEmailAlreadyExists = new CheckEmailAlreadyExists(
      participantRepositoryMock
    )
    const actual = await checkEmailAlreadyExists.do(
      Email.reconstruct("test@example.com")
    )
    expect(actual).toBe(false)
  })
})