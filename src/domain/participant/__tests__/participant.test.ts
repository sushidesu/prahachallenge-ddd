import { mocked } from "ts-jest/utils"
import { Participant } from "../participant"
import { ParticipantId } from "../participant-id"
import { Name } from "../name"
import { Email } from "../email"
import { CheckEmailAlreadyExists } from "../check-email-already-exists"

const CheckEmailAlreadyExistsMock = mocked(
  CheckEmailAlreadyExists,
  true
) as unknown as jest.Mocked<CheckEmailAlreadyExists>

describe("Participant", () => {
  let participant: Participant
  beforeEach(() => {
    const id = ParticipantId.reconstruct("test-id")
    participant = Participant.reconstruct(id, {
      name: Name.reconstruct("ほげ太郎"),
      email: Email.reconstruct("test@example.com"),
    })
  })

  beforeEach(() => {
    CheckEmailAlreadyExistsMock.do.mockClear()
  })

  describe("changeName()", () => {
    it("名前を空文字にするとエラーになる", () => {
      expect(() => participant.changeName("")).toThrowError()
    })
  })

  describe("changeEmail()", () => {
    it("メールアドレスを空文字にするとエラーになる", () => {
      CheckEmailAlreadyExistsMock.do.mockResolvedValue(true)
      expect(() =>
        participant.changeEmail("", CheckEmailAlreadyExistsMock)
      ).toThrowError()
    })
    it("すでに存在するメールアドレスには変更できない", () => {
      CheckEmailAlreadyExistsMock.do.mockResolvedValue(false)
      expect(() =>
        participant.changeEmail("hoge@example.com", CheckEmailAlreadyExistsMock)
      ).toThrowError()
    })
  })
})
