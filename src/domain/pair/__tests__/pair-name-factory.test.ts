import { PairNameFactory } from "../pair-name-factory"

describe(`PairNameFactory`, () => {
  let pairNameFactory: PairNameFactory
  beforeEach(() => {
    pairNameFactory = new PairNameFactory()
  })

  describe(`チーム内で重複のないペア名を生成する`, () => {
    it(`チーム内にペアが一つもない場合、 "a" を生成`, async () => {
      const name = await pairNameFactory.create()
      expect(name.props.value).toBe("a")
    })
    describe(`チーム内にペアが存在する場合、重複の無い一番若いアルファベットで生成する`, () => {
      it(`"a", "b" が存在する場合、 "c" を生成する`, async () => {
        const name = await pairNameFactory.create()
        expect(name.props.value).toBe("c")
      })
      it(`"a", "c" が存在する場合、 "b" を生成する`, async () => {
        const name = await pairNameFactory.create()
        expect(name.props.value).toBe("b")
      })
    })
    it(`チーム内にペアが26以上存在する場合、エラーになる`, async () => {
      await expect(pairNameFactory.create()).rejects.toThrowError()
    })
  })
})
