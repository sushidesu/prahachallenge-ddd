import { Participant } from "../participant"
import { ParticipantId } from "../participant-id"
import { Name } from "../name"
import { Email } from "../email"
import { CheckEmailAlreadyExists } from "../check-email-already-exists"

const CheckEmailMockAlwaysTrue = {
  do: jest.fn().mockResolvedValue(true),
} as unknown as jest.Mocked<CheckEmailAlreadyExists>
const CheckEmailMockAlwaysFalse = {
  do: jest.fn().mockResolvedValue(false),
} as unknown as jest.Mocked<CheckEmailAlreadyExists>

describe("Participant", () => {
  let participant: Participant
  beforeEach(() => {
    const id = ParticipantId.reconstruct("test-id")
    participant = Participant.reconstruct(id, {
      name: Name.reconstruct("ほげ太郎"),
      email: Email.reconstruct("test@example.com"),
    })
  })

  describe("changeName()", () => {
    it("名前を空文字にするとエラーになる", () => {
      expect(() => participant.changeName("")).toThrowError()
    })
  })

  describe("changeEmail()", () => {
    it("メールアドレスを変更できる", async () => {
      await participant.changeEmail(
        "hoge@example.com",
        CheckEmailMockAlwaysFalse
      )
      expect(participant.email.props.value).toBe("hoge@example.com")
    })
    it("メールアドレスを空文字にするとエラーになる", async () => {
      await expect(
        participant.changeEmail("", CheckEmailMockAlwaysFalse)
      ).rejects.toThrowError()
    })
    it("すでに存在するメールアドレスには変更できない", async () => {
      await expect(
        participant.changeEmail(
          "duplicated@example.com",
          CheckEmailMockAlwaysTrue
        )
      ).rejects.toThrowError()
    })
  })
})
