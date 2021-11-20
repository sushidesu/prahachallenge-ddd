import { Context } from "../../shared/context"
import { IPairWithParticipantQueryService } from "../../../usecase/pair/get-pair-list/interface/pair-with-participant-query-service-interface"
import { PairWithParticipantQueryCommand } from "../../../usecase/pair/get-pair-list/interface/pair-with-participant-query-command"
import { PairWithParticipantDTO } from "../../../usecase/pair/get-pair-list/interface/pair-with-participant-DTO"

export class PairWithParticipantQueryService
  implements IPairWithParticipantQueryService
{
  constructor(private readonly context: Context) {}
  async query(
    _command: PairWithParticipantQueryCommand
  ): Promise<readonly PairWithParticipantDTO[]> {
    const result = await this.context.prisma.pair.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    return result.map(
      (pair) =>
        new PairWithParticipantDTO({
          id: pair.id,
          name: pair.name,
          participants: pair.users.map((user) => ({
            id: user.id,
            name: user.name,
          })),
        })
    )
  }
}
