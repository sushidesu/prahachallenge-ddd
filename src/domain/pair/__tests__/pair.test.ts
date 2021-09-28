import { Pair } from "../pair"
import { PairId } from "../pair-id"
import { PairName } from "../pair-name"
import { ParticipantId } from "../../participant/participant-id"
import { TeamId } from "../../team/team-id"

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
      let pairName: PairName
      beforeEach(() => {
        pairName = PairName.reconstruct("a")
      })
      it("参加者が1人もいない場合 エラーになる", () => {
        expect(() =>
          Pair.createFromFactory({
            name: pairName,
            participantIdList: [],
            teamId: TeamId.reconstruct("1"),
          })
        ).toThrowError()
      })
      it("参加者が1人の場合 エラーになる", () => {
        expect(() =>
          Pair.createFromFactory({
            name: pairName,
            participantIdList: [a],
            teamId: TeamId.reconstruct("1"),
          })
        ).toThrowError()
      })
      it("参加者が2人の場合 正しくペアを作成できる", () => {
        const pair = Pair.createFromFactory({
          name: pairName,
          participantIdList: [a, b],
          teamId: TeamId.reconstruct("1"),
        })
        expect(pair).toStrictEqual(
          Pair.reconstruct(expect.any(PairId), {
            name: PairName.reconstruct("a"),
            participantIdList: [
              expect.any(ParticipantId),
              expect.any(ParticipantId),
              // ParticipantId.reconstruct("a"),
              // ParticipantId.reconstruct("b")
            ],
            teamId: TeamId.reconstruct("1"),
          })
        )
      })
      it("参加者が3人の場合 正しくペアを作成できる", () => {
        const pair = Pair.createFromFactory({
          name: pairName,
          participantIdList: [a, b, c],
          teamId: TeamId.reconstruct("1"),
        })
        expect(pair).toBeInstanceOf(Pair)
      })
      it("参加者が4人の場合 エラーになる", () => {
        expect(() =>
          Pair.createFromFactory({
            name: pairName,
            participantIdList: [a, b, c, d],
            teamId: TeamId.reconstruct("1"),
          })
        ).toThrowError()
      })
    })
  })

  const participant_a = ParticipantId.reconstruct("participant-a")
  const participant_b = ParticipantId.reconstruct("participant-b")
  const participant_c = ParticipantId.reconstruct("participant-c")
  describe("acceptParticipant()", () => {
    it("所属している参加者が2名のとき、新たな参加者が加入できる", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [participant_a, participant_b],
        teamId: TeamId.reconstruct("1"),
      })

      pair.acceptParticipant(ParticipantId.reconstruct("participant-c"))
      expect(pair.participantIdList).toEqual([
        ParticipantId.reconstruct("participant-a"),
        ParticipantId.reconstruct("participant-b"),
        ParticipantId.reconstruct("participant-c"),
      ])
    })
    it("参加者が3名いるペアには加入できない", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [participant_a, participant_b, participant_c],
        teamId: TeamId.reconstruct("1"),
      })
      expect(() =>
        pair.acceptParticipant(ParticipantId.reconstruct("participant"))
      ).toThrowError("参加者が3名いるペアには加入できません")
    })
  })

  describe("removeParticipant()", () => {
    it("指定した参加者を削除する", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [participant_a, participant_b, participant_c],
        teamId: TeamId.reconstruct("1"),
      })
      pair.removeParticipant(ParticipantId.reconstruct("participant-b"))
      expect(pair.participantIdList).toStrictEqual([
        ParticipantId.reconstruct("participant-a"),
        ParticipantId.reconstruct("participant-c"),
      ])
    })
    it("ペアに存在しない参加者は削除できない", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [participant_a, participant_b, participant_c],
        teamId: TeamId.reconstruct("1"),
      })
      expect(() =>
        pair.removeParticipant(ParticipantId.reconstruct("unknown-participant"))
      ).toThrowError("ペアに存在しない参加者は削除できません")
    })
    it("対象を指定しない場合は最後の参加者を削除する", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [participant_a, participant_b, participant_c],
        teamId: TeamId.reconstruct("1"),
      })
      pair.removeParticipant()
      expect(pair.participantIdList).toStrictEqual([
        ParticipantId.reconstruct("participant-a"),
        ParticipantId.reconstruct("participant-b"),
      ])
    })
    it("参加者を2名未満にできない", () => {
      const pair = Pair.reconstruct(PairId.reconstruct("a"), {
        name: PairName.reconstruct("a"),
        participantIdList: [participant_a, participant_b],
        teamId: TeamId.reconstruct("1"),
      })
      expect(() => pair.removeParticipant()).toThrowError(
        "参加者を2名未満にはできません"
      )
    })
  })
})
