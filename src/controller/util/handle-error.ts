export const handleError = (
  error: unknown
): {
  code: number
  message: string
} => {
  if (error instanceof Error) {
    return {
      code: 400,
      message: error.message,
    }
  } else {
    return {
      code: 500,
      message: "unexpected error occurred",
    }
  }
}
