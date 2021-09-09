import { Pair } from "../pair"
import { ParticipantId } from "../../participant/participant-id"

describe("Pair", () => {
  describe("create()", () => {
    describe("参加者の人数は2または3名のみ", () => {
      let [a, b, c, d]: ParticipantId[] = []
      beforeEach(() => {
        a = ParticipantId.create()
        b = ParticipantId.create()
        c = ParticipantId.create()
        d = ParticipantId.create()
      })
      it("参加者が1人もいない場合 エラーになる", () => {
        expect(() => Pair.create({ participantIdList: [] })).toThrowError()
      })
      it("参加者が1人の場合 エラーになる", () => {
        expect(() => Pair.create({ participantIdList: [a] })).toThrowError()
      })
      it("参加者が2人の場合 正しくペアを作成できる", () => {
        const pair = Pair.create({ participantIdList: [a, b] })
        expect(pair).toEqual(expect.any(Pair))
      })
      it("参加者が3人の場合 正しくペアを作成できる", () => {
        const pair = Pair.create({ participantIdList: [a, b, c] })
        expect(pair).toEqual(expect.any(Pair))
      })
      it("参加者が4人の場合 エラーになる", () => {
        expect(() =>
          Pair.create({ participantIdList: [a, b, c, d] })
        ).toThrowError()
      })
    })
  })
})
