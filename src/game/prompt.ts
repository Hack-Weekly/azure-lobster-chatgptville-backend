import * as dotenv from "dotenv"
import { Configuration, OpenAIApi } from "openai"

dotenv.config()

if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set")
}

console.log("key" + process.env.OPENAI_API_KEY)

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function asdf() {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Hello world",
    })
    console.log(completion.data.choices[0].text)
    return completion.data.choices[0].text
}
