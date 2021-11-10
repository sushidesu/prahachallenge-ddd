- PairにTeamへの参照を持たせるべきか？
  - または、チームの作成と独立してペアの作成を可能にするべきか？
  - <-> Pair.teamIdをnullableにしてもよいか？
  - べき
    - ◎ (勝手に追加した) 「ペアの名前はチーム内で重複してはならない」というドメインルールより、ペア名の作成(=ペアの作成)にはチームが必要ということが導ける
    - -> チーム内に重複する名前を持つペアが存在できてしまう
  - べきではない
    - ペアの作成とチームの作成、チームとの紐付けは別々に行う方が低結合
- チームの最低三人ルールは、撤廃(省略)すべき？
  - ペアにも、チームにも人数ルールがあるのは複雑
- エンティティの作成順 (特にサービス開始時、バッチ等で一括作成しないとして)
  - 1. 参加者 (1ペア成立に必要な人数)
  - 2. チーム
  - 3. ペア (ペア名はチーム内で重複してはいけないため)

```sql
-- チーム名+ペア名+参加者名を取得するクエリ
SELECT
  "Team"."name" AS "team",
  "Pair"."name" AS "pair",
  "User"."name" AS "user_name",
  "User"."email" AS "user_email"
  FROM "User"
  JOIN "_PairToUser" ON "User"."id" = "_PairToUser"."B"
  JOIN "Pair" on "_PairToUser"."A" = "Pair"."id"
  JOIN "_PairToTeam" ON "Pair"."id" = "_PairToTeam"."A"
  JOIN "Team" ON "_PairToTeam"."B" = "Team"."id";
```
