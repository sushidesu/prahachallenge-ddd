import { Pair as PrismaPair } from "@prisma/client"
import { Context } from "../shared/context"
import { IPairRepository } from "../../domain/pair/interface/pair-repository"
import { Pair } from "../../domain/pair/pair"
import { PairId } from "../../domain/pair/pair-id"
import { PairName } from "../../domain/pair/pair-name"
import { TeamId } from "../../domain/team/team-id"
import { ParticipantId } from "../../domain/participant/participant-id"

type PrismaPairWithRelations = PrismaPair & {
  users: {
    id: string
  }[]
}

export class PairRepository implements IPairRepository {
  constructor(private readonly context: Context) {}

  /**
   * - ペアを追加する
   * - チーム・参加者はすでに作成されている必要がある
   */
  async insert(pair: Pair): Promise<void> {
    await this.context.prisma.pair.create({
      data: {
        id: pair.id.props.value,
        name: pair.name.props.value,
        users: {
          connect: pair.participantIdList.map((id) => ({
            id: id.props.value,
          })),
        },
      },
    })
  }

  async update(pair: Pair): Promise<void> {
    // ref: https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-all-related-records
    // すべての参加者との関連を削除し、新たに関連付けし直す
    await this.context.prisma.pair.update({
      where: {
        id: pair.id.props.value,
      },
      data: {
        name: pair.name.props.value,
        users: {
          set: [],
          connect: pair.participantIdList.map((id) => ({
            id: id.props.value,
          })),
        },
      },
    })
  }

  async getPairById(id: PairId): Promise<Pair | undefined> {
    const pair = await this.context.prisma.pair.findUnique({
      where: {
        id: id.props.value,
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    })
    if (pair) {
      return this.build(pair)
    } else {
      return undefined
    }
  }

  async getAllPairList(): Promise<Pair[]> {
    const pairs = await this.context.prisma.pair.findMany({
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    })
    return pairs.map((pair) => this.build(pair))
  }

  /**
   * あるチームに所属しているペアのリストを取得する
   */
  async getPairListInTeam(teamId: TeamId): Promise<Pair[]> {
    const pairs = await this.context.prisma.pair.findMany({
      where: {
        teams: {
          some: {
            id: teamId.props.value,
          },
        },
      },
      include: {
        users: {
          select: {
            id: true,
          },
        },
      },
    })
    return pairs.map((pair) => this.build(pair))
  }

  //  async getVacantPairList(): Promise<Pair[]> {}
  //
  // HELP: クエリではじめから弾くほうがパフォーマンス的には良いか？
  // そもそもこのメソッドの存在自体が好ましくない？(ドメイン知識が漏れ出している？)
  // -> get-vacant-pair-list ドメインサービスに移行しました

  private build(resource: PrismaPairWithRelations): Pair {
    return Pair.reconstruct(PairId.reconstruct(resource.id), {
      name: PairName.reconstruct(resource.name),
      participantIdList: resource.users.map(({ id }) =>
        ParticipantId.reconstruct(id)
      ),
    })
  }
}
