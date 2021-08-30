import { mocked } from "ts-jest/utils"
import { Participant } from "../participant"
import { ParticipantId } from "../participant-id"
import { Name } from "../name"
import { Email } from "../email"
import { CheckEmailAlreadyExsists } from "../check-email-already-exsits"

const CheckEmailMock = mocked(
  CheckEmailAlreadyExsists,
  true
) as unknown as jest.Mocked<CheckEmailAlreadyExsists>

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
    CheckEmailMock.exsits.mockClear()
  })

  describe("changeName()", () => {
    it("名前を空文字にするとエラーになる", () => {
      expect(() => participant.changeName("")).toThrowError()
    })
  })

  describe("changeEmail()", () => {
    it("メールアドレスを空文字にするとエラーになる", () => {
      CheckEmailMock.exsits.mockResolvedValue(true)
      expect(() => participant.changeEmail("", CheckEmailMock)).toThrowError()
    })
    it("すでに存在するメールアドレスには変更できない", () => {
      CheckEmailMock.exsits.mockResolvedValue(false)
      expect(() =>
        participant.changeEmail("hoge@example.com", CheckEmailMock)
      ).toThrowError()
    })
  })
})
