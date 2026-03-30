export const calculator = {
  execute: async (input: string) => {
    try {
      const result = eval(input)
      return result.toString()
    } catch {
      return "error"
    }
  }
}