import axios from "axios"

export const weather = {
  name: "weather",

  async execute(city: string) {

    const res = await axios.get(`https://wttr.in/${city}?format=j1`)

    return res.data.current_condition[0].temp_C
  }
}