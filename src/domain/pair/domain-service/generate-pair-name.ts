import { DomainService } from "../../shared/domainService"
import { PairName } from "../pair-name"
import { IPairRepository } from "../interface/pair-repository"
import { TeamId } from "../../team/team-id"

export class GeneratePairName extends DomainService<"generate-pair-name"> {
  constructor(private pairRepository: IPairRepository) {
    super()
  }
  /**
   * ペア名を自動生成
   */
  async generate(teamId: TeamId): Promise<PairName> {
    const pairs = await this.pairRepository.getPairListInTeam(teamId)

    if (pairs.length >= 26) {
      throw new Error("これ以上ペアを作成できません")
    }

    if (pairs.length === 0) {
      return PairName.create("a")
    }

    const ALPHABET_USED: Record<string, boolean> = Object.fromEntries(
      Array.from("abcdefghijklmnopqrstuvwxyz").map((alphabet) => [
        alphabet,
        false,
      ])
    )
    pairs.forEach((pair) => {
      ALPHABET_USED[pair.name.props.value] = true
    })
    const unusedAlphabet = Object.entries(ALPHABET_USED).find(
      ([, used]) => !used
    )
    if (!unusedAlphabet) {
      throw new Error("予期しないエラー")
    }
    const [name] = unusedAlphabet
    return PairName.create(name)
  }
}
