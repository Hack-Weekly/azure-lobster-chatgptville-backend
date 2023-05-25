import * as dotenv from "dotenv"
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"
import { Chat, EndedGame, GameLocation, NPC, NPCChoice, NPCDescription } from "./domain.js"
import { promptChatStream } from "./request.js"
import {
	encodeChatReplySystemMessage,
	encodeChatStartSystemMessage,
	encodeChoices,
} from "./encode.js"
import { defaultLocations, defaultNpcDescs, defaultWorldDesc } from "./defaults.js"
import * as changeCase from "change-case"

dotenv.config()
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})

if (!process.env.OPENAI_API_KEY) {
	throw new Error("OPENAI_API_KEY environment variable is not set")
}

console.log("key: " + process.env.OPENAI_API_KEY)
export const openai = new OpenAIApi(configuration)

export class Game {
	startedAt: Date = new Date()
	worldDesc: string
	locations: GameLocation[]
	npcs: NPC[]
	events: string[] = []
	chat?: Chat

	constructor(worldDesc: string) {
		this.worldDesc = worldDesc
	}

	static create() {
		const game = new Game(defaultWorldDesc)
		game.locations = defaultLocations
		game.initNpcs(defaultNpcDescs)
		return game
	}

	initNpcs(npcDescs: NPCDescription[]) {
		this.npcs = npcDescs.map((desc, i) => {
			return { ...desc, location: this.locations[i].name } as unknown as NPC
		})
	}

	async startChat(npcName: string) {
		const npc = this.getNpc(npcName)
		if (!npc) throw new Error("no npc found with name: " + npcName)

		const chat = {
			npcName: npc.name,
			messages: [
				{
					role: "system",
					content: encodeChatStartSystemMessage(this, npc.name),
				} as ChatCompletionRequestMessage,
			],
		} as Chat

		let reply = await promptChatStream(chat.messages, (s) => {
			console.log("got reply: " + s)

			chat.messages.push({
				role: "assistant",
				content: s.replace('"', ""),
			})
		})

		this.chat = chat

		return reply
	}

	async continueChat(playerMessage: string) {
		const chat = this.chat
		if (!chat) throw new Error("no current chat")

		chat.messages.push({ role: "user", content: playerMessage } as ChatCompletionRequestMessage)

		let locationsConstantCase = {}
		this.locations.forEach((it) => {
			let constantCase = changeCase.constantCase(it.name)
			locationsConstantCase[constantCase] = it.name
		})

		let choices = encodeChoices(
			this.locations.map((it) => it.name),
			this.getNpc(this.chat.npcName).location
		)

		let prompt = chat.messages.slice()
		prompt.push({
			role: "system",
			content: encodeChatReplySystemMessage(this, chat.npcName, choices),
		} as ChatCompletionRequestMessage)

		return await promptChatStream(prompt, (reply) => {
			let end = reply.indexOf("\n")
			if (end == -1) end = reply.length

			let choice = reply.substring(0, end).trim()
			if (!choices.includes(choice)) throw new Error("invalid choice: " + choice)

			chat.messages.push({
				role: "assistant",
				content: reply,
			})

			if (choice.startsWith(NPCChoice.SAY_GOODBYE_AND_GO_TO_)) {
				let location =
					locationsConstantCase[choice.substring(NPCChoice.SAY_GOODBYE_AND_GO_TO_.length).trim()]

				if (!location) {
					throw new Error("invalid location: " + location)
				}

				console.log(`npc:${chat.npcName} new location:${location}`)
				this.getNpc(chat.npcName).location = location
				this.chat = undefined
			} else if (choice == NPCChoice.SAY_GOODBYE) {
				this.chat = undefined
			}
		})
	}

	async endChat() {
		throw new Error("Not implemented") //todo
	}

	async end(): Promise<EndedGame> {
		throw new Error("Not implemented") //todo
	}

	getNpc(npcName: string) {
		const npc = this.npcs.find((npc) => npc.name === npcName)
		if (!npc) throw new Error("no npc found with name: " + npcName)
		return npc
	}
}
