export const calculator = {
  name: "calculator",

  execute(input: string) {
    try {
      return eval(input)
    } catch {
      return "Invalid expression"
    }
  }
}