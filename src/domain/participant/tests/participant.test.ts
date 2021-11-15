import { mock } from "jest-mock-extended"
import { Participant } from "../participant"
import { ParticipantId } from "../participant-id"
import { ParticipantName } from "../participant-name"
import { Email } from "../email"
import { CheckEmailAlreadyExists } from "../domain-service/check-email-already-exists"

describe("Participant", () => {
  const checkEmailAlreadyExisitsMock = mock<CheckEmailAlreadyExists>()
  afterEach(() => {
    jest.resetAllMocks()
  })

  let participant: Participant
  beforeEach(() => {
    const id = ParticipantId.reconstruct("test-id")
    participant = Participant.reconstruct(id, {
      name: ParticipantName.reconstruct("ほげ太郎"),
      email: Email.reconstruct("test@example.com"),
    })
  })

  describe("changeName()", () => {
    it("名前を変更できる", () => {
      participant.changeName("アルスアルマル")
      expect(participant.name.props.value).toBe("アルスアルマル")
    })
    it("名前を空文字にするとエラーになる", () => {
      expect(() => participant.changeName("")).toThrowError()
    })
  })

  describe("changeEmail()", () => {
    it("メールアドレスを変更できる", async () => {
      checkEmailAlreadyExisitsMock.do.mockResolvedValue(false)
      await participant.changeEmail(
        "hoge@example.com",
        checkEmailAlreadyExisitsMock
      )
      expect(participant.email.props.value).toBe("hoge@example.com")
    })
    it("メールアドレスを空文字にするとエラーになる", async () => {
      checkEmailAlreadyExisitsMock.do.mockResolvedValue(false)
      await expect(
        participant.changeEmail("", checkEmailAlreadyExisitsMock)
      ).rejects.toThrowError()
    })
    it("すでに存在するメールアドレスには変更できない", async () => {
      checkEmailAlreadyExisitsMock.do.mockResolvedValue(true)
      await expect(
        participant.changeEmail(
          "duplicated@example.com",
          checkEmailAlreadyExisitsMock
        )
      ).rejects.toThrowError()
    })
  })
})
