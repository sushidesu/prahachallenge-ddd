import { LeavePair } from "../leave-pair"
import { Participant } from "../../../participant/participant"
import { ParticipantId } from "../../../participant/participant-id"
import { ParticipantName } from "../../../participant/participant-name"
import { Email } from "../../../participant/email"
import { Pair } from "../../pair"
import { PairId } from "../../pair-id"
import { PairName } from "../../pair-name"
import { TeamId } from "../../../team/team-id"
import { Team } from "../../../team/team"
import { TeamName } from "../../../team/team-name"

describe(`LeavePair`, () => {
  let leavePair: LeavePair
  beforeEach(() => {
    leavePair = new LeavePair()
  })

  const participant_tanaka = Participant.reconstruct(
    ParticipantId.reconstruct("tanaka"),
    {
      name: ParticipantName.reconstruct("tanaka"),
      email: Email.reconstruct("tanaka@example.com"),
    }
  )
  const participant_id_a = ParticipantId.reconstruct("a")
  const participant_id_b = ParticipantId.reconstruct("b")

  describe(`ペアから参加者を脱退させる`, () => {
    describe(`脱退してもペアが存続可能な場合、そのまま脱退させる`, () => {
      it(`脱退できる`, async () => {
        /**
         * team-1
         * pair-a
         *   (tanaka, a, b)
         *
         * >>> tanaka 脱退 >>>
         *
         * team-1
         * pair-a
         *   (a, b)
         */
        const actual = await leavePair.do(participant_tanaka)
        const expected = {
          changedPairList: [
            Pair.reconstruct(PairId.reconstruct("a"), {
              name: PairName.reconstruct("a"),
              teamId: TeamId.reconstruct("1"),
              participantIdList: [participant_id_a, participant_id_b],
            }),
          ],
          changedTeamList: [
            Team.reconstruct(TeamId.reconstruct("1"), {
              name: TeamName.reconstruct("1"),
              participantIdList: [participant_id_a, participant_id_b],
            }),
          ],
        }
        expect(actual).toStrictEqual(expected)
      })
    })
    describe(`ペアの下限人数を切る場合、残りの参加者を空きのあるペアに加入させる`, () => {
      // TODO:
    })
  })
})
