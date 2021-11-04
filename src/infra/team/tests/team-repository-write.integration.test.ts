import { TeamRepository } from "../team-repository"
import { createContext } from "../../shared/context"
import { truncateAllTables } from "../../util/truncate-all-tables"

describe(`TeamRepository`, () => {
  const context = createContext()

  beforeAll(async () => {
    // TODO:
  })
  afterAll(async () => {
    await truncateAllTables(context)
    await context.prisma.$disconnect()
  })

  let teamRepository: TeamRepository
  beforeEach(() => {
    teamRepository = new TeamRepository(context)
  })

  // HELP: ペアへの参照も必要になる？
  describe(`insert()`, () => {
    //    const team = Team.reconstruct(TeamId.reconstruct("id-team-1"), {
    //      name: TeamName.reconstruct("1"),
    //      participantIdList: [
    //        ParticipantId.reconstruct("id-user-01"),
    //        ParticipantId.reconstruct("id-user-02"),
    //        ParticipantId.reconstruct("id-user-03"),
    //      ],
    //    })
    //    await teamRepository.insert(team) // このままでは無理では????
    //    const result = await context.prisma.team.findUnique({
    //      where: {
    //        id: "id-team-1",
    //      },
    //      include: {
    //        pairs: {
    //          include: {
    //            users: {
    //              select: {
    //                id: true,
    //              },
    //            },
    //          },
    //        },
    //      },
    //    })
    //    const expected = {
    //      id: "id-team-1",
    //      name: "1",
    //      pairs: [
    //        {
    //          users: [
    //            { id: "id-user-01" },
    //            { id: "id-user-02" },
    //            { id: "id-user-03" },
    //          ],
    //        },
    //      ],
    //    }
    //    expect(result).toStrictEqual(expected)
  })
  describe(`update()`, () => {
    teamRepository
  })
})
