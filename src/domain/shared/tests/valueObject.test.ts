import { ValueObject, ValueObjectProps } from "../valueObject"

interface PersonProps extends ValueObjectProps {
  name: string
  old: number
}

class Person extends ValueObject<PersonProps, "person"> {}

describe("ValueObject", () => {
  describe("equals()", () => {
    it("保持するプロパティが全て同じ場合 true を返す", () => {
      const taro_a = new Person({ name: "taro", old: 20 })
      const taro_b = new Person({ old: 20, name: "taro" })
      expect(taro_a.equals(taro_b)).toBe(true)
    })
    it("保持するプロパティが違う場合 false を返す", () => {
      const taro = new Person({ name: "taro", old: 20 })
      const takuro = new Person({ name: "takuro", old: 20 })
      expect(taro.equals(takuro)).toBe(false)
    })
  })
})
