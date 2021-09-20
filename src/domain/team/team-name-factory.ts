import { DomainService } from "../shared/domainService"
import { TeamName } from "./team-name"
import { ITeamRepository } from "./interface/team-repository"

export class TeamNameFactory extends DomainService<"team-name-factory"> {
  constructor(private teamRepository: ITeamRepository) {
    super()
  }
  /**
   * チーム名を自動生成
   */
  async create(): Promise<TeamName> {
    // 全チームを取得
    // チーム名で並び替え
    const teams = await this.teamRepository.getAllTeamList({ sort: "name" })
    // チームがなにもない場合 "1" で作成
    if (!teams.length) {
      return TeamName.createFromFactory("1")
    }
    // 最後のチームの次のチーム名を取得
    const nextTeamNumber = teams.length + 1
    // 次が1000の場合エラー
    if (nextTeamNumber >= 1000) {
      throw new Error("これ以上チーム名を作成できません")
    }
    // その名前で作成
    return TeamName.createFromFactory(nextTeamNumber.toString())
  }
}
