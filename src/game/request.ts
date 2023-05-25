import { ChatCompletionRequestMessage } from "openai"
import { openai } from "./game.js"
import { Readable } from "stream"

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

export async function promptChat(messages: ChatCompletionRequestMessage[]) {
	const res = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages,
	})

	return res.data.choices[0].message.content
}

export async function promptChatStream(
	messages: ChatCompletionRequestMessage[],
	onDone?: (reply: string) => void
) {
	const res = await openai.createChatCompletion(
		{
			model: "gpt-3.5-turbo",
			messages: messages,
			stream: true,
		},
		{ responseType: "stream" }
	)

	let replySoFar = ""
	const buffer = new Readable()
	buffer._read = () => {}

	for (let i = 0; i < 15; i++) {
		buffer.push(
			JSON.stringify({
				type: "shittyHack",
				shittyHack: "asfavuboouirbojgsdgakwlrjbgaksrglksdhgvibavsdvbliawbiuewvflabogawfabsks",
			}) + "\r\n"
		)
	}

	;(res.data as unknown as NodeJS.ReadableStream).on("data", (data) => {
		try {
			const lines = data
				.toString()
				.split("\n")
				.filter((line) => line.trim() !== "")

			for (const line of lines) {
				console.log(line)
				const message = line.replace(/^data: /, "")
				// console.log(message)
				if (message === "[DONE]") {
					buffer.push(null)
					if (onDone) {
						try {
							onDone(replySoFar)
						} catch (e) {
							console.log("onDone error:")
							console.log(e)
						}
					}
					return
				}

				const o = JSON.parse(message)
				const choices = o.choices
				// console.log(choices)
				const delta = choices[0].delta
				// console.log(delta)
				const content = delta.content
				// console.log(content)
				if (content) {
					const s = content.toString()
					replySoFar += s
					buffer.push(JSON.stringify({ type: "content", content: s }) + "\r\n")
					continue
				}

				const role = delta.role
				if (role) {
					console.log("line with role: " + line) //todo remove
					continue
				}

				const finish_reason = choices[0].finish_reason
				if (finish_reason) {
					buffer.push(JSON.stringify({ type: "finish_reason", finish_reason }) + "\r\n")
					console.log("finish_reason: " + finish_reason)
					continue
				}

				throw new Error("no content, role, or finish_reason for line: " + line)
			}
		} catch (e) {
			console.log(e)
			buffer.push(JSON.stringify({ type: "error", message: e.message }) + "\r\n")
			buffer.push(null)
			buffer.destroy(e)
		}
	})

	return buffer
}
