import { Participant } from "../participant"
import { ParticipantId } from "../participant-id"

describe("Participant", () => {
  let participant: Participant
  beforeEach(() => {
    const id = ParticipantId.reconstruct("test-id")
    participant = Participant.reconstruct(id, {
      name: "ほげ太郎",
      email: "test@example.com",
    })
  })

  describe("changeName()", () => {
    it("名前を空文字にするとエラーになる", () => {
      expect(() => participant.changeName("")).toThrowError()
    })
  })

  describe("changeEmail()", () => {
    it("メールアドレスを空文字にするとエラーになる", () => {
      expect(() => participant.changeEmail("")).toThrowError()
    })
  })
})
