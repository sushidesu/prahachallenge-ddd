import { mock } from "jest-mock-extended"
import { CheckEmailAlreadyExists } from "../check-email-already-exists"
import { Email } from "../../email"
import { IParticipantRepository } from "../../interface/participant-repository"
import { ParticipantName } from "../../participant-name"
import { Participant } from "../../participant"
import { ParticipantId } from "../../participant-id"

describe("CheckEmailAlreadyExists", () => {
  const participantRepositoryMock = mock<IParticipantRepository>()
  afterEach(() => {
    jest.resetAllMocks()
  })

  it("与えられたメールアドレスを持つ参加者が1人以上存在する場合 true を返す", async () => {
    participantRepositoryMock.getParticipantsByEmail.mockResolvedValue([
      Participant.reconstruct(ParticipantId.reconstruct("test"), {
        name: ParticipantName.reconstruct("test"),
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
