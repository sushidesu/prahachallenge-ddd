import { TeamName } from "../team-name"

describe(`TeamName`, () => {
  describe(`チーム名は1以上999以下の整数でなければいけない`, () => {
    it(`"3"のチーム名を作成できる`, () => {
      const name = TeamName.createFromFactory("3")
      expect(name.props.value).toBe("3")
    })
    it(`数字以外を受け取るとエラーになる`, () => {
      expect(() => TeamName.createFromFactory("s")).toThrowError(
        "チーム名は整数である必要があります"
      )
    })
    it(`"0"のチーム名はエラーになる`, () => {
      expect(() => TeamName.createFromFactory("0")).toThrowError(
        "チーム名は1以上である必要があります"
      )
    })
    it(`'1.3"のチーム名はエラーになる`, () => {
      expect(() => TeamName.createFromFactory("1.3")).toThrowError(
        "チーム名は整数である必要があります"
      )
    })
    it(`"999"のチーム名を作成できる`, () => {
      const name = TeamName.createFromFactory("999")
      expect(name.props.value).toBe("999")
    })
    it(`"1000"のチーム名はエラーになる`, () => {
      expect(() => TeamName.createFromFactory("1000")).toThrowError(
        "チーム名は999以下である必要があります"
      )
    })
  })
})
