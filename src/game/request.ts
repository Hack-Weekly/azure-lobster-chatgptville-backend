import { ChatCompletionRequestMessage } from "openai"
import { BufferedGptReply } from "./domain.js"
import { openai } from "./game.js"
import stream from "stream"

export async function prompt(prompt: string): Promise<string> {
	const res = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: prompt,
			},
		],
	})

	return res.data.choices[0].message.content
}

export async function promptStream(prompt: string, onDone?: (s: string) => void) {
	return promptChatStream([{ role: "user", content: prompt }], onDone)
}

export async function promptChatStream(messages: ChatCompletionRequestMessage[], onDone?: (s: string) => void) {
	const res = await openai.createChatCompletion(
		{
			model: "gpt-3.5-turbo",
			messages: messages,
			stream: true,
		},
		{ responseType: "stream" }
	)

	const buffer = new stream.Readable()
	buffer._read = () => {}

	const reply: BufferedGptReply = { buffer: buffer, replySoFar: "" }

	;(res.data as unknown as NodeJS.ReadableStream).on("data", (data) => {
		try {
			const dataString = data
				.toString()
				.split("\n")
				.filter((line) => line.trim() !== "")

			for (const line of dataString) {
				const message = line.replace(/^data: /, "")
				// console.log(message)
				if (message === "[DONE]") {
					buffer.push(null)
					console.log(reply.replySoFar)
					if (onDone) onDone(reply.replySoFar)
					continue
				}

				const choices = JSON.parse(message).choices
				// console.log(choices)
				const delta = choices[0].delta
				// console.log(delta)
				const content = delta.content
				// console.log(content)
				if (!content) {
					// console.log("no content")
					const role = delta.role
					if (!role) {
						// console.log("no role")
						const finish_reason = choices[0].finish_reason
						if (!finish_reason) {
							throw new Error("no content, role, or finish_reason for line: " + line)
						}

						console.log("finish_reason: " + finish_reason)
					}

					continue
				}

				// process.stdout.write(content.toString())
				const s = content.toString()
				reply.replySoFar += s
				buffer.push(s)
			}
		} catch (e) {
			console.error(e)
			buffer.destroy(e)
		}
	})

	return reply
}
