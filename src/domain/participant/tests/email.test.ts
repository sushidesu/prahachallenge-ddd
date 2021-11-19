import { mock } from "jest-mock-extended"
import { Email } from "../email"
import { CheckEmailAlreadyExists } from "../domain-service/check-email-already-exists"

describe("Email", () => {
  const checkEmailMock = mock<CheckEmailAlreadyExists>()
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe(`create()`, () => {
    it(`正しく作成できる`, async () => {
      checkEmailMock.do.mockResolvedValue(false)
      const actual = await Email.create("hello@example.com", checkEmailMock)
      expect(actual.props.value).toBe("hello@example.com")
    })
    it(`空のメールアドレスは作成できない`, async () => {
      checkEmailMock.do.mockResolvedValue(false)
      await expect(Email.create("", checkEmailMock)).rejects.toThrowError(
        "email cannot be empty"
      )
    })
    it(`作成しようとしたメールアドレスが既にに存在する場合、エラーになる`, async () => {
      checkEmailMock.do.mockResolvedValue(true)
      await expect(
        Email.create("exists@example.com", checkEmailMock)
      ).rejects.toThrowError("email has already exists")
    })
  })
})
