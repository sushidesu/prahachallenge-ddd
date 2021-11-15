import { PairName } from "../pair-name"

describe("PairName", () => {
  describe("ペアの名前の長さは1文字", () => {
    it(`名前を "a" にすると正しく作成できる`, () => {
      const pairName = PairName.create("a")
      expect(pairName).toEqual(expect.any(PairName))
    })
    it("名前を空にするとエラーになる", () => {
      expect(() => PairName.create("")).toThrowError(
        "pair-name cannot be empty"
      )
    })
    it(`名前が2文字以上の場合エラーになる`, () => {
      expect(() => PairName.create("aa")).toThrowError("pair-name is too long")
    })
  })
  describe("ペアの名前は英小文字のみ", () => {
    it(`名前に大文字が含まれている場合エラーになる`, () => {
      expect(() => PairName.create("A")).toThrowError(
        "pair-name cannot be uppercase"
      )
    })
  })
})
