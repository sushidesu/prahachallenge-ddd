export abstract class Nominal<T extends string> {
  // @ts-expect-error 型の互換性を無くすためのプロパティで、継承先から使用されない
  private readonly _brand: T
}
