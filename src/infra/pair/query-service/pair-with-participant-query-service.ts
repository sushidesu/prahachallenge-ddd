import { Context } from "../../shared/context"
import { IPairWithParticipantQueryService } from "../../../usecase/pair/get-pair-list/interface/pair-with-participant-query-service-interface"
import { GetPairListWithParticipantDTO } from "../../../usecase/pair/get-pair-list/get-pair-list-with-participant-dto"

export class PairWithParticipantQueryService
  implements IPairWithParticipantQueryService
{
  constructor(private readonly context: Context) {}
  async query(): Promise<GetPairListWithParticipantDTO> {
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
    return new GetPairListWithParticipantDTO({
      pairs: result.map((pair) => ({
        id: pair.id,
        name: pair.name,
        participants: pair.users.map((user) => ({
          id: user.id,
          name: user.name,
        })),
      })),
    })
  }
}
