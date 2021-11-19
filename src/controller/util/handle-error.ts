export const handleError = (
  error: unknown
): {
  code: number
  message: string
} => {
  console.error(error)
  if (error instanceof Error) {
    return {
      code: 500,
      message: error.message,
    }
  } else {
    return {
      code: 500,
      message: "unexpected error occurred",
    }
  }
}
